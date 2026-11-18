# Déploiement cPanel (WHC) — Site ETCS SARL (etcs-website)

Guide d'installation sur l'**hébergement web mutualisé WHC** (cPanel + CloudLinux + Passenger) pour **https://etcs-ingenierie.com**.

Stack du projet : **Next.js 16 (Node.js ≥ 20.9), MySQL/MariaDB, Prisma 6, npm** ; authentification admin par JWT (cookie `etcs_admin`, secret `AUTH_SECRET`). Le serveur HTTP est géré par WHC (Apache/LiteSpeed + Passenger) — **pas de Nginx ni systemd à configurer**.

> Aucun secret réel ne doit être écrit dans ce document ni dans le dépôt Git.

---

## 1. Prérequis

- **Forfait WHC Pro ou Business** (SSH inclus). Le forfait Go ne convient pas (pas de SSH).
- **Node.js 20 ou 22** proposé dans cPanel (vérifié via « Setup Node.js App »).
- Le **nom de domaine** et l'hébergement sont sur le même compte WHC.
- Accès **cPanel** (https://votredomaine.com:2083 ou depuis l'Espace Client WHC).
- **SSH** : activé par défaut sur Pro/Business — `ssh UTILISATEUR@etcs-ingenierie.com -p 27` (mot de passe = mot de passe cPanel).
- Un client **SFTP** (FileZilla, WinSCP) pour l'envoi du build si nécessaire.

---

## 2. Créer la base de données MySQL

Dans cPanel → **Bases de données MySQL** :

1. Créer la base : `etcs_website` → cPanel la préfixe automatiquement (ex. `cpuser_etcs_website`).
2. Créer un utilisateur MySQL (ex. `cpuser_etcs`) avec un **mot de passe fort** (générateur cPanel).
3. **Ajouter l'utilisateur à la base** avec **Tous les privilèges**.

Noter les valeurs exactes affichées (préfixe inclus) — elles servent à `DATABASE_URL` (section 4).

---

## 3. Créer l'application Node.js

Dans cPanel → **Setup Node.js App** (ou « Web Apps ») → **Create Application** :

| Champ | Valeur |
|---|---|
| Node.js version | **20.x ou 22.x** (le plus récent proposé) |
| Application mode | **Production** |
| Application root | `etcs-website` (créé dans le répertoire personnel, **hors public_html**) |
| Application URL | `etcs-ingenierie.com` |
| Application startup file | `app.js` |

Ne rien exécuter encore ; l'application redémarrera en fin de guide (section 8).

---

## 4. Variables d'environnement

Toujours dans « Setup Node.js App », éditer l'application → **Environment variables** :

| Nom | Valeur |
|---|---|
| `DATABASE_URL` | `mysql://cpuser_etcs:MOT_DE_PASSE@127.0.0.1:3306/cpuser_etcs_website` |
| `AUTH_SECRET` | secret **différent du local**, ≥ 32 caractères |

Points d'attention :

- Remplacer `cpuser_etcs`, `cpuser_etcs_website` et le mot de passe par les valeurs réelles de la section 2.
- Si le mot de passe contient des caractères spéciaux (`@ : / # ?`), les **encoder en URL** (ex. `@` → `%40`) — outil : urlencoder.org.
- Générer un `AUTH_SECRET` robuste : `openssl rand -base64 48` (en SSH, section 5).
- Sauvegarder, puis **Restart** n'est pas encore nécessaire.

---

## 5. Récupérer le code et installer les dépendances (SSH)

Se connecter en SSH et cloner le dépôt **dans le répertoire déclaré comme Application root** :

```bash
ssh UTILISATEUR@etcs-ingenierie.com -p 27
cd ~/etcs-website 2>/dev/null || { mkdir ~/etcs-website && cd ~/etcs-website; }
git clone https://github.com/josesingalog-collab/etcs-website.git .
```

Activer l'environnement Node de l'application — la commande exacte est affichée par cPanel en haut de la page de l'application (« **Enter to the virtual environment** ») :

```bash
source /home/etcsinge/nodevenv/etcs-website/22/bin/activate && cd /home/etcsinge/etcs-website
unset NODE_PATH
```

> **`unset NODE_PATH` est indispensable** : le venv exporte un `NODE_PATH` vers son propre dossier `lib/node_modules`. Si des paquets s'y retrouvent (comportement du npm du venv), React est chargé en double et le build échoue avec `Cannot read properties of null (reading 'useContext')`.

Puis installer les dépendances avec le **npm système** (le npm du venv est une enveloppe CloudLinux qui installe ailleurs que dans le dossier du projet) :

```bash
/opt/alt/alt-nodejs22/root/bin/npm ci --include=dev
```

> **Important** : l'environnement cPanel définit `NODE_ENV=production`, ce qui fait ignorer les `devDependencies` par défaut. L'option `--include=dev` force leur installation — elles sont nécessaires au build (TypeScript, `@tailwindcss/postcss`).

---

## 6. Initialiser la base (migrations, contenu, admin)

Toujours dans l'environnement virtuel activé :

```bash
npx prisma migrate deploy
npm run admin:status
```

Si aucun compte admin n'existe :

```bash
ADMIN_EMAIL="admin@etcs-ingenierie.com" ADMIN_PASSWORD="<MOT_DE_PASSE_FORT>" npm run admin:init
```

Puis charger les contenus initiaux :

```bash
node scripts/apply-etcs-settings.mjs
node scripts/seed-etcs-services.mjs
```

Vérifier que les tables existent via cPanel → **phpMyAdmin** (tables `User`, `Service`, `SiteSettings`, etc.).

---

## 7. Build de production

> **Important (WHC/CloudLinux)** : les liaisons natives Turbopack ne sont pas disponibles sur le serveur mutualisé (glibc trop ancien). Utiliser **webpack** sur le serveur ; le build Turbopack reste réservé à la machine de développement.

Deux méthodes — commencer par la A, basculer sur la B en cas d'échec.

### Méthode A — build sur le serveur

Dans l'environnement virtuel (avec `NODE_PATH` désactivé) :

```bash
/opt/alt/alt-nodejs22/root/bin/node node_modules/.bin/next build --webpack
```

> Le forfait Pro dispose de ~1,5 Go de RAM. Si le build échoue (process killed / OOM), utiliser la méthode B.

### Méthode B — build local + envoi SFTP

Sur la machine de développement :

```bash
npm ci
npm run build
```

Puis compresser le résultat et l'envoyer :

1. Compresser le dossier `.next` en `next.zip` (dossier du projet local).
2. Envoyer `next.zip` à la racine `~/etcs-website/` en SFTP (hôte `etcs-ingenierie.com`, port **27**, identifiants cPanel).
3. En SSH, dans l'environnement virtuel :

```bash
cd ~/etcs-website
rm -rf .next
unzip next.zip && rm next.zip
```

> Ne jamais envoyer `.next` en le mélangeant avec un build partiel : supprimer l'ancien dossier d'abord (commande ci-dessus).

---

## 8. Démarrer l'application

Dans cPanel → **Setup Node.js App** → application `etcs-website` → **Restart**.

Vérification immédiate en SSH :

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://etcs-ingenierie.com
```

Attendu : `200` (ou `301` si HTTPS force la redirection). En cas d'erreur :

- **500 / application ne démarre pas** : cPanel → Setup Node.js App → consulter le **log des erreurs** (ou `~/logs/`). Vérifier que `node_modules`, `.next`, `app.js`, `prisma/` sont bien dans `~/etcs-website`.
- Vérifier les variables d'environnement (section 4) et redémarrer.

---

## 9. HTTPS (AutoSSL)

Dans cPanel → **SSL/TLS Status** :

1. Sélectionner `etcs-ingenierie.com` et `www.etcs-ingenierie.com`.
2. **Exécuter AutoSSL** (Let's Encrypt via cPanel — renouvellement automatique).
3. Vérifier le statut « Certificat valide » pour les deux domaines.

Rediriger tout en HTTPS : cPanel ne le fait pas automatiquement — dans le **Gestionnaire de fichiers**, ajouter en haut de `public_html/.htaccess` :

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

> Si `.htaccess` contient déjà des règles écrites par cPanel pour l'application Node, ne **pas** les supprimer — ajouter uniquement les lignes ci-dessus au début.

---

## 10. DNS et domaine

Si le domaine est **chez WHC** et hébergé sur ce compte cPanel, il n'y a normalement rien à faire. Vérifier dans cPanel → **Zone Editor** :

- Enregistrement **A** `@` → IP du serveur (visible dans cPanel → Informations sur le serveur).
- Enregistrement **CNAME/A** `www` → même destination.

Si le domaine est **ailleurs** : créer chez le registrar un A `@` et un `www` vers l'IP du serveur, puis attendre la propagation.

---

## 11. Vérifications finales

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
- [ ] Connexion administrateur, écran « Paramètres » visible
- [ ] Déconnexion

### Technique

- [ ] `http://etcs-ingenierie.com` redirige vers HTTPS
- [ ] `https://etcs-ingenierie.com/robots.txt` (exclut `/admin`)
- [ ] `https://etcs-ingenierie.com/sitemap.xml`
- [ ] Formulaire de contact et de devis reçus dans `/admin`

---

## 12. Mise à jour ultérieure du site

Sur la machine de développement, pousser les modifications (`git push`), puis en SSH dans l'environnement virtuel :

```bash
cd ~/etcs-website
source ~/nodevenv/etcs-website/22/bin/activate
unset NODE_PATH
git pull
/opt/alt/alt-nodejs22/root/bin/npm ci --include=dev   # seulement si package-lock.json a change
npx prisma generate                                    # seulement si prisma/schema.prisma a change
npx prisma migrate deploy                              # seulement si une migration a ete ajoutee
/opt/alt/alt-nodejs22/root/bin/node node_modules/.bin/next build --webpack
```

Puis dans cPanel → Setup Node.js App → **Restart**, et vérifier le site (checklist 11).

---

## 13. Dépannage — problèmes connus (retours d'expérience)

| Symptôme | Cause | Correction |
|---|---|---|
| `Cannot find module 'next'` | `node_modules` absent/cassé (la suppression de l'app cPanel nettoie les dépendances) | `unset NODE_PATH` puis `/opt/alt/alt-nodejs22/root/bin/npm ci --include=dev` |
| Build OK mais `Cannot read properties of null (reading 'useContext')` | React chargé en double via le `NODE_PATH` du venv | `unset NODE_PATH`, `rm -rf .next`, rebuild |
| `ln: failed to create symbolic link .../nodevenv/.../lib/package.json` | venv cPanel recréé incomplet (après delete/create de l'app) | `mkdir -p ~/nodevenv/etcs-website/22/lib` puis installer avec le npm système |
| 503 sur tout le site | Passenger ne trouve pas l'app ou `.htaccess` absent | Vérifier `~/public_html/.htaccess` (PassengerAppRoot/BaseURI) et **Restart** |
| 200 mais page d'erreur Next (`__next_error__`) | Erreur applicative — consulter `~/etcs-website/error.log` | Le fichier `error.log` contient la trace complète (via `instrumentation.ts` + `app.js`) |
| Prisma « the URL must start with the protocol mysql:// » | `DATABASE_URL` absent/corrompu dans l'environnement Passenger | Corrigé : `app.js` charge `~/etcs-website/.env` en priorité ; vérifier ce fichier |
| Prisma « Query engine library not found » | Détection de plateforme différente sous Passenger (debian vs rhel) | Corrigé : `binaryTargets` multiples dans `prisma/schema.prisma` + `npx prisma generate` |
| `npm run build` : « Turbopack is not supported on this platform » | glibc du serveur trop ancien pour Turbopack | Build avec `--webpack` (voir section 7) |

> **Ne jamais** supprimer l'application dans cPanel pour « repartir à zéro » : cela efface le venv **et les dépendances installées**. En cas de venv cassé : recréer `lib/` (voir tableau) et réinstaller avec le npm système.

---

## 14. Sécurité — rappels permanents

- Ne jamais versionner `.env` (déjà exclu via `.gitignore`) ; en production, la configuration vit dans `~/etcs-website/.env` (chmod 600) — les variables d'environnement cPanel sont optionnelles (le `.env` a la priorité).
- `AUTH_SECRET` **unique** en production, différent du local ; rotation en cas de doute.
- Mot de passe administrateur robuste (gestionnaire de secrets) ; changement régulier depuis `/admin`.
- Sauvegardes : activer/ Télécharger les sauvegardes cPanel (base **et** fichiers) régulièrement ; tester une restauration.
- `npm audit` périodique et mises à jour des dépendances.
- Le mot de passe MySQL et le `AUTH_SECRET` ne doivent jamais apparaître dans un commit, un ticket ou un message.

---

## 15. Développement local (après la migration MySQL)

La base locale est désormais **MySQL/MariaDB** (l'ancienne URL PostgreSQL est archivée dans `.env.postgresql.bak`) :

1. Installer MySQL 8 ou MariaDB en local.
2. Créer la base : `CREATE DATABASE etcs_website CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. Renseigner `DATABASE_URL` dans `.env` (format `mysql://user:pass@127.0.0.1:3306/etcs_website`).
4. `npx prisma migrate deploy` puis les scripts de seed si besoin.
