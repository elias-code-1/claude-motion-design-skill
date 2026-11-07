import React from 'react';
import {Composition, staticFile} from 'remotion';
import './fonts';
import {Film, FilmProps} from './Film';
import {FPS, H, TOTAL, W} from './theme';

const defaultProps: FilmProps = {captions: true, music: true, voIds: []};

// Détecte automatiquement les voix off posées dans public/audio/vo (manifest.json = liste des ids)
const calculateMetadata = async ({props}: {props: FilmProps}) => {
  try {
    const r = await fetch(staticFile('audio/vo/manifest.json'));
    if (r.ok) return {props: {...props, voIds: (await r.json()) as string[]}};
  } catch {
    /* pas de VO */
  }
  return {props};
};

export const Root: React.FC = () => (
  <>
    {/* 16:9 — YouTube, site web, LinkedIn */}
    <Composition id="Film" component={Film} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={defaultProps} calculateMetadata={calculateMetadata} />
    {/* 9:16 — Reels, TikTok, Shorts (mêmes scènes, cadre différent) */}
    <Composition id="FilmVertical" component={Film} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} defaultProps={defaultProps} calculateMetadata={calculateMetadata} />
  </>
);
