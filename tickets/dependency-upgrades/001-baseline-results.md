# 001 — Référence de migration (Astro 5)

Date du relevé : 24 juillet 2026.

## Environnement et installation

- Node.js `v24.16.0`
- Bun `1.3.14`
- Branche : `update/astro-v7`
- `bun install --frozen-lockfile` : réussi, 548 installations vérifiées, aucune
  modification de `bun.lock`.

## Build de référence

`bun run build` réussit (Astro 5.16.6) :

- `astro check` : 0 erreur, 0 warning, 4 hints ;
- build serveur : 0,97 s ;
- build client : 2,00 s ;
- build total : 3,42 s ;
- routes pré-rendues : `/` et `/robots.txt` ;
- `sitemap-index.xml` est généré dans `dist/client`.

## Diagnostics existants à préserver pendant la migration

Les quatre hints Zod/TypeScript sont antérieurs à la migration :

1. `src/components/react/validation.ts:7` — `z.string().email()` est déprécié.
2. `src/components/react/validation.ts:17` — `z.inferFormattedError` est déprécié.
3. `src/components/react/Form.tsx:57` — `await sendResponse.data` n'a pas d'effet.
4. `src/components/react/Form.tsx:72` — `validate.error.format()` est déprécié.

Les deux warnings de build connus sont :

1. le texte `[file:line]`, trouvé hors du code applicatif, produit une règle
   Tailwind parasite ; le minifieur CSS esbuild l'interprète comme une propriété
   CSS inconnue ;
2. Vite signale un chunk supérieur à 500 kB après minification.

## Taille des chunks client

| Chunk                          |   Minifié |      Gzip |
| ------------------------------ | --------: | --------: |
| `Scene.Bu1gviIi.js` (scène 3D) | 972,33 kB | 262,97 kB |
| `client.DjFEfbVa.js`           | 182,63 kB |  57,15 kB |
| `Form.BMvCRWcL.js`             |  75,15 kB |  22,97 kB |
| `Portal.DAmC-MW1.js`           |  16,47 kB |   6,76 kB |

## Routes et ressources à revalider

- `/` : page d'accueil complète ;
- `/projets/[slug]` : chaque projet fourni par le CMS WordPress, lorsque le CMS est
  disponible ;
- `/robots.txt` : contenu, en-tête `text/plain` et URL de sitemap ;
- `/sitemap-index.xml` et les sitemaps qu'il référence ;
- ressources publiques : favicon, PDF de CV, polices, images et fichiers
  `public/avatar/*`.

## Checklist visuelle

- [ ] Header : logo/navigation, états mobile et liens d'ancre.
- [ ] Hero : typographie, image et appels à l'action.
- [ ] Constellation : affichage, animation et absence de régression de performance.
- [ ] Scène 3D : chargement de l'avatar, éclairage, interaction et repli en cas
      d'échec.
- [ ] Projets : liste, images, badges et liens vers les détails.
- [ ] Formulaire : disposition, messages et accessibilité.
- [ ] Footer : contenus, liens et image.

## Checklist fonctionnelle du formulaire

- [ ] Validation locale des champs nom, email et message.
- [ ] Soumission bloquée lorsque le captcha n'est pas validé.
- [ ] État de succès, sans envoyer d'email réel.
- [ ] État d'erreur retourné par le serveur, sans secret de production.
- [ ] Rendu HTML de l'email dans un environnement de test local.

## Limites du relevé

Ce ticket ne déclenche aucune soumission de formulaire réelle : les scénarios de
succès, erreur serveur et email restent une checklist de validation contrôlée.
