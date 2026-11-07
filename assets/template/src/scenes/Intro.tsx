import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BRAND_NAME, C, FONT, SCENES} from '../theme';
import {out, p} from '../anim';
import {Bg, BrandWord, Cam, LogoMark, Sfx} from '../ui';

/** PATRON "Intro logo" : le logo se dessine → impact → nom → tagline. ~3 s. */
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const draw = p(f, 6, 30, out);
  const word = p(f, 30, 22);
  const tag = p(f, 52, 20);
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Bg dark />
      <Cam dur={SCENES.intro.dur} from={1.12} to={1}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 28}}>
          <div style={{transform: `scale(${0.9 + draw * 0.1})`}}>
            <LogoMark height={220} draw={draw} />
          </div>
          <div style={{opacity: word, transform: `translateY(${(1 - word) * 40}px)`, filter: `blur(${(1 - word) * 12}px)`}}>
            <BrandWord size={110} dark />
          </div>
          <div style={{opacity: tag, fontSize: 34, letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(226,232,240,.85)', fontWeight: 500}}>Votre promesse en une ligne</div>
        </AbsoluteFill>
      </Cam>
      <Sfx at={0} name="riser" vol={0.55} />
      <Sfx at={34} name="impact" vol={0.9} />
      <Sfx at={40} name="shimmer" vol={0.45} />
    </AbsoluteFill>
  );
};
