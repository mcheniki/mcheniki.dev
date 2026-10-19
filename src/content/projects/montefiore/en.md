---
translationKey: 'montefiore'
locale: 'en'
title: 'Montefiore Apartments'
stack: ['wordpress', 'ovh', 'cpanel']
image: './montefiore.webp'
url: 'https://montefiore-apartments.com'
order: 5
mission: 'Infrastructure migration'
---

Montefiore Apartments needed to migrate its entire web infrastructure—domain, website and email—to a new hosting provider.
The main constraint was avoiding any service interruption, especially for emails, which are critical to the business.

I led the complete migration: moving the domain, website and email accounts to the new server. To guarantee zero downtime, I lowered the DNS TTL beforehand, copied the mailboxes with imapsync before the switch, then resynchronized them during propagation while keeping both servers live, and checked the SPF, DKIM and DMARC records. I also guided the client through reconfiguring her devices so she could access her email on the new server.

The migration was completed without service interruption. The client lost no email and retained her full message history.
