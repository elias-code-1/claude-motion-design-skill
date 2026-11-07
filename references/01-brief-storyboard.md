# 01 — Brief, storyboard, timeline, script voix off

## Sommaire
1. Le brief (questions)
2. Structure narrative
3. Budget de timeline
4. Tableau de storyboard
5. Écrire le script voix off
6. Sous-titres
7. Exemple complet (vidéo SaaS 50 s)

## 1. Le brief

Demande **uniquement ce qui manque** (une question à la fois, boutons `ask_user_input_v0` si disponible). Si l'utilisateur ne répond pas, **annonce tes hypothèses et avance**.

| Sujet | Défaut raisonnable |
|---|---|
| Objectif (vendre / expliquer / teaser / marque) | Promo produit |
| Cible & plateforme | Site web + LinkedIn + YouTube |
| Format | 16:9 1920×1080 (+ version 9:16 si réseaux) |
| Durée | 45–60 s promo · 15–30 s pub sociale · 20–40 s explainer court |
| Assets (logo, photos, captures, charte, police) | Analyse ce qui est fourni ; reconstruis le reste |
| Voix off | Oui si l'utilisateur dit « voix » ; sinon musique + SFX + sous-titres |
| Ton | Confiant, posé, moderne (pas « pub radio ») |
| Langue | Celle de l'utilisateur |
| CTA / URL | Obligatoire en dernière scène |

## 2. Structure narrative (gabarit qui marche)

| Bloc | Durée | Rôle |
|---|---|---|
| **Hook** | 0–3 s | Logo sting **ou** problème qui accroche. 80 % des gens décident ici. |
| **Problème** | 3–9 s | Montrer la douleur (le chaos : chips qui flottent, papiers, appels…) puis l'« éclair » (le chaos disparaît, titre fort). |
| **Solution** | 9–17 s | Le produit en situation (hero, écran principal). |
| **Preuve / démo** | 17–36 s | 2–3 scènes de démo : une idée par scène, avec action visible (curseur, notification, chiffre). |
| **Prix / offre** (optionnel) | 6 s | Chiffre clé animé, badge « Recommandé ». |
| **Accès / CTA** | 6–10 s | Login / inscription simulé puis outro : logo + phrase d'action + bouton + URL. |

Alterner **clair / sombre** : intro sombre → scènes claires → outro sombre (rythme + contraste).

## 3. Budget de timeline (30 fps)

- Une scène : 90–270 frames (3–9 s). Plus court = nerveux, plus long = ennuyeux.
- Les 10–15 premières frames d'une scène sont **cachées** par le sweep de transition : démarre les animations à la frame locale ≥ 6–8.
- Laisse **1 s de lecture** à tout texte important une fois apparu.
- Total = somme des scènes (les sweeps se superposent aux cuts, ils n'ajoutent pas de durée).
- Écris les durées dans `SCENES` (theme.ts). Tout le reste (cuts, durée totale, durée de la musique) en dérive.

## 4. Tableau de storyboard (à produire avant de coder)

```
| # | Frames (début, durée) | Message | Visuels / décor | Animations clés | SFX (frame locale) | Phrase VO (id) |
|---|---|---|---|---|---|---|
| 1 | 0, 105 | Marque | Fond sombre, logo | tracé du logo → mot | riser 0, impact 38, shimmer 42 | 01 |
```
Montre-le en ≤ 10 lignes à l'utilisateur ; ne bloque pas dessus.

## 5. Écrire le script voix off

- **Cadence FR : ~2,5 mots/s** (≈ 15 caractères/s). Une phrase de 6 s ≈ 15 mots.
- Chaque phrase tient dans sa fenêtre `[from, to]` avec **10 % de marge** (la voix commence ~0,3 s après le début de la scène, une fois le sweep passé).
- 1 phrase = 1 idée = 1 scène. Phrases courtes, verbes d'action, « vous ».
- **Optimise pour le TTS** (ElevenLabs & co) :
  - nombres en lettres : « dix mille cinq cent quatre-vingt-dix francs CFA » (pas « 10 590 »)
  - marque en phonétique si elle est mal lue : « Alance » (pas « aLance »), URL : « alance point pro »
  - sigles épelés ou développés ; pas de symboles (« % », « € », « → »)
  - ponctuation = respiration : virgules, points ; « … » pour une pause marquée
- Le texte **affiché** (sous-titres) peut différer du texte **lu** : garde `text` lisible, convertis dans `generate-vo.mjs` si besoin.
- Numérote les phrases `01, 02…` : ce sont les noms de fichiers audio.

## 6. Sous-titres

- Depuis `script.json` (`from`/`to` en frames absolues). Une ligne, ≤ 90 caractères, 31 px, pastille sombre semi-transparente, bas de l'écran.
- Les contenus importants ne descendent jamais dans les **120 derniers px** (zone sous-titres).
- Propose une version sans sous-titres : props `captions:false`.

## 7. Exemple (vidéo SaaS 50 s, 8 scènes)

| Scène | Frames | Idée |
|---|---|---|
| Intro | 0–105 | Logo se dessine, impact, nom, tagline |
| Accroche | 105–285 | 6 chips « chaos » → aspirés → « Arrêtez d'improviser. » |
| Hero | 285–495 | Page d'accueil reconstruite + photo détourée + 3 chips + curseur clique le CTA |
| Dashboard | 495–720 | Fenêtre 3D qui se redresse, chiffres qui comptent, « Simuler une mission » → notification → nouvelle ligne → carte technicien |
| Fonctionnalités | 720–990 | 3 onglets (graphique, rapport avec photo/notes/signature, facture multi-devises) pilotés par curseur |
| Tarifs | 990–1170 | 2 cartes, compteur de prix, badge, étincelles |
| Login | 1170–1350 | Saisie email/mot de passe, case « humain », clic → page d'équipe |
| Outro | 1350–1500 | Logo, « Prenez le contrôle de vos interventions. », bouton, URL |
