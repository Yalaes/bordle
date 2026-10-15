# Bilan de projet — Bordle

## 1. Présentation

**Woordle** est un jeu de lettres inspiré de Wordle.

Le joueur doit deviner un mot secret de cinq lettres en six tentatives maximum.

## 2. Objectifs du projet

- Créer un jeu web fonctionnel en HTML, CSS et JavaScript natif.
- Mettre en pratique les bases du développement front-end.
- Organiser le code et les fichiers du projet de manière claire.
- Implémenter la logique d'un jeu de lettres, notamment la gestion des lettres répétées.
- Proposer une interface simple et intuitive.

## 3. Fonctionnalités prévues

- Grille de six lignes et cinq colonnes.
- Saisie des lettres et validation des propositions.
- Retour visuel sur les lettres bien placées, mal placées ou absentes.
- Gestion des conditions de victoire et de défaite.
- Utilisation exclusive de lettres majuscules non accentuées, de A à Z.

## 4. Décisions et règles

- Les mots secrets comportent exactement cinq lettres.
- Les propositions doivent comporter exactement cinq lettres.
- Certains mots de quatre lettres peuvent être acceptés au pluriel avec un `S` final.
- Les mots accentués sont normalisés avant leur utilisation.
- L'état d'une touche ne doit pas régresser si une proposition ultérieure fournit une information plus précise.
