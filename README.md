# ETCS Website

Site vitrine Next.js de Etudes Techniques Conceptions des Structures (ETCS SARL), créé dans un projet indépendant.

## Démarrage

1. Copiez `.env.example` vers `.env` et renseignez PostgreSQL ainsi que les secrets d'administration.
2. Installez les dépendances : `npm install`.
3. Générez le client Prisma : `npx prisma generate`.
4. Créez la migration : `npx prisma migrate dev --name init`.
5. Lancez le site : `npm run dev`.

Le site est disponible à `http://localhost:3000`.

Les références et prestations présentes en démonstration sont identifiées comme telles et doivent être remplacées par des informations validées avant publication.
