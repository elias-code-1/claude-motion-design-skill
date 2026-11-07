import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, SCENES, TOTAL} from './theme';
import {clampOpts, p} from './anim';
import {Finish, Sweeps} from './ui';
import {Intro} from './scenes/Intro';
import {Content} from './scenes/Content';
import {Outro} from './scenes/Outro';
import script from './script.json';

export type FilmProps = {captions: boolean; music: boolean; voIds: string[]};

// ➜ Pour ajouter une scène : 1) l'ajouter dans SCENES (theme.ts)  2) créer src/scenes/X.tsx  3) l'enregistrer ici.
const REGISTRY: Record<keyof typeof SCENES, React.FC> = {intro: Intro, content: Content, outro: Outro};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const line = script.find((l) => f >= l.from && f < l.to);
  if (!line) return null;
  const a = p(f, line.from, 10) * (1 - p(f, line.to - 8, 8));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center', zIndex: 200, opacity: a, transform: `translateY(${(1 - a) * 14}px)`}}>
      <div style={{fontFamily: FONT, maxWidth: '80%', padding: '14px 34px', borderRadius: 18, background: 'rgba(11,18,32,.78)', color: '#fff', fontSize: 31, fontWeight: 600, lineHeight: 1.35, textAlign: 'center'}}>{line.text}</div>
    </div>
  );
};

export const Film: React.FC<FilmProps> = ({captions, music, voIds}) => {
  const hasVo = voIds.length > 0;
  // Ducking : la musique descend quand la voix parle, remonte entre les phrases.
  const musicVolume = (f: number) => {
    const base = hasVo ? 0.38 : 0.5;
    const duck = 0.15;
    let v = base;
    if (hasVo) {
      for (const l of script) {
        if (!voIds.includes(l.id)) continue;
        const k = interpolate(f, [l.from - 10, l.from, l.to, l.to + 14], [0, 1, 1, 0], clampOpts);
        v = Math.min(v, base - (base - duck) * k);
      }
    }
    return v * interpolate(f, [0, 20, TOTAL - 50, TOTAL], [0, 1, 1, 0], clampOpts);
  };

  return (
    <AbsoluteFill style={{background: C.navy}}>
      {music && <Audio src={staticFile('audio/music.mp3')} volume={musicVolume} />}
      {(Object.keys(SCENES) as (keyof typeof SCENES)[]).map((k) => {
        const Comp = REGISTRY[k];
        return (
          <Sequence key={k} from={SCENES[k].from} durationInFrames={SCENES[k].dur}>
            <Comp />
          </Sequence>
        );
      })}
      <Sweeps />
      <Finish />
      {captions && <Captions />}
      {script
        .filter((l) => voIds.includes(l.id))
        .map((l) => (
          <Sequence key={l.id} from={l.from} layout="none">
            <Audio src={staticFile(`audio/vo/${l.id}.mp3`)} volume={1} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
