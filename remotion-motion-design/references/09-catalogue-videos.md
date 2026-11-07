# 09 — Catalogue : structures par type de vidéo

Chaque fiche : durée · structure en scènes · techniques clés · audio. Adapte `SCENES`, réutilise `ui.tsx`.

## Sommaire
Promo produit / SaaS · Pub sociale 15 s (vertical) · Explainer · Logo sting · Teaser d'événement · Data-viz / rapport · Témoignage / citation · Tutoriel / chapitre de formation · Avant / Après · Timeline / process · Présentation de feature (release notes) · Kinetic typography

## Promo produit / SaaS (45–60 s) — le cas de référence
Intro logo (3 s) → problème/chaos (6 s) → héros + photo (7 s) → démo ×3 (7–9 s chacune) → prix (6 s) → accès/login (6 s) → outro CTA (5 s).
Techniques : UI reconstruite, curseur, notifications, compteurs, onglets, photo détourée, chips. Audio : VO + SFX denses + musique 108 BPM.

## Pub sociale 15–20 s (9:16)
Hook (0–2 s : question/chiffre choc plein écran) → problème (3 s) → solution + bénéfice (5 s) → preuve (chiffre/étoiles, 3 s) → CTA (3 s).
Techniques : texte énorme centré, 1 mot à l'écran à la fois, coupes rapides (60–90 f/scène), sous-titres **obligatoires** (80 % regardent sans son), zones de sécurité vertical. Audio : musique punchy + SFX marqués. `COMP=FilmVertical`.

## Explainer (30–60 s)
Question → contexte simple → 3 étapes numérotées (icône + verbe + 1 ligne) → résultat → CTA.
Techniques : icônes lucide dans pastilles, lignes qui se dessinent entre étapes (`strokeDasharray`), numéros qui comptent, schéma qui se construit. Audio : VO prioritaire, SFX discrets.

## Logo sting (3–6 s)
Fond sombre → particules/halo → logo se dessine (wipe/tracé) → flare (reflet qui traverse) → impact → tagline. Audio : riser + impact + shimmer (voir `Intro.tsx`). Export `.mov` ProRes 4444 ou `.webm` alpha pour réutilisation.

## Teaser d'événement (15–30 s)
Date/lieu en gros, mots-clés qui claquent, compte à rebours (`Counter` inversé), speakers (photos en cercles avec halo), CTA inscription. Rythme sur la musique (coupes sur les temps : 108 BPM = 1 temps ≈ 16,7 frames).

## Data-viz / rapport (30–60 s)
1 chiffre clé par scène : compteur géant, barres/lignes qui se dessinent (`pathLength`), comparaison A/B, légende minimale, couleur d'accent sur la donnée qui compte. Pas plus de 5 éléments de données par écran. Source en bas.

## Témoignage / citation (10–20 s)
Photo détourée + halo, citation en `WordReveal` (mot par mot), nom/rôle/logo en entrée décalée, étoiles qui pop. Audio : musique douce, SFX très discrets.

## Tutoriel / chapitre de formation (module d'un cours)
Carte de chapitre (numéro géant + titre) → objectif en 1 phrase → étapes avec **zoom sur l'écran** (`Cam` ciblée, `ox/oy`) + curseur → récap en 3 puces → teaser du chapitre suivant. Sous-titres toujours ; ton pédagogique, rythme plus lent (≥ 4 s par écran).

## Avant / Après
Écran partagé avec séparateur qui glisse (`clipPath` animé), étiquettes « Avant »/« Après », chiffre de gain qui compte. Audio : `whoosh` au glissement + `success`.

## Timeline / process
Ligne horizontale qui se trace, jalons qui `pop` un par un avec date, caméra qui suit (`translateX` global). Un SFX `tick/pop` par jalon.

## Présentation de feature / release notes (15–30 s)
Badge « Nouveau » → capture/UI reconstruite de la feature → 3 chips de bénéfices → CTA « Essayer ». Court et net.

## Kinetic typography
Mots synchronisés sur le rythme (VO ou musique) : taille/couleur variables, mots qui glissent/rebondissent/tournent, éléments graphiques simples. Pour caler sur la voix : durée des mots depuis les timestamps d'ElevenLabs (alignment) → `from` de chaque mot.
