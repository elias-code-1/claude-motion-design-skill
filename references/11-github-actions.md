# 11 — Rendu cloud avec GitHub Actions

## Sommaire
1. Principe
2. Fichiers fournis
3. Utilisation (à donner à l'utilisateur)
4. Adapter le workflow
5. Quotas, durée, confidentialité
6. Dépannage
7. Honnêteté de livraison

## 1. Principe

Au lieu de rendre la vidéo sur la machine de l'utilisateur (ou dans un Codespace), GitHub lance un serveur Linux qui installe le projet, exécute `npm run render` et publie le MP4 en **artefact** téléchargeable. Aucun terminal côté utilisateur : tout se fait depuis le site GitHub (utile sur téléphone ou PC faible).

## 2. Fichiers fournis (déjà dans `assets/template/`, copiés par `init_project.sh`)

| Fichier | Rôle |
|---|---|
| `.github/workflows/render-video.yml` | Le workflow (Node 22, `npm ci`, rendu, upload de l'artefact `video`) |
| `.gitignore` | Exclut `node_modules/` et `out/` pour ne pas les envoyer sur GitHub. **Ne pas** ignorer `public/audio/` ni `public/fonts/` : le rendu en a besoin |

Ne retire jamais ces fichiers du zip livré. Le dossier `.github` est « caché » sous macOS/Linux : vérifie qu'il est bien dans le zip (`unzip -l`).

## 3. Utilisation

1. Envoyer le projet (dossier dézippé, avec `.github`) dans un dépôt GitHub.
2. Onglet **Actions** → workflow **Render video**. Le rendu part tout seul à l'envoi ; sinon bouton **Run workflow** (case « vertical » pour le 9:16).
3. Quand l'exécution est verte, ouvrir l'exécution → section **Artifacts** → télécharger **video** (un zip contenant le MP4).
4. Télécharger rapidement : l'artefact expire (14 jours ici).

Sur téléphone, passe le navigateur en « version pour ordinateur » si le bouton Run workflow n'apparaît pas.

## 4. Adapter le workflow

- **Compositions** : le template définit `Film` (16:9) et `FilmVertical` (9:16) dans `src/Root.tsx`. Si tu les renommes, change aussi `package.json` (`render`, `render:vertical`) — le workflow appelle seulement ces scripts.
- **Node** : version 22 (celle avec laquelle le template a été testé). Remotion est épinglé en 4.0.250 par `init_project.sh`.
- **Audio** : musique/SFX (`public/audio/…`) doivent être **dans le dépôt**. Si le dossier `public/audio/sfx` manque, l'étape de génération les recrée (ffmpeg + numpy/scipy), mais mieux vaut les pousser.
- **Voix off** : `public/audio/vo/*.mp3` + `manifest.json` à pousser aussi (le rendu les détecte automatiquement).
- **Qualité/vitesse** : pour un aperçu rapide, ajoute `--scale=0.5 --crf=28` dans une copie du script `render`.

## 5. Quotas, durée, confidentialité

- **Durée** : ordre de grandeur 0,1–0,5 s/image (voir `07-render-qa.md`) → 50 s à 30 i/s = 1 500 images ≈ 3 à 12 min. Le serveur gratuit est souvent moins puissant qu'une machine perso. `timeout-minutes: 60` évite une boucle infinie.
- **Minutes gratuites** : un dépôt **privé** consomme le quota gratuit d'Actions (un exemple public de rendu Remotion le signale : le rendu sur dépôt privé l'épuise vite). Vérifie le quota actuel dans les réglages GitHub (facturation) avant de promettre « gratuit ».
- **Dépôt public** = tout le monde voit les assets et le projet du client. Ne publie jamais de contenu confidentiel dans un dépôt public.
- **Limite de fichier** : GitHub refuse un fichier > 100 Mo à l'envoi. Les vidéos sources lourdes ne vont pas dans le dépôt (compresse-les, ou utilise des captures).

## 6. Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| Onglet Actions sans workflow | `.github` non envoyé (dossier caché) | Sur GitHub : Add file → Create new file → taper `.github/workflows/render-video.yml` comme nom, coller le contenu |
| Actions désactivées | Dépôt issu d'un fork | Cliquer sur le bouton d'activation des workflows dans l'onglet Actions |
| `npm ci` échoue | `package-lock.json` absent/désynchronisé | Supprimer `package-lock.json` du dépôt (le workflow retombe sur `npm install`) |
| Rendu en erreur | Composition inexistante, police ou audio non poussés | Lire l'étape « Rendre la vidéo » du journal ; vérifier `public/fonts` et `public/audio` ; coller l'erreur à Claude |
| Erreur de bibliothèque système (Chrome) | Dépendance Linux manquante | Ajouter une étape `apt-get install` du paquet cité dans l'erreur (doc Remotion « Linux dependencies ») |
| « No files were found » | Le rendu n'a rien produit | Lire les étapes précédentes ; le MP4 doit être dans `out/` |
| Artefact introuvable plus tard | Expiré (14 jours) | Relancer le workflow (Run workflow ou « Re-run all jobs ») |

## 7. Honnêteté de livraison

Le workflow **ne peut pas être exécuté dans le sandbox Claude** : écris dans la livraison « workflow GitHub Actions fourni, non exécuté ici » (rubrique *non vérifié*). Colle aussi son contenu dans le message final : si `.github` ne remonte pas sur GitHub, l'utilisateur le recrée à la main (§6).

Message type à donner à l'utilisateur :
> 1. Envoie le projet dans un dépôt GitHub. 2. Onglet **Actions** → **Render video** (attends la fin, ou **Run workflow**). 3. Ouvre l'exécution et télécharge l'artefact **video**.
