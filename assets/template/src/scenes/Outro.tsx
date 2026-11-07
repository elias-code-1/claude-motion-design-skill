import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ArrowRight} from 'lucide-react';
import {C, FONT, SCENES} from '../theme';
import {p, pop} from '../anim';
import {Bg, BrandWord, Cam, LogoMark, Particles, Sfx, WordReveal} from '../ui';

/** PATRON "Outro / CTA" : logo → phrase de clôture → bouton qui pulse → URL. */
export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const btn = pop(f, 46);
  const url = p(f, 62, 22);
  const pulse = (Math.sin(f / 6) + 1) / 2;
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Bg dark />
      <Particles />
      <Cam dur={SCENES.outro.dur}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 36}}>
          <LogoMark height={130} draw={p(f, 4, 26)} />
          <WordReveal text="Passez à l'action." start={14} size={120} color="#fff" accentWords={[2]} accent={C.primaryLight} />
          <div style={{padding: '30px 72px', borderRadius: 999, background: C.primary, color: '#fff', fontSize: 40, fontWeight: 700, display: 'flex', gap: 18, alignItems: 'center', transform: `scale(${btn})`, boxShadow: `0 0 ${40 + pulse * 50}px rgba(59,130,246,${0.45 + pulse * 0.25})`}}>
            Démarrer <ArrowRight size={40} />
          </div>
          <div style={{opacity: url, fontSize: 48, fontWeight: 700, color: '#fff'}}>
            <BrandWord size={48} dark />
          </div>
        </AbsoluteFill>
      </Cam>
      <Sfx at={4} name="riser" vol={0.45} />
      <Sfx at={24} name="sting" vol={0.9} />
      <Sfx at={46} name="pop" vol={0.6} />
    </AbsoluteFill>
  );
};
