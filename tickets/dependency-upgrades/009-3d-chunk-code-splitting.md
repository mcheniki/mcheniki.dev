# 009 — Réduire le coût initial de la scène 3D

## Contexte

La validation finale de la migration Astro 7 relève un chunk de scène 3D de
983,81 kB minifiés (256,66 kB gzip), au-dessus de l'avertissement Vite à 500 kB.

## Objectif

Charger la scène 3D seulement lorsqu'elle est nécessaire, sans modifier son rendu
ni dégrader son repli en cas d'échec WebGL.

## Piste de mise en œuvre

1. Mesurer si la scène est visible au chargement et identifier le composant React
   island qui l'importe.
2. Déplacer l'import Three.js/R3F derrière un `dynamic import()` ou une island
   Astro hydratée à l'intersection de la zone visible.
3. Conserver un fallback accessible, sans WebGL, pendant le chargement et en cas
   d'échec.
4. Relever de nouveau les tailles minifiées et gzip, le LCP et les erreurs console
   sur bureau et mobile.

## Critères d'acceptation

- [ ] Le premier chargement ne télécharge pas le chunk 3D avant son besoin réel.
- [ ] La scène, ses interactions et son fallback conservent le comportement actuel.
- [ ] Le warning de taille Vite est supprimé ou justifié par une mesure documentée.
- [ ] Aucun problème d'hydratation ou WebGL n'apparaît sur les navigateurs cibles.

## Bloqué par

- Ticket 008.
