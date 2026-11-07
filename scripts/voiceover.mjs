#!/usr/bin/env node
/**
 * voiceover.mjs — Génération voix off ElevenLabs avec cache, timestamps et retry
 * 
 * Usage:
 *   node voiceover.mjs --script script-vo.json [--output voice/] [--dry-run] [--stability 0.45] [--similarity 0.8] [--style 0.25]
 * 
 * Format de script-vo.json : [{"id":"01","text":"Votre texte ici"},...]
 * 
 * Variables d'environnement requises (dans .env) :
 *   ELEVENLABS_API_KEY=sk-...
 *   ELEVENLABS_VOICE_ID=...
 * 
 * Sorties :
 *   voice/scene_01.mp3
 *   voice/scene_01.alignment.json  (timestamps mot-par-mot)
 *   voice/cache.json               (index du cache par hash)
 */

import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Chargement .env ─────────────────────────────────────────────────────────
function loadEnv(dir = process.cwd()) {
  const envPath = resolve(dir, '.env');
  if (!existsSync(envPath)) {
    // Essaie dans le parent (si lancé depuis scripts/)
    const parentEnvPath = resolve(dir, '..', '.env');
    if (!existsSync(parentEnvPath)) return;
    parseEnvFile(parentEnvPath);
  } else {
    parseEnvFile(envPath);
  }
}

