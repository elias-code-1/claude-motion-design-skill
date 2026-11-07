# 02 — Architecture du projet

## Sommaire
1. Arborescence
2. theme.ts : la source unique de vérité
3. Film.tsx : registre de scènes, audio, sous-titres
4. Anatomie d'une scène
5. Compositions multiples (16:9, 9:16, 1:1)
6. Props & voix off auto-détectée
7. Polices
8. Ajouter une scène (checklist)

## 1. Arborescence

```
projet/
├── package.json            scripts: dev, render, render:vertical, sfx, vo, stills, typecheck
├── remotion.config.ts      (ne force PAS la concurrence)
├── tsconfig.json
├── public/
│   ├── fonts/*.woff2       copiées par init_project.sh
│   ├── img/                logo, photos détourées (PNG alpha)
│   └── audio/{music.mp3, sfx/*.wav, vo/*.mp3 + manifest.json}
├── scripts/                gen_audio.py · generate-vo.mjs · stills.mjs
└── src/
    ├── index.ts            registerRoot
    ├── Root.tsx            <Composition> × N
    ├── theme.ts            marque, couleurs, SCENES (timeline)
    ├── anim.ts             p() pop() soft() typed() rnd() easings
    ├── ui.tsx              Bg, Finish, Cam, LogoMark, WordReveal, Counter, Chip, Cursor, Tilt3D, Particles, Sweeps, Sfx
    ├── Film.tsx            REGISTRY de scènes + musique/ducking + sous-titres + VO
    ├── script.json         phrases VO [{id, from, to, text}]
    └── scenes/*.tsx        une scène = un fichier
```

Pour une app à montrer (dashboard…), ajoute `src/AppShell.tsx` (sidebar + zone de contenu) réutilisé par plusieurs scènes.

## 2. theme.ts

```ts
export const SCENES = {
  intro:   {from: 0,   dur: 105},
  hook:    {from: 105, dur: 180},
  // …
} as const;
export const TOTAL = Math.max(...Object.values(SCENES).map(s => s.from + s.dur));
export const CUTS  = Object.values(SCENES).slice(1).map(s => s.from);   // → les Sweeps
```
Changer la durée d'une scène = changer **un nombre** ; durée totale, transitions, durée de musique suivent. Pense à **décaler** les `from` des scènes suivantes (ou calcule-les : `from: prev.from + prev.dur`).

## 3. Film.tsx

- `REGISTRY: Record<keyof typeof SCENES, React.FC>` : TypeScript t'empêche d'oublier une scène.
- Chaque scène est dans `<Sequence from durationInFrames>` ; `<Sweeps/>` (transitions), `<Finish/>` (grain+vignette), `<Captions/>` par-dessus ; `<Audio>` musique avec `volume={(f)=>…}` (callback par frame → fade in/out + ducking).
- VO : `script.filter(l => voIds.includes(l.id))` → une `<Sequence from={l.from}><Audio/></Sequence>` par phrase.

## 4. Anatomie d'une scène

```tsx
export const Ma: React.FC = () => {
  const f = useCurrentFrame();            // LOCALE : 0 au début de la scène
  const t = p(f, 8, 24);                  // progression 0→1 entre les frames 8 et 32
  return (
    <AbsoluteFill style={{fontFamily: FONT}}>
      <Bg />                               // fond animé (dark prop)
      <Cam dur={SCENES.ma.dur}>            // zoom lent
        {/* contenu */}
        <Cursor keys={[[60, x0, y0], [90, x1, y1]]} clicks={[94]} />
      </Cam>
      <Sfx at={8} name="whoosh" />         // frame LOCALE
    </AbsoluteFill>
  );
};
```
Règles : positions en px (cadre 1920×1080) ; éléments `position:absolute` ou flex centré ; aucun état React (`useState`) — tout se déduit de `f`.

## 5. Compositions multiples

Même `Film` enregistré plusieurs fois avec d'autres dimensions (`Root.tsx`) :
```tsx
<Composition id="Film"         component={Film} width={1920} height={1080} … />
<Composition id="FilmVertical" component={Film} width={1080} height={1920} … />
```
Pour que les scènes s'adaptent : centre avec flex (`AbsoluteFill` + `alignItems/justifyContent`), évite les positions absolues en px pour les blocs principaux, lis `useVideoConfig()` pour choisir une mise en page (`const vertical = height > width`), réduis les tailles de titres (~0,7×). **Vérifie chaque scène avec `COMP=FilmVertical node scripts/stills.mjs …`**. Zones de sécurité vertical : laisse ~250 px en haut et ~380 px en bas (interfaces TikTok/Reels).

## 6. Props & voix off auto-détectée

`calculateMetadata` (Root.tsx) fait un `fetch(staticFile('audio/vo/manifest.json'))` : si le fichier existe, `voIds` est rempli, la VO est jouée et la musique baisse. Sinon rien (le 404 dans les logs est normal). Props modifiables dans Remotion Studio (`captions`, `music`) ou en CLI : `--props='{"captions":false,"music":true,"voIds":[]}'`.

## 7. Polices

`init_project.sh <dossier> <slug-fontsource>` (ex. `inter`, `poppins`, `plus-jakarta-sans`, `manrope`) installe `@fontsource/<slug>` et copie les woff2 (latin 400→800). La famille CSS interne s'appelle toujours `'Brand'` (`FONT` dans theme.ts). Chargement via `delayRender` (fonts.ts). Si la police de la marque n'est pas sur Fontsource : place les `.woff2` dans `public/fonts/` en respectant le nom `<slug>-latin-<poids>-normal.woff2` ou adapte `fonts.ts`.

## 8. Ajouter une scène

1. `SCENES` : nouvelle entrée `{from, dur}` (décale les suivantes).
2. `src/scenes/Nom.tsx` (copie une scène-patron).
3. `Film.tsx` : import + `REGISTRY`.
4. `script.json` : phrase VO si besoin (frames absolues).
5. `npm run typecheck` puis rendre l'image du milieu de la scène.
