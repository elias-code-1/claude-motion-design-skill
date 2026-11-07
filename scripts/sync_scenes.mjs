#!/usr/bin/env node
/**
 * sync_scenes.mjs — Calcule les durées de scènes depuis les audios VO et génère timeline.json + sous-titres
 * 
 * Usage:
 *   node sync_scenes.mjs --voice voice/ --fps 30 [--breath 0.3] [--output timeline.json] [--captions captions.json]
 * 
 * Requiert: ffprobe dans le PATH
 * 
 * Sorties:
 *   timeline.json        : [{id, text, start_s, duration_s, frames_start, frames_dur, breath_s}]
 *   captions.json        : [{id, text, from (frames abs), to (frames abs), words: [{word, from, to}]}]
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// ─── Arguments ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, def = null) {
  const i = args.indexOf(name); return (i >= 0 && args[i + 1]) ? args[i + 1] : def;
}

const VOICE_DIR    = getArg('--voice', 'voice');
const FPS          = parseInt(getArg('--fps', '30'));
const BREATH       = parseFloat(getArg('--breath', '0.3')); // marge de respiration en secondes
const OUT_TIMELINE = getArg('--output', 'timeline.json');
const OUT_CAPTIONS = getArg('--captions', 'captions.json');
const SWEEP_S      = 36 / FPS; // durée du sweep de transition en secondes

// ─── Lecture des fichiers VO ──────────────────────────────────────────────────
if (!existsSync(VOICE_DIR)) {
  console.error(`❌ Dossier voice introuvable : ${VOICE_DIR}`);
  process.exit(1);
}

const voiceFiles = readdirSync(VOICE_DIR)
  .filter(f => f.match(/^scene_\d+\.(mp3|alignment\.json)$/))
  .sort();

if (voiceFiles.length === 0) {
  console.error('❌ Aucun fichier scene_XX.mp3 trouvé dans', VOICE_DIR);
  process.exit(1);
}

// ─── Durée audio via ffprobe ──────────────────────────────────────────────────
function getAudioDuration(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    const out = execSync(
      `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`,
      { encoding: 'utf8' }
    ).trim();
    return parseFloat(out) || null;
  } catch {
    return null;
  }
}

// ─── Lecture des alignements ──────────────────────────────────────────────────
function loadAlignment(id) {
  const alignPath = resolve(VOICE_DIR, `scene_${id}.alignment.json`);
  if (!existsSync(alignPath)) return null;
  try {
    return JSON.parse(readFileSync(alignPath, 'utf8'));
  } catch {
    return null;
  }
}

// ─── Conversion alignement chars → mots ──────────────────────────────────────
function extractWords(alignment, text) {
  if (!alignment?.alignment) return [];
  const { characters, character_start_times_seconds, character_end_times_seconds } = alignment.alignment;
  if (!characters) return [];

  const words = [];
  let wordStart = null;
  let wordEnd = null;
  let wordChars = '';

  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    const tStart = character_start_times_seconds[i];
    const tEnd = character_end_times_seconds[i];

    if (ch === ' ' || ch === '\n' || i === characters.length - 1) {
      if (i === characters.length - 1 && ch !== ' ') {
        wordChars += ch;
        wordEnd = tEnd;
      }
      if (wordChars.trim()) {
        words.push({ word: wordChars.trim(), start_s: wordStart, end_s: wordEnd });
      }
      wordChars = '';
      wordStart = null;
    } else {
      if (wordStart === null) wordStart = tStart;
      wordEnd = tEnd;
      wordChars += ch;
    }
  }
  return words;
}

// ─── Main ────────────────────────────────────────────────────────────────────
console.log('\n📐 Sync Scenes — Calcul des durées depuis les audios VO');
console.log(`   Dossier voice : ${VOICE_DIR}`);
console.log(`   FPS           : ${FPS}`);
console.log(`   Marge respir. : ${BREATH}s`);
console.log(`   Sweep         : ${SWEEP_S.toFixed(2)}s\n`);

const timeline = [];
const captions = [];
let cursor_s = 0; // curseur de temps absolu

const sceneIds = voiceFiles
  .map(f => f.match(/scene_(\d+)/)?.[1])
  .filter(Boolean)
  .filter((v, i, a) => a.indexOf(v) === i);

for (const id of sceneIds) {
  const mp3Path = resolve(VOICE_DIR, `scene_${id}.mp3`);
  const alignment = loadAlignment(id);
  const text = alignment?.text || `Scène ${id}`;

  // Durée audio (ou estimation depuis dry-run)
  let audioDuration = getAudioDuration(mp3Path);
  if (!audioDuration && alignment?.estimated_duration_s) {
    audioDuration = parseFloat(alignment.estimated_duration_s);
    console.warn(`  ⚠️  ${id}: durée estimée (dry-run) = ${audioDuration}s`);
  }
  if (!audioDuration) {
    audioDuration = Math.max(2, text.length / 15); // fallback: 15 chars/s
    console.warn(`  ⚠️  ${id}: durée calculée par heuristique = ${audioDuration.toFixed(1)}s`);
  }

  // Durée de la scène = durée audio + marge de respiration
  const sceneDuration_s = audioDuration + BREATH;
  const sceneStart_frames = Math.round(cursor_s * FPS);
  const sceneDuration_frames = Math.round(sceneDuration_s * FPS);

  // Les sous-titres commencent après le sweep (voix démarre 0.3s après le début de la scène)
  const voStart_s = cursor_s + 0.3;
  const voStart_frames = Math.round(voStart_s * FPS);
  const voEnd_frames = Math.round((voStart_s + audioDuration) * FPS);

  timeline.push({
    id,
    text,
    start_s: parseFloat(cursor_s.toFixed(3)),
    duration_s: parseFloat(sceneDuration_s.toFixed(3)),
    audio_duration_s: parseFloat(audioDuration.toFixed(3)),
    breath_s: BREATH,
    frames_start: sceneStart_frames,
    frames_dur: sceneDuration_frames,
    vo_start_frames: voStart_frames,
    vo_end_frames: voEnd_frames,
  });

  // Génère les sous-titres mot-par-mot
  const words = extractWords(alignment, text);
  if (words.length > 0) {
    const captionWords = words.map(w => ({
      word: w.word,
      from: Math.round((voStart_s + w.start_s) * FPS),
      to: Math.round((voStart_s + w.end_s) * FPS),
    }));
    captions.push({
      id,
      text,
      from: voStart_frames,
      to: voEnd_frames,
      words: captionWords,
    });
  } else {
    // Sans alignement : sous-titre en bloc
    captions.push({ id, text, from: voStart_frames, to: voEnd_frames, words: [] });
  }

  console.log(`  Scène ${id}: audio=${audioDuration.toFixed(2)}s → scène=${sceneDuration_s.toFixed(2)}s (frames ${sceneStart_frames}–${sceneStart_frames + sceneDuration_frames})`);
  cursor_s += sceneDuration_s;
}

const totalFrames = Math.round(cursor_s * FPS);
console.log(`\n📊 Total : ${cursor_s.toFixed(1)}s — ${totalFrames} frames à ${FPS} fps`);

writeFileSync(OUT_TIMELINE, JSON.stringify(timeline, null, 2));
writeFileSync(OUT_CAPTIONS, JSON.stringify(captions, null, 2));

console.log(`\n✅ Fichiers générés :`);
console.log(`   ${OUT_TIMELINE}`);
console.log(`   ${OUT_CAPTIONS}`);
console.log(`\nProchaine étape : intègre timeline.json dans src/theme.ts (SCENES) et captions.json dans src/script.json\n`);
