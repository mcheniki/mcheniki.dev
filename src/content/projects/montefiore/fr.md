---
translationKey: 'montefiore'
locale: 'fr'
title: 'Montefiore Apartments'
stack: ['wordpress', 'ovh', 'cpanel']
image: './montefiore.webp'
url: 'https://montefiore-apartments.com'
order: 5
mission: 'Migration infra'
---

Montefiore Apartments avait besoin de migrer l'ensemble de son infrastructure web (domaine, site, emails) vers un nouvel hébergeur.
Contrainte principale : aucune interruption de service, surtout pour les emails qui sont critiques pour l'activité.

J'ai piloté la migration complète : transfert du domaine, du site web et des boîtes email vers le nouveau serveur. Pour garantir zéro interruption, j'ai abaissé le TTL DNS en amont, copié les boîtes avec imapsync avant la bascule puis resynchronisé pendant la propagation en laissant les deux serveurs actifs, et vérifié les enregistrements SPF, DKIM et DMARC. J'ai également accompagné la cliente dans la reconfiguration de ses appareils pour qu'elle puisse récupérer ses emails sur le nouveau serveur.

Migration réalisée sans interruption de service. La cliente n'a perdu aucun email et a récupéré l'intégralité de son historique.
