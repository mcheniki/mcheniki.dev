# 004 — Mettre à jour React et la pile Three.js

## What to build

Mettre à jour React et l'ensemble de la pile 3D dans un seul lot compatible, sans
régression visuelle ou comportementale de l'avatar.

## Package scope

- `react@19.2.8`
- `react-dom@19.2.8`
- types React/React DOM compatibles avec ces versions
- `@react-three/fiber@9.6.1`
- `three@0.185.1`
- `postprocessing@6.39.3`
- conserver `@react-three/postprocessing@3.0.4`
- conserver `@tweenjs/tween.js@25.0.0`

`three` et `postprocessing` doivent être montés ensemble : l'ancienne version de
`postprocessing` borne son peer dependency sous Three 0.183.

## Implementation notes

1. Mettre à jour tout le lot, puis exécuter le build avant toute correction.
2. Corriger uniquement les changements d'API ou de types réellement rencontrés.
3. Essayer de retirer le cast `GLTFLoader as any`; le conserver avec un commentaire
   seulement si les types R3F/Three l'exigent encore.
4. Vérifier le chargement GLTF, l'AnimationMixer, le suivi de la tête, les tweens et
   la libération des ressources au démontage.
5. Comparer le Bloom, les couleurs, la transparence et la luminosité avec la
   référence du ticket 001.
6. Vérifier le comportement quand WebGL échoue et sur viewport mobile.
7. Mesurer le bundle, sans entreprendre ici une refonte de découpage du chunk.

## Acceptance criteria

- [ ] Toutes les peer dependencies React/Three/postprocessing sont satisfaites.
- [ ] Le build ne contient aucune erreur TypeScript liée à React ou Three.
- [ ] L'avatar et toutes ses textures se chargent sans erreur console.
- [ ] Les animations du modèle démarrent et se nettoient correctement.
- [ ] Le suivi du pointeur et les tweens restent fluides.
- [ ] Le Bloom reste visuellement conforme à la référence.
- [ ] Le fallback d'erreur de la scène fonctionne.
- [ ] La nouvelle taille du chunk 3D est consignée et n'a pas régressé sans
      explication.

## Verification

```bash
bun install
bun run build
bun run dev
git diff --check
```

Effectuer les contrôles visuels sur desktop et sur un viewport mobile.

## Résultat de validation

- `bun install --frozen-lockfile` et `bun run build` réussissent ; les six hints Zod
  préexistants restent les seuls diagnostics.
- `bun pm why postprocessing` confirme que `@react-three/postprocessing@3.0.4` et
  le projet résolvent tous deux `postprocessing@6.39.3`, sans copie imbriquée
  bornée sous Three 0.183.
- Le chunk `Scene` produit pèse 983 805 octets minifiés (256 656 octets gzip),
  contre environ 972 kB / 263 kB dans la référence du ticket 001. La hausse
  minifiée d'environ 12 kB est cohérente avec Three 0.185.1 et reste marginale ;
  le gzip diminue d'environ 6 kB.

## Blocked by

- Ticket 003.