function parseEnvFile(path) {
  const lines = readFileSync(path, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv(process.cwd());
loadEnv(resolve(__dirname, '..'));

// ─── Parsing arguments CLI ───────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, def = null) {
  const i = args.indexOf(name);
  if (i >= 0 && args[i + 1]) return args[i + 1];
  return def;
}
function hasFlag(name) { return args.includes(name); }

const DRY_RUN    = hasFlag('--dry-run');
const SCRIPT_FILE = getArg('--script', 'script-vo.json');
const OUTPUT_DIR  = getArg('--output', 'voice');
const STABILITY   = parseFloat(getArg('--stability',  '0.45'));
const SIMILARITY  = parseFloat(getArg('--similarity', '0.80'));
const STYLE_VAL   = parseFloat(getArg('--style',      '0.25'));
const MODEL       = getArg('--model', 'eleven_multilingual_v2');

// ─── Validation ──────────────────────────────────────────────────────────────
const API_KEY  = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

if (!DRY_RUN) {
  if (!API_KEY)  { console.error('❌ ELEVENLABS_API_KEY manquante dans .env'); process.exit(1); }
  if (!VOICE_ID) { console.error('❌ ELEVENLABS_VOICE_ID manquant dans .env');  process.exit(1); }
}

if (!existsSync(SCRIPT_FILE)) {
  console.error(`❌ Fichier de script introuvable : ${SCRIPT_FILE}`);
  process.exit(1);
}

const script = JSON.parse(readFileSync(SCRIPT_FILE, 'utf8'));
mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Cache ───────────────────────────────────────────────────────────────────
const CACHE_FILE = resolve(OUTPUT_DIR, 'cache.json');
let cache = {};
if (existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8')); } catch {}
}

function hashEntry(text, voiceId, params) {
  return createHash('sha256')
    .update(JSON.stringify({ text, voiceId, ...params }))
    .digest('hex').slice(0, 16);
}

function saveCache() {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// ─── Appel API avec retry ────────────────────────────────────────────────────
async function callElevenLabs(text, voiceId, params, attempt = 1) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`;
  const body = JSON.stringify({
    text,
    model_id: MODEL,
    voice_settings: {
      stability: params.stability,
      similarity_boost: params.similarity,
      style: params.style,
      use_speaker_boost: true,
    },
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body,
  });

  if (res.status === 429) {
    const retryAfter = parseInt(res.headers.get('retry-after') || '5');
    const wait = retryAfter * 1000 * attempt;
    if (attempt > 4) throw new Error('❌ Quota ElevenLabs dépassé après 4 tentatives. Réessaie plus tard.');
    console.warn(`  ⏳ Rate-limit 429 — attente ${wait/1000}s (tentative ${attempt}/4)...`);
    await new Promise(r => setTimeout(r, wait));
    return callElevenLabs(text, voiceId, params, attempt + 1);
  }

  if (res.status === 401) throw new Error('❌ ELEVENLABS_API_KEY invalide ou expirée.');
  if (res.status === 422) throw new Error(`❌ Paramètres invalides : ${await res.text()}`);
  if (!res.ok) throw new Error(`❌ Erreur API ${res.status}: ${await res.text()}`);

  return res.json();
}

// ─── Traitement d'une phrase ─────────────────────────────────────────────────
async function processSentence(entry) {
  const { id, text } = entry;
  const params = { stability: STABILITY, similarity: SIMILARITY, style: STYLE_VAL };
  const hash = hashEntry(text, VOICE_ID || 'dry-run', params);
  const mp3Path  = resolve(OUTPUT_DIR, `scene_${id}.mp3`);
  const alignPath = resolve(OUTPUT_DIR, `scene_${id}.alignment.json`);

  // Vérifie le cache
  if (cache[hash] && existsSync(mp3Path) && existsSync(alignPath)) {
    console.log(`  ✓ Cache hit — ${id} (${text.slice(0, 50)}...)`);
    return { id, text, cached: true, mp3: mp3Path, alignment: alignPath };
  }

  if (DRY_RUN) {
    console.log(`  🔵 [DRY-RUN] ${id}: "${text.slice(0, 60)}..."`);
    // Génère un fichier JSON placeholder pour les tests
    const dummyAlignment = {
      characters: text.split(''),
      character_start_times_seconds: text.split('').map((_, i) => i * 0.07),
      character_end_times_seconds: text.split('').map((_, i) => (i + 1) * 0.07),
    };
    writeFileSync(alignPath, JSON.stringify({
      dry_run: true,
      text,
      estimated_duration_s: (text.length / 15).toFixed(2),
      alignment: dummyAlignment,
    }, null, 2));
    // Crée un MP3 silencieux de 1s pour les tests
    console.log(`    → Placeholder créé : ${alignPath}`);
    return { id, text, cached: false, dry_run: true, mp3: null, alignment: alignPath };
  }

  // Appel réel
  console.log(`  🎙️  Génération ${id}: "${text.slice(0, 60)}..."`);
  const data = await callElevenLabs(text, VOICE_ID, params);

  // Décode et sauvegarde le MP3
  const audioBase64 = data.audio_base64;
  const audioBuffer = Buffer.from(audioBase64, 'base64');
  writeFileSync(mp3Path, audioBuffer);

  // Sauvegarde l'alignement
  const alignment = data.alignment || {};
  writeFileSync(alignPath, JSON.stringify({
    text,
    voice_id: VOICE_ID,
    model: MODEL,
    params,
    alignment,
  }, null, 2));

  // Met à jour le cache
  cache[hash] = { id, timestamp: new Date().toISOString(), mp3: mp3Path, alignment: alignPath };
  saveCache();

  // Vérifie la durée (si disponible)
  const duration = alignment?.character_end_times_seconds?.at(-1);
  console.log(`    ✓ ${id} généré${duration ? ` (${duration.toFixed(2)}s)` : ''}`);
  return { id, text, cached: false, mp3: mp3Path, alignment: alignPath, duration };
}

// ─── Main ────────────────────────────────────────────────────────────────────
console.log('\n🎙️  ElevenLabs Voiceover Generator');
console.log(`   Modèle  : ${MODEL}`);
console.log(`   Voice   : ${DRY_RUN ? '(dry-run)' : VOICE_ID}`);
console.log(`   Stability=${STABILITY} Similarity=${SIMILARITY} Style=${STYLE_VAL}`);
console.log(`   Sortie  : ${OUTPUT_DIR}/`);
if (DRY_RUN) console.log('   ⚠️  MODE DRY-RUN : aucun appel API, aucun crédit consommé\n');
else console.log();

const results = [];
let errors = 0;

for (const entry of script) {
  try {
    const result = await processSentence(entry);
    results.push(result);
  } catch (err) {
    console.error(`  ❌ Erreur sur ${entry.id}: ${err.message}`);
    errors++;
    if (err.message.includes('invalide') || err.message.includes('Quota')) break;
  }
}

console.log(`\n📊 Résultat : ${results.length}/${script.length} phrases traitées, ${errors} erreur(s)`);
if (errors > 0) console.warn('   ⚠️  Vérifier les erreurs ci-dessus.');

// Résumé des durées
const withDuration = results.filter(r => r.duration);
if (withDuration.length > 0) {
  const total = withDuration.reduce((s, r) => s + r.duration, 0);
  console.log(`   Durée totale estimée : ${total.toFixed(1)}s`);
}

console.log('\nProchaine étape : node scripts/sync_scenes.mjs --voice voice/ --timeline timeline.json\n');
