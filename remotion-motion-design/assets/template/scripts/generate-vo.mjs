// Génère la voix off française avec ElevenLabs à partir de src/script.json
// Usage :  ELEVENLABS_API_KEY=xxx npm run vo
//   (optionnel) VOICE_ID=...  → l'identifiant de la voix choisie dans ta bibliothèque ElevenLabs
// Résultat : public/audio/vo/01.mp3 … 08.mp3 + manifest.json (détecté automatiquement par Remotion)
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error('❌ Définis ELEVENLABS_API_KEY (ex: ELEVENLABS_API_KEY=sk_xxx npm run vo)');
  process.exit(1);
}
const VOICE = process.env.VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // voix par défaut ; remplace par une voix FR de ton choix
const script = JSON.parse(fs.readFileSync('src/script.json', 'utf8'));
const dir = 'public/audio/vo';
fs.mkdirSync(dir, {recursive: true});
const FPS = 30;
const ok = [];

for (const l of script) {
  const text = l.text; // adapte ici la phonétique TTS si besoin (ex: .replace('MaMarque.com','Ma Marque point com'))
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {'xi-api-key': KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      language_code: 'fr',
      voice_settings: {stability: 0.45, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true},
    }),
  });
  if (!res.ok) {
    console.error(`❌ ligne ${l.id}:`, res.status, await res.text());
    process.exit(1);
  }
  const file = path.join(dir, `${l.id}.mp3`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  let info = '';
  try {
    const d = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
    const avail = (l.to - l.from) / FPS;
    info = `${d.toFixed(1)}s / ${avail.toFixed(1)}s dispo ${d > avail ? '⚠️ TROP LONG : raccourcis le texte ou décale "to" dans src/script.json' : '✓'}`;
  } catch {
    info = '(ffprobe absent : durée non vérifiée)';
  }
  console.log(`✓ ${l.id}  ${info}`);
  ok.push(l.id);
}
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(ok));
console.log('\nVoix off prête. Relance `npm run dev` ou `npm run render`.');
