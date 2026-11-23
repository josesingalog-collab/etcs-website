/** Services par domaine — les domaines sont les grands secteurs d'activité (cartes),
 * chaque domaine regroupe les services précis qui l'exercent. */
export const domainServices: Record<string, string[]> = {
  "genie-civil-ouvrages-art": [
    "Conception d'ouvrages d'art courants et complexes",
    "Viaducs, ponts haubanés et passerelles",
    "Échangeurs et franchissements",
    "Structures en béton armé et précontraint",
    "Vérification et contrôle des structures",
  ],
  "ingenierie-routiere": [
    "Études de faisabilité routière",
    "Construction et aménagement de routes et autoroutes",
    "Voiries et réseaux divers",
    "Entretien et réhabilitation de chaussées",
    "Transports urbains",
  ],
  "barrages-hydraulique": [
    "Barrages et micro-barrages",
    "Centrales hydrauliques et thermiques",
    "Stations d'épuration",
    "Adduction d'eau et assainissement",
    "Aménagements hydro-agricoles",
  ],
  "aeroports-voies-ferrees": [
    "Aménagement d'aéroports",
    "Ports et quais",
    "Infrastructures ferroviaires",
    "Pistes et voies de service",
    "Études de trafic et logistique",
  ],
  "batiments": [
    "Bâtiments administratifs et scolaires",
    "Hôpitaux et établissements de santé",
    "Bâtiments industriels et entrepôts",
    "Immeubles de grande hauteur (IGH)",
    "Réhabilitation et maintenance",
  ],
  "etudes-conseils": [
    "Études de faisabilité et avant-projets",
    "Consultations techniques",
    "Conduite et contrôle des travaux",
    "Surveillance et laboratoire de chantier",
    "Assistance à maîtrise d'ouvrage",
  ],
};
