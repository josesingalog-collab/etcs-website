# Déploiement — Site ETCS SARL (etcs-website)

Guide d'installation sur un serveur de production pour **https://etcs-ingenierie.com**.

Stack du projet : **Next.js 16 (Node.js), PostgreSQL, Prisma 6, npm** ; authentification admin par JWT (cookie `etcs_admin`, secret `AUTH_SECRET`) ; reverse proxy **Nginx** avec **HTTPS**.

> Ce guide ne modifie aucun fichier applicatif. Tous les emplacements entre `<...>` sont à adapter. Aucun secret réel ne doit être écrit dans ce document ou dans le dépôt Git.

---

## 1. Prérequis serveur

- **Linux Ubuntu LTS** (22.04 ou 24.04) recommandé, avec accès SSH.
- **Node.js** compatible : le projet utilise **Next.js 16**, qui requiert **Node.js ≥ 20.9** — installer la LTS **20** ou **22** (via `apt` ou [nvm](https://github.com/nvm-sh/nvm)).
- **npm** (livré avec Node.js).
- **PostgreSQL** (14+) — le projet utilise Prisma 6, pilote PostgreSQL.
- **Git**.
- **Nginx** comme reverse proxy.
- **Certificat SSL** (Certbot/Let's Encrypt, section 10).

Vérification de l'environnement :

```bash
node -v        # attendu : v20.9 ou v22.x
npm -v
psql --version
git --version
nginx -v
```

---

## 2. Récupération du projet

```bash
git clone https://github.com/josesingalog-collab/etcs-website.git etcs-website
cd etcs-website
```

Le dépôt peut être cloné en HTTPS (ci-dessus) ou en SSH (`git@github.com:josesingalog-collab/etcs-website.git`) selon la configuration du serveur.

Installer exactement les dépendances déclarées dans `package-lock.json` :

```bash
npm ci
```

---

## 3. Variables d'environnement

Créer un fichier `.env` *(variable `.env.production` non nécessaire : seul `.env` est lu)* à la racine du projet :

```env
DATABASE_URL="postgresql://<UTILISATEUR>:<MOT_DE_PASSE>@127.0.0.1:5432/etcs_website?schema=public"
AUTH_SECRET="<SECRET_GENERE_AVEC_OPENSSL_RAND>"
NODE_ENV="production"
```

Générer un `AUTH_SECRET` robuste (au moins 32 caractères) :

```bash
openssl rand -base64 48
```

Règles impératives :

- Le secret de production (**AUTH_SECRET**) doit être **différent** de celui utilisé en local.
- `.env` est déjà exclu de Git par `.gitignore` : **ne jamais le versionner, ne jamais le publier** (ni `DATABASE_URL`, ni `AUTH_SECRET`).

---

## 4. Base de données PostgreSQL

Créer un utilisateur dédié (droits limités à cette base) puis la base :

```bash
sudo -u postgres psql
```

```sql
CREATE ROLE etcs_app WITH LOGIN PASSWORD '<MOT_DE_PASSE_FORT>';
CREATE DATABASE etcs_website OWNER etcs_app;
GRANT ALL PRIVILEGES ON DATABASE etcs_website TO etcs_app;
\q
```

- Reportez ces identifiants dans `DATABASE_URL` (section 3).
- **Ne jamais supprimer ou réinitialiser une base de production existante.**

---

## 5. Prisma et migrations

Les migrations du projet sont **additives** (aucune donnée effacée) et doivent être appliquées telles quelles sur la base de production :

```bash
npx prisma migrate deploy
```

Vérification (optionnelle mais conseillée) :

```bash
npx prisma migrate status
```

**Interdiction stricte en production :**

```bash
npx prisma migrate reset   # NE PAS EXÉCUTER : efface la base
```

---

## 6. Compte administrateur

Vérifier l'état du compte admin :

```bash
npm run admin:status
```

Si aucun compte n'existe, le créer avec demain des valeurs saisies à la volée (terminal Linux) — jamais en ligne de commande visible dans l'historique :

```bash
ADMIN_EMAIL="admin@etcs-ingenierie.com" ADMIN_PASSWORD="<MOT_DE_PASSE_FORT>" npm run admin:init
```

- Le mot de passe doit être **robuste** (long, aléatoire, unique) et conservé dans un gestionnaire de secrets.
- Après la mise en production, **changer à nouveau** ce mot de passe depuis l'interface `/admin`.

---

## 7. Build de production

```bash
npm run build
```

Puis, pour un test local sur le serveur **avant** de connecter le domaine :

```bash
PORT=3000 npm run start
```

Vérifier sur place puis arrêter avec `Ctrl+C` :

```bash
curl -s http://127.0.0.1:3000/ | head -n 20
curl -s http://127.0.0.1:3000/robots.txt
```

---

## 8. Service permanent (systemd)

Empêcher Next.js de s'éteindre à la fermeture SSH : créer `/etc/systemd/system/etcs.service` :

```ini
[Unit]
Description=ETCS Next.js Application
After=network.target

[Service]
Type=simple
User=<UTILISATEUR_SYSTEME>
WorkingDirectory=/var/www/etcs-website
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Adaptations requises :

- `` `which npm` `` : `which npm` donne le chemin réel (souvent `/usr/bin/npm` ou `~/.nvm/.../npm`) — corriger `ExecStart` si nécessaire.
- `<UTILISATEUR_SYSTEME>` : un compte non-admin prévu à cet effet (ex. `etcs`), propriétaire de `/var/www/etcs-website`.

Activation :

```bash
sudo systemctl daemon-reload
sudo systemctl enable etcs
sudo systemctl start etcs
sudo systemctl status etcs
```

 Logs applicatifs : `journalctl -u etcs -f`.

---

## 9. Nginx (reverse proxy)

Exemple de configuration `/etc/nginx/sites-available/etcs` :

```nginx
server {
    listen 80;
    server_name etcs-ingenierie.com www.etcs-ingenierie.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }
}
```

Activer et valider :

```bash
sudo ln -s /etc/nginx/sites-available/etcs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 10. HTTPS (Certbot / Let's Encrypt)

```bash
sudo apt update && sudo apt install -y certbot python3-certbot-nginx
```

> **Préalable indispensable : le DNS doit déjà pointer vers ce serveur** (section 11) — contrôler avec `dig +short etcs-ingenierie.com` (réponse = IP du serveur).

Obtenir le certificat (inclut la redirection HTTPS) :

```bash
sudo certbot --nginx -d etcs-ingenierie.com -d www.etcs-ingenierie.com
```

Vérifier le renouvellement automatique :

```bash
sudo certbot renew --dry-run
sudo systemctl status certbot.timer
```

---

## 11. DNS (checklist préalable au HTTPS)

- [ ] Enregistrement **A** `@` → IP publique du serveur.
- [ ] Enregistrement **A** (ou **CNAME** vers le domaine principal) `www`.
- [ ] Attendre la propagation (quelques minutes à quelques heures).
- [ ] Vérifier avant de demander le certificat : `dig +short etcs-ingenierie.com` et `dig +short www.etcs-ingenierie.com` doivent renvoyer l'IP du serveur.

---

## 12. Vérifications finales

### Site public

- [ ] `https://etcs-ingenierie.com/`
- [ ] `https://etcs-ingenierie.com/a-propos`
- [ ] `https://etcs-ingenierie.com/services`
- [ ] `https://etcs-ingenierie.com/services/<slug>` (une fiche)
- [ ] `https://etcs-ingenierie.com/realisations`
- [ ] `https://etcs-ingenierie.com/actualites`
- [ ] `https://etcs-ingenierie.com/contact`
- [ ] `https://etcs-ingenierie.com/devis`

### Administration

- [ ] `https://etcs-ingenierie.com/admin` (redirige vers la connexion si non connecté)
- [ ] `https://etcs-ingenierie.com/admin/login`
- [ ] Connexion administrateur, puis vérification de l'écran « Paramètres »
- [ ] Déconnexion

### Technique

- [ ] `https://etcs-ingenierie.com` visitable directement (HTTPS actif, cadenas)
- [ ] `http://etcs-ingenierie.com` redirige vers HTTPS
- [ ] Cookie `etcs_admin` avec attribut **Secure/HttpOnly** (outils dev navigateur)
- [ ] `https://etcs-ingenierie.com/robots.txt` (doit exclure `/admin`)
- [ ] `https://etcs-ingenierie.com/sitemap.xml`

---

## 13. Sécurité — rappels permanents

- Ne jamais versionner `.env` (déjà dans `.gitignore` — ne pas le retirer).
- `AUTH_SECRET` **unique** en production (différent du local) ; rotation en cas de doute.
- Mot de passe administrateur robuste, stocké dans un gestionnaire de secrets ; changement régulier.
- Maintenir Node.js et les dépendances à jour (`npm audit` pour les vulnérabilités).
- **Sauvegardes PostgreSQL automatiques** (ex. cron + `pg_dump`), testées sur un environnement de restauration.
- Surveiller les logs : `journalctl -u etcs -f`, `/var/log/nginx/error.log`.
- **Restreindre PostgreSQL au localhost** (écriture de `postgresql.conf` : `listen_addresses = 'localhost'`) et au besoin via `pg_hba.conf`.
- **Ne jamais exposer le port 5432** sur Internet (pare-feu : `sudo ufw allow 'Nginx Full'`, `sudo ufw deny 5432`).

---

## 14. Mise à jour ultérieure du site

```bash
cd /var/www/etcs-website
git pull
npm ci
npx prisma migrate deploy
npm run build
sudo systemctl restart etcs
sudo systemctl status etcs   # vérifier "active (running)" après CHAQUE mise à jour
```

En cas d'échec, consulter `journalctl -u etcs -n 50` et, si besoin, revenir au commit précédent (`git checkout <tag>`), reconstruire, redémarrer.
