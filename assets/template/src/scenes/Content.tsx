import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Check, Rocket, Zap} from 'lucide-react';
import {C, FONT, SCENES, SHADOW} from '../theme';
import {p, pop} from '../anim';
import {Bg, Cam, Chip, Counter, Cursor, Sfx, WordReveal} from '../ui';

/** PATRON "Scène message" : titre qui se révèle → 3 bénéfices qui "pop" → chiffre clé → curseur qui clique. */
export const Content: React.FC = () => {
  const f = useCurrentFrame();
  const CHIPS = [
    {label: 'Bénéfice numéro un', icon: <Check size={30} />, at: 40},
    {label: 'Bénéfice numéro deux', icon: <Zap size={30} />, at: 54},
    {label: 'Bénéfice numéro trois', icon: <Rocket size={30} />, at: 68},
  ];
  const card = pop(f, 84);
  const press = Math.max(0, 1 - Math.abs(f - 128) / 5);
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Bg />
      <Cam dur={SCENES.content.dur}>
        <AbsoluteFill style={{padding: 120, justifyContent: 'center', gap: 50}}>
          <WordReveal text="Un titre fort qui dit tout" start={8} size={108} accentWords={[3]} align="left" />
          <div style={{display: 'flex', gap: 24}}>
            {CHIPS.map((c, i) => {
              const s = pop(f, c.at);
              return (
                <div key={i} style={{transform: `scale(${s})`, opacity: Math.min(1, s * 1.5)}}>
                  <Chip icon={c.icon} label={c.label} size={34} />
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
            <div style={{padding: '30px 50px', borderRadius: 32, background: '#fff', boxShadow: SHADOW, transform: `scale(${card})`, opacity: Math.min(1, card * 2)}}>
              <div style={{fontSize: 24, color: C.mute, fontWeight: 600}}>Chiffre clé</div>
              <Counter to={10590} start={90} style={{fontSize: 96, fontWeight: 800, color: C.primary, letterSpacing: -3}} suffix=" FCFA" />
            </div>
            <div style={{padding: '28px 56px', borderRadius: 999, background: C.primary, color: '#fff', fontSize: 30, fontWeight: 700, transform: `scale(${1 - press * 0.05})`, boxShadow: `0 18px 40px -12px rgba(37,99,235,.65), 0 0 0 ${press * 14}px rgba(37,99,235,.18)`}}>
              Appel à l'action
            </div>
          </div>
        </AbsoluteFill>
        <Cursor keys={[[96, 1300, 700], [124, 560, 690]]} clicks={[128]} />
      </Cam>
      <Sfx at={8} name="whoosh" vol={0.35} />
      {CHIPS.map((c) => (
        <Sfx key={c.at} at={c.at} name="pop" vol={0.55} />
      ))}
      {[90, 96, 102, 108, 114, 120].map((a) => (
        <Sfx key={a} at={a} name="tick" vol={0.25} />
      ))}
      <Sfx at={128} name="click" vol={0.8} />
      <Sfx at={130} name="success" vol={0.5} />
    </AbsoluteFill>
  );
};
