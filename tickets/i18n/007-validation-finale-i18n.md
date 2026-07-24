# 007 — Valider l’i18n, l’accessibilité et les non-régressions

## Objectif

Prouver que la version bilingue est complète, navigable, indexable et sans régression sur
les interactions existantes.

## Dépend de

- Tickets 003, 004, 005 et 006.

## Vérifications automatisées

1. Exécuter :

    ```bash
    bun run format:check
    bun run build
    ```

2. Ajouter un contrôle léger et reproductible, sous forme de test existant ou de script
   dédié si aucun framework de test n’est présent, qui vérifie dans le rendu de production :
    - existence de `/index.html` et `/en/index.html`, ou routes équivalentes si rendues à la
      demande ;
    - `lang` correct ;
    - canonical correct ;
    - alternates réciproques `fr` et `en`, sans `x-default` ;
    - quatre cartes projets par langue ;
    - absence de `/fr/` dans le sitemap.
3. Ajouter un contrôle de parité des clés de traduction et des fiches projets.
4. Rechercher les chaînes françaises codées en dur dans `src/pages`, `src/layouts`,
   `src/components` et `src/actions`. Documenter chaque exception volontaire.

## Parcours manuels

Tester à 320 px, 768 px et 1440 px :

1. Charger directement `/`, puis `/en/`.
2. Changer de langue dans les deux directions, avec et sans menu mobile ouvert.
3. Vérifier que le CTA contact reste dans la langue active.
4. Ouvrir et fermer chacun des quatre drawers au clic, via Échap et via le bouton.
5. Parcourir le sélecteur, le menu, les cartes, le drawer et le formulaire au clavier.
6. Déclencher toutes les erreurs du formulaire, puis une soumission valide.
7. Vérifier les fallbacks du formulaire et de la scène 3D.
8. Contrôler l’absence d’erreurs console et de warnings d’hydratation.
9. Désactiver JavaScript et confirmer que le contenu, les liens de langue et les
   coordonnées restent accessibles. Les drawers et le formulaire peuvent perdre leur
   interaction, mais leurs alternatives doivent rester compréhensibles.

## Matrice attendue

| Élément       | `/`         | `/en/`         |
| ------------- | ----------- | -------------- |
| `<html lang>` | `fr`        | `en`           |
| Canonical     | `/`         | `/en/`         |
| CTA contact   | `/#contact` | `/en/#contact` |
| Projets       | 4 FR        | 4 EN           |
| Turnstile     | `fr`        | `en`           |
| `og:locale`   | `fr_FR`     | `en_US`        |

## Critères d’acceptation

- [ ] Tous les contrôles automatisés passent.
- [ ] Aucun texte français involontaire n’est rendu sur `/en/`.
- [ ] Aucun texte anglais involontaire n’est rendu sur `/`.
- [ ] Le sélecteur et les interactions principales sont utilisables au clavier.
- [ ] Aucun débordement visuel n’est observé aux largeurs prévues.
- [ ] Les formulaires français et anglais atteignent l’action serveur.
- [ ] Les résultats de validation et les exceptions volontaires sont consignés dans ce
      ticket avant de le fermer.

## Résultats de validation

- Contrôle automatisé : `bun run check:i18n` valide le rendu généré dans `dist/client` :
  routes FR/EN, attributs `lang`, canonicals, alternates réciproques sans `x-default`,
  quatre cartes par langue et l'absence de `/fr/` dans le sitemap.
- Parité : le même contrôle vérifie les clés de `src/i18n/ui.ts` et les huit fiches projet
  (une version FR et EN pour chacune, avec métadonnées communes identiques).
- Exceptions françaises volontaires dans les zones auditées : les commentaires de
  `StackConstellation.tsx` et le titre de l'e-mail interne dans `EmailTemplate.astro`.
  Ils ne sont pas rendus dans la page anglaise ; le second est réservé à la réception des
  e-mails de contact.
- Les vérifications visuelles et les soumissions réelles avec Turnstile restent à effectuer
  dans un navigateur connecté avant la fermeture du ticket, car elles nécessitent une clé
  Turnstile et un service d'envoi configurés.
