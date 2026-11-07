import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// Ne PAS forcer setConcurrency : Remotion choisit selon la machine (forcer > nb de cœurs fait planter le rendu).
