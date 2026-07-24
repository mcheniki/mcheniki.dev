# 008 — Résultats de validation finale

Date du relevé : 24 juillet 2026.

## Verdict

La migration vers Astro 7 est validée sur le périmètre automatisé et le parcours
local de bureau. L'installation gelée, le formatage et le build terminent avec un
code zéro. Aucune erreur d'hydratation React, WebGL ou console n'a été observée
lors du parcours de l'accueil.

La validation de recette complète reste ouverte : les réponses HTTP de chaque
route, le rendu mobile et les scénarios de succès/email du formulaire requièrent
un environnement de préproduction contrôlé.

## Environnement et dépendances

- Node.js `v24.16.0` ; Bun `1.3.14` ; branche `update/astro-v7`.
- `bun install --frozen-lockfile` : réussi, 485 installations vérifiées, sans
  modification du lockfile.
- Versions cibles confirmées : Astro `7.1.3`, Vite `8.1.5`,
  `@astrojs/node` `11.0.2`, `@astrojs/react` `6.0.1` et TypeScript `6.0.3`.
- `bun outdated` ne remonte que `@types/node` : `22.20.1` installé, `26.1.1`
  disponible. La majeure 26 est volontairement reportée afin de conserver
  l'alignement avec le runtime Node 22 de production.
- TypeScript 7 reste explicitement reporté : l'outillage Astro est conservé sur
  TypeScript 6 tant que son API programmatique ne le prend pas en charge.

## Contrôles automatisés

| Contrôle               | Résultat                     |
| ---------------------- | ---------------------------- |
| `bun run format:check` | Réussi                       |
| `astro check`          | 0 erreur, 0 warning, 2 hints |
| `bun run build`        | Réussi                       |
| `git diff --check`     | Réussi                       |

Les deux hints restants proviennent de `FormEvent` dans
`src/components/react/Form.tsx`, déclaré obsolète par les types React 19. Ils ne
bloquent ni le type-check ni le build ; leur correction est un ajustement de code
isolé, hors de cette validation de dépendances.

## Parcours local

- L'accueil est rendu avec le header, le hero, les animations, les cartes, le
  formulaire et le footer.
- Les quatre cartes projets et leurs images sont chargées. Le panneau de détail
  de MACIF s'ouvre avec son contenu et son lien externe.
- La validation locale du formulaire affiche les erreurs pour les champs vides.
  Avec des champs valides mais sans captcha, la requête est rejetée et le message
  d'erreur est affiché ; aucun e-mail réel n'a été envoyé.
- La console du navigateur ne contient ni erreur ni avertissement pendant ce
  parcours. Les SVG, l'avatar 3D, les polices, le PDF de CV, le favicon et les
  assets du build sont présents dans `dist/client`.
- Les détails des projets sont des panneaux pré-rendus sur `/`, et non des routes
  `/projets/[slug]` dans cette version du site. Ils ont donc été validés via les
  cartes de l'accueil.
- Le build client ne contient aucune occurrence des noms de variables secrètes
  utilisées côté serveur (`SECRET_*`, Resend ou Turnstile).

La prévisualisation a été vérifiée en bureau. Le contrôle automatisé de la taille
de viewport ne s'applique pas au navigateur intégré dans cet environnement ; la
checklist visuelle mobile reste à rejouer manuellement sur un appareil ou un
navigateur avec émulation mobile fonctionnelle avant mise en production. Il faut
aussi relever les réponses HTTP de `/robots.txt`, du sitemap, des assets et de
chaque route de projet lorsqu'elles sont disponibles. Enfin, les états de succès,
d'erreur serveur contrôlée et le rendu HTML de l'email exigent des clés de test et
un destinataire de test ; ils ne sont pas couverts par le rejet sans captcha.

## Taille des bundles

| Chunk                          |   Minifié |      Gzip |
| ------------------------------ | --------: | --------: |
| `Scene.z_ns2W3c.js` (scène 3D) | 983,81 kB | 256,66 kB |
| `client.usl2DMiy.js`           | 180,63 kB |         — |
| `Form.BX09MwRG.js`             |  76,83 kB |         — |
| `Portal.kbs074lk.js`           |  16,66 kB |         — |

La scène 3D dépasse encore le seuil Vite de 500 kB. Le suivi dédié est décrit
dans le ticket 009 ; aucune refonte du chargement n'est introduite ici.

## Critères d'acceptation

- [x] Installation gelée, formatage, type-check et build réussis.
- [x] Accueil, panneaux de détail des projets et assets produits par le build
      vérifiés sur bureau.
- [x] Hydratation, scène 3D, SVG, interactions de projet et formulaire vérifiés
      sur bureau, sans erreur console ni e-mail réel.
- [x] Secrets absents du bundle client.
- [x] Versions, hints et mises à jour reportées consignés.
- [ ] Rendu mobile à rejouer manuellement avant production (limite du navigateur
      intégré).
- [ ] Réponses HTTP de toutes les routes, ressources publiques et sitemaps à
      relever en préproduction.
- [ ] Succès simulé, erreur serveur contrôlée et rendu HTML de l'email à valider
      avec les secrets de test.
