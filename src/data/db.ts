// ============================================================
// BASE DE DONNÉES IN-MEMORY — BGFIBank Centrafrique
// Toutes les données sont modifiables via l'API Admin
// ============================================================

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  published: boolean;
}

export interface Product {
  id: number;
  segment: string; // particuliers | professionnels | entreprises | banque-privee
  slug: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  available: boolean; // false = "Bientôt disponible"
  cta?: string;
  ctaUrl?: string;
  badge?: string;   // new | popular | promo
  image?: string;   // URL image de fond de la card (modifiable back-office)
}

export interface Agency {
  id: number;
  name: string;
  type: 'agence' | 'gab';
  address: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  published: boolean;
}

export interface JobOffer {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  published: boolean;
  date: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroImage: string;
  resendApiKey: string;
  economicTip: string;
  exchangeUSD: string;
  exchangeEUR: string;
  beacRate: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
}

export interface PreRegistration {
  id: number;
  email: string;
  service: string;
  date: string;
}

// ========================
// DONNÉES PAR DÉFAUT
// ========================

export const defaultSettings: SiteSettings = {
  siteName: "BGFIBank Centrafrique",
  slogan: "Votre partenaire pour l'avenir",
  phone: "00236 72 80 98 08 / 75 65 54 65",
  email: "f.koba@bgfi.com",
  address: "Avenue des Martyrs, Bangui, République Centrafricaine",
  facebook: "https://www.facebook.com/profile/php?id=61586061494460",
  twitter: "https://twitter.com/bgfibankrca",
  linkedin: "https://linkedin.com/company/bgfibank-centrafrique",
  youtube: "https://youtube.com/bgfibank",
  heroTitle: "La banque qui accompagne votre croissance en Centrafrique",
  heroSubtitle: "Des solutions bancaires adaptées à vos besoins, disponibles partout en RCA. Ouvrez votre compte en quelques minutes.",
  heroCta: "Devenir client",
  resendApiKey: "",
  heroImage: "https://media.istockphoto.com/id/1090484192/ko/%EC%82%AC%EC%A7%84/%EC%9D%80%ED%96%89-3-%EC%B0%A8%EC%9B%90-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?s=170667a&w=0&k=20&c=5IcbxKIgkSb_lC3O071kkgVnYlOZ2jHarOhWSMpuC9U=",
  economicTip: "Conseil du jour : Diversifiez votre épargne avec un Dépôt à Terme pour sécuriser votre avenir financier.",
  exchangeUSD: "655.96",
  exchangeEUR: "655.96",
  beacRate: "4.50",
  stat1Value: "5+",
  stat1Label: "Ans d'expérience",
  stat2Value: "12",
  stat2Label: "Pays africains",
  stat3Value: "10K+",
  stat3Label: "Clients actifs",
  stat4Value: "24h",
  stat4Label: "Service en ligne",
};

export const defaultArticles: Article[] = [
  {
    id: 1,
    slug: "bgfibank-rca-renforce-son-reseau-agences",
    title: "BGFIBank Centrafrique renforce son réseau d'agences à Bangui",
    excerpt: "Dans le cadre de sa stratégie d'expansion, BGFIBank Centrafrique ouvre deux nouvelles agences pour être au plus près de ses clients.",
    content: `<p>BGFIBank Centrafrique poursuit son développement sur le territoire national avec l'ouverture de nouvelles agences à Bangui. Cette expansion témoigne de l'engagement du Groupe BGFIBank à soutenir le développement économique de la République Centrafricaine.</p>
    <p>Ces nouvelles implantations permettront à la banque de mieux servir ses clients particuliers et entreprises, en offrant des services bancaires de proximité dans des quartiers stratégiques de la capitale.</p>
    <p>Le Directeur Général de BGFIBank Centrafrique a déclaré : "Cette expansion est le reflet de notre confiance dans le potentiel économique de la RCA et de notre engagement envers nos clients centrafricains."</p>`,
    category: "Vie de la banque",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    author: "Direction Communication",
    date: "2024-03-15",
    published: true,
  },
  {
    id: 2,
    slug: "bgfibank-soutient-pme-centrafricaines",
    title: "BGFIBank Centrafrique lance un programme de financement des PME",
    excerpt: "Un nouveau programme de financement dédié aux PME centrafricaines est lancé avec des taux préférentiels et un accompagnement personnalisé.",
    content: `<p>BGFIBank Centrafrique annonce le lancement d'un programme ambitieux de financement des Petites et Moyennes Entreprises (PME) en République Centrafricaine. Ce programme vise à stimuler l'entrepreneuriat local et à soutenir la croissance économique du pays.</p>
    <p>Les PME éligibles pourront bénéficier de crédits à des taux préférentiels, d'un accompagnement personnalisé par des conseillers spécialisés, et d'outils de gestion financière adaptés à leurs besoins.</p>
    <p>Ce programme s'inscrit dans la vision du Groupe BGFIBank de contribuer au développement économique des pays où il est présent.</p>`,
    category: "Espace PME",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    author: "Direction PME",
    date: "2024-03-10",
    published: true,
  },
  {
    id: 3,
    slug: "taux-change-fcfa-mars-2024",
    title: "Évolution du FCFA : perspectives économiques pour la RCA en 2024",
    excerpt: "Analyse des tendances économiques et monétaires pour la République Centrafricaine au premier trimestre 2024.",
    content: `<p>L'économie centrafricaine montre des signes encourageants en ce début d'année 2024. Le franc CFA maintient sa stabilité face aux principales devises internationales, offrant un cadre favorable aux échanges commerciaux.</p>
    <p>BGFIBank Centrafrique accompagne ses clients dans la gestion de leurs opérations en devises étrangères, avec des solutions adaptées aux besoins des entreprises importatrices et exportatrices.</p>
    <p>Notre équipe de conseillers financiers reste disponible pour vous accompagner dans vos stratégies d'investissement et de gestion des risques de change.</p>`,
    category: "Économie RCA",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    author: "Département Économique",
    date: "2024-03-05",
    published: true,
  },
  {
    id: 4,
    slug: "securite-bancaire-conseils-pratiques",
    title: "5 conseils pour sécuriser vos opérations bancaires en ligne",
    excerpt: "La sécurité de vos données bancaires est notre priorité. Découvrez nos conseils pratiques pour protéger vos comptes.",
    content: `<p>Dans un monde de plus en plus numérique, la sécurité bancaire est une préoccupation majeure. BGFIBank Centrafrique vous donne 5 conseils essentiels pour protéger vos opérations bancaires.</p>
    <ol>
    <li>Ne communiquez jamais vos codes PIN ou mots de passe</li>
    <li>Vérifiez toujours l'URL du site avant de vous connecter</li>
    <li>Activez les notifications SMS pour vos transactions</li>
    <li>Utilisez des mots de passe forts et uniques</li>
    <li>Signalez immédiatement toute activité suspecte</li>
    </ol>`,
    category: "Conseils financiers",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    author: "Direction Sécurité",
    date: "2024-02-28",
    published: true,
  },
];

export const defaultProducts: Product[] = [

  // ═══════════════════════════════════════
  // PARTICULIERS — COMPTES
  // ═══════════════════════════════════════
  {
    id: 1, segment: "particuliers", slug: "compte-deposit",
    title: "Compte Deposit (Compte Chèque)", icon: "fa-university",
    description: "Un compte transactionnel pour vos opérations quotidiennes : dépôts, retraits, virements, paiement de factures. Idéal pour les salariés domiciliant leur salaire à BGFIBank.",
    features: [
      "Dépôts et retraits au guichet automatique",
      "Ouverture gratuite",
      "Absence de frais de transaction",
      "Paiements de factures et virements de fonds",
      "Suivi des dépenses en temps réel",
      "Salaire minimum requis : 100 000 FCFA",
    ],
    available: true, cta: "Ouvrir un compte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80"
  },
  {
    id: 2, segment: "particuliers", slug: "compte-epargne",
    title: "Compte Épargne", icon: "fa-piggy-bank",
    description: "Une épargne réglementée et rémunérée à taux annuel prédéfini. Souple dans l'approvisionnement, disponible à tout moment. Inclut le Plan Épargne Logement (PEL) pour financer votre projet immobilier.",
    features: [
      "Taux de rémunération : 3,5% par an",
      "Versement minimum : 50 000 FCFA",
      "Épargne disponible à tout moment",
      "Souplesse dans l'approvisionnement",
      "Plan Épargne Logement (PEL) disponible",
      "Conditions : pièce d'identité valide + 2 photos",
    ],
    available: true, cta: "Souscrire", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
  },
  {
    id: 3, segment: "particuliers", slug: "compte-gogoro",
    title: "Épargne Gogoro", icon: "fa-star",
    description: "Un placement rémunéré à versements mensuels réguliers, adapté aux salariés CDI. À l'issue de la période d'épargne, un prêt vous est accordé à des conditions avantageuses.",
    features: [
      "Taux d'épargne : 3,5% par an",
      "Virement mensuel minimum : 25 000 FCFA",
      "Accès à un crédit au taux de 13% HT",
      "Durée de remboursement max : 24 mois",
      "Frais de dossier : 15 000 FCFA",
      "Réservé aux salariés CDI avec salaire min. 100 000 FCFA",
    ],
    available: true, cta: "En savoir plus", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PARTICULIERS — DÉPÔTS & PLACEMENTS
  // ═══════════════════════════════════════
  {
    id: 4, segment: "particuliers", slug: "dat",
    title: "Dépôt à Terme (DAT)", icon: "fa-chart-line",
    description: "Un placement à terme avec des conditions de durée, de taux et de montant négociées à l'avance. Rattaché à votre compte courant, souscriptible par tout client de la banque.",
    features: [
      "Montant minimal : 1 000 000 FCFA",
      "Taux minimum post compté : 2,5%",
      "Durée et taux négociés à l'avance",
      "Taux préférentiels sur les demandes de financement",
      "Conditions : pièce d'identité + formulaire CRC",
      "Placement stable et sécurisé",
    ],
    available: true, cta: "Simuler mon DAT", ctaUrl: "/simulateurs",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
  {
    id: 5, segment: "particuliers", slug: "bon-de-caisse",
    title: "Bon de Caisse (BDC)", icon: "fa-file-invoice-dollar",
    description: "Titre de créance anonyme ou nominatif constatant un dépôt à échéance fixe. Le montant et la durée sont choisis à la souscription. Suivi indépendant du compte courant.",
    features: [
      "Montant minimum : 50 000 000 FCFA",
      "Anonymat possible (nominatif ou anonyme)",
      "Taux selon conditions du marché",
      "Épargne dédiée à un projet futur",
      "Suivi en parallèle du compte courant",
      "Conditions : pièce d'identité + formulaire CRC",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PARTICULIERS — CRÉDITS
  // ═══════════════════════════════════════
  {
    id: 6, segment: "particuliers", slug: "credit-consommation",
    title: "Crédit à la Consommation", icon: "fa-hand-holding-usd",
    description: "Crédit court/moyen terme pour couvrir vos besoins urgents : Cresco (frais scolaires), Crédit Voyage, Crédit Mariage, Crédit Flash. Simple, souple et disponible toute l'année.",
    features: [
      "Montant minimum : 100 000 FCFA",
      "Revenu mensuel minimum : 50 000 FCFA",
      "Cresco : remboursement sur 8 mois",
      "Crédit Voyage : remboursement sur 12 mois",
      "Réservé aux salariés secteur privé et public",
      "Documents : 3 bulletins de salaire + pièce d'identité",
    ],
    available: true, cta: "Faire une demande", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80"
  },
  {
    id: 7, segment: "particuliers", slug: "credit-immobilier",
    title: "Crédit Immobilier", icon: "fa-home",
    description: "Crédit moyen/long terme pour financer l'achat, la construction, l'extension ou la rénovation de votre logement. Sur la base de la documentation foncière du bien.",
    features: [
      "Achat de logement, terrain ou construction",
      "Extension ou rénovation d'habitation",
      "Taux d'intérêt attractifs",
      "Flexibilité financière et aide à la constitution du patrimoine",
      "Titulaire d'un compte chèque BGFIBank requis",
      "Documents : titre foncier, justificatifs revenus, devis travaux",
    ],
    available: true, cta: "Simuler mon crédit", ctaUrl: "/simulateurs",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PARTICULIERS — MONÉTIQUE
  // ═══════════════════════════════════════
  {
    id: 8, segment: "particuliers", slug: "carte-gimac-ivoire",
    title: "Carte GIMAC Ivoire", icon: "fa-credit-card",
    description: "Carte interbancaire d'entrée de gamme. Plafond 250 000 FCFA/jour et 1 000 000 FCFA/semaine. Retraits et paiements TPE dans tous les établissements affichant le logo GIMAC.",
    features: [
      "Plafond : 250 000 FCFA/jour — 1 000 000 FCFA/semaine",
      "Frais annuel : 3 000 FCFA HT",
      "Retrait client BGFIBank : 250 FCFA HT",
      "Retrait autres banques : 400 FCFA HT",
      "Sécurité Motion Code",
      "Conditions : pièce d'identité + compte épargne ou chèque",
    ],
    available: true, cta: "Commander ma carte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
  },
  {
    id: 9, segment: "particuliers", slug: "carte-gimac-anigre",
    title: "Carte GIMAC Anigré", icon: "fa-credit-card",
    description: "Carte moyenne gamme avec plafond élevé. Retraits dans tous les GAB GIMAC de la zone CEMAC. Consultation et édition de solde et historique.",
    features: [
      "Plafond : 1 500 000 FCFA/semaine",
      "Frais annuel : 3 000 FCFA HT",
      "Retrait client BGFIBank : 250 FCFA HT",
      "Retrait autres banques : 400 FCFA HT",
      "Paiement TPE — Utilisable dans la zone CEMAC",
      "Conditions : pièce d'identité + compte épargne ou chèque",
    ],
    available: true, cta: "Commander ma carte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
  },
  {
    id: 10, segment: "particuliers", slug: "carte-gimac-diamant",
    title: "Carte GIMAC Diamant", icon: "fa-gem",
    description: "Carte haut de gamme avec le plafond le plus élevé de la gamme GIMAC. Pour une clientèle exigeante avec des besoins importants.",
    features: [
      "Plafond : 2 000 000 FCFA/semaine",
      "Frais annuel : 3 000 FCFA HT",
      "Retrait client BGFIBank : 250 FCFA HT",
      "Retrait autres banques : 400 FCFA HT",
      "Paiement TPE — Utilisable zone CEMAC",
      "Conditions : pièce d'identité + compte épargne ou chèque",
    ],
    available: true, cta: "Commander ma carte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=800&q=80"
  },
  {
    id: 11, segment: "particuliers", slug: "carte-visa-classique",
    title: "Carte Visa Classique", icon: "fa-credit-card",
    description: "Carte internationale de retrait et paiement pour clients particuliers et entrepreneurs. Achats en ligne, paiements chez les commerçants agréés Visa/Mastercard.",
    features: [
      "Abonnement mensuel : 5 000 FCFA HT",
      "Utilisation nationale et internationale",
      "Achats en ligne sécurisés",
      "Sécurité : 3D Secure + Motion Code + Alerte SMS",
      "Commande de chéquiers incluse",
      "Conditions : pièce d'identité + compte chèque BGFIBank",
    ],
    available: true, cta: "Commander ma carte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1574539602803-41d45f6e48d3?w=800&q=80"
  },
  {
    id: 12, segment: "particuliers", slug: "carte-visa-gold",
    title: "Carte Visa Gold", icon: "fa-crown",
    description: "Carte internationale haut de gamme avec plafonds élevés, garanties et services connexes. Possibilité de découvert. Réservée aux clients particuliers haut de gamme.",
    features: [
      "Abonnement mensuel : 7 000 FCFA HT",
      "Plafonds de transactions élevés",
      "Garanties et services premium associés",
      "Sécurité : 3D Secure + Motion Code + Alerte SMS",
      "Service à l'international — Achat en ligne",
      "Conditions : pièce d'identité + compte chèque BGFIBank",
    ],
    available: true, cta: "Commander ma carte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PARTICULIERS — DIGITAL
  // ═══════════════════════════════════════
  {
    id: 13, segment: "particuliers", slug: "bgfi-online",
    title: "BGFIOnline (Web Banking)", icon: "fa-laptop",
    description: "Solution web disponible sur smartphone, tablette et desktop pour gérer votre compte bancaire à distance 24h/24 et 7j/7.",
    features: [
      "Consultation de comptes et historique",
      "Virements simples et permanents",
      "Téléchargement de relevés (format Excel)",
      "Commande de cartes et chéquiers",
      "Opposition sur cartes/chèques",
      "Coût : 30 000 FCFA HT (particuliers)",
    ],
    available: true, cta: "Se connecter", ctaUrl: "https://www5.bgfionline.com/", badge: "popular",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 14, segment: "particuliers", slug: "sms-banking",
    title: "SMS Banking", icon: "fa-sms",
    description: "Recevez des alertes et gérez votre compte directement par SMS. Rapide, simple et accessible depuis n'importe quel téléphone.",
    features: [
      "Alertes mouvements débit/crédit",
      "Consultation mini relevé (5 dernières opérations)",
      "Commande de chéquiers et cartes par SMS",
      "Frais annuel : 3 000 FCFA",
      "Alerte SMS : 100 FCFA HT",
      "Message reçu : 150 FCFA HT",
    ],
    available: true, cta: "Souscrire", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
  },
  {
    id: 15, segment: "particuliers", slug: "bgfi-mobile",
    title: "BGFIMobile", icon: "fa-mobile-alt",
    description: "Application mobile de Mobile Banking et Mobile Money. Gérez votre compte et votre portefeuille électronique depuis votre téléphone.",
    features: [
      "Retrait sans carte au GAB",
      "Virements bancaires locaux et zone CEMAC",
      "Paiement de factures (eau, électricité, Canal+...)",
      "Transfert d'argent cash local et international",
      "Achat d'unités téléphoniques",
      "Frais de souscription : 6 000 FCFA HT",
    ],
    available: true, cta: "Télécharger sur Google Play", ctaUrl: "bgfimobile-deeplink", badge: "new",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PARTICULIERS — TRANSFERTS
  // ═══════════════════════════════════════
  {
    id: 16, segment: "particuliers", slug: "moneygram",
    title: "MoneyGram", icon: "fa-globe",
    description: "Service international de transfert d'argent rapide, sûr, fiable et pratique. Envoi et réception en quelques minutes partout dans le monde. Accessible aux clients et non-clients BGFIBank.",
    features: [
      "Transfert international en quelques minutes",
      "Accessible clients et non-clients BGFIBank",
      "Simple, rapide et disponible",
      "Pièce d'identité en cours de validité",
      "Formulaire d'envoi/retrait au guichet",
      "Réseau mondial MoneyGram",
    ],
    available: true, cta: "Effectuer un transfert", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80"
  },
  {
    id: 17, segment: "particuliers", slug: "virement-local",
    title: "Virement Local", icon: "fa-exchange-alt",
    description: "Transfert de fonds d'un compte à un autre sur le plan national, dans la même banque ou entre banques différentes. Simple, rapide et sécurisé.",
    features: [
      "Transfert national inter-bancaire",
      "Simple, rapide et sécurisé",
      "Ordre de virement + pièce d'identité",
      "Justificatifs de la transaction requis",
      "Disponible pour particuliers et entreprises",
      "Zone CEMAC couverte",
    ],
    available: true, cta: "Effectuer un virement", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&q=80"
  },
  {
    id: 18, segment: "particuliers", slug: "virement-international",
    title: "Virement International", icon: "fa-plane",
    description: "Transfert de fonds vers l'extérieur de la zone CEMAC pour achat de biens, services, frais scolaires, aide familiale, loyer, évacuation sanitaire et plus.",
    features: [
      "Achat de biens et services à l'étranger",
      "Frais de scolarité à l'étranger",
      "Aide familiale et soutien financier",
      "Règlement de loyer à l'étranger",
      "Évacuation sanitaire",
      "Documents selon nature du transfert",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // PROFESSIONNELS
  // ═══════════════════════════════════════
  {
    id: 19, segment: "professionnels", slug: "compte-courant-pro",
    title: "Compte Courant Professionnel", icon: "fa-briefcase",
    description: "Compte dédié aux entreprises, administrations, ONG et associations. Fonctionne en ligne créditrice et débitrice pour les professionnels et entreprises.",
    features: [
      "Versement minimum : 1 000 000 FCFA",
      "Pour SA, SARL, SURL, Coopératives, ONG",
      "Gestion financière facilitée",
      "Services adaptés aux besoins des entreprises",
      "Documents : NIF, RCCM, statuts, pièce d'identité gérant",
      "Conseiller dédié",
    ],
    available: true, cta: "Ouvrir un compte", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
  },
  {
    id: 20, segment: "professionnels", slug: "credit-exploitation",
    title: "Crédit d'Exploitation", icon: "fa-tools",
    description: "Crédit court terme pour les entreprises ayant des écarts de trésorerie permanents ou ponctuels liés à leur cycle d'exploitation. Délais de mise en place courts.",
    features: [
      "Financement des besoins de trésorerie",
      "Continuité de l'exploitation assurée",
      "Délais de mise en place courts",
      "Documents : états financiers 3 ans, relevés bancaires 12 mois",
      "NIF, RCCM, quitus fiscal, CNSS requis",
      "Demande adressée à la Direction Générale",
    ],
    available: true, cta: "Faire une demande", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
  },
  {
    id: 21, segment: "professionnels", slug: "credit-campagne",
    title: "Crédit de Campagne", icon: "fa-seedling",
    description: "Crédit dont le montant et la durée sont déterminés à l'avance selon le cycle d'exploitation de l'entreprise. Idéal pour les activités saisonnières.",
    features: [
      "Montant et durée négociés à l'avance",
      "Adapté aux activités saisonnières",
      "Financement des besoins de trésorerie",
      "États financiers 3 dernières années requis",
      "Compte d'exploitation prévisionnel",
      "Demande adressée à la Direction Générale",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
  },
  {
    id: 22, segment: "professionnels", slug: "decouvert-avance-facture",
    title: "Découvert / Avance sur Facture", icon: "fa-money-bill-wave",
    description: "Ouverture de crédit à hauteur d'un plafond accordé pour faire face aux à-coups de trésorerie. L'avance sur facture procure des capitaux complémentaires sous forme d'avances.",
    features: [
      "Plafond d'emprunt accordé selon profil",
      "Utilisation flexible en cas de besoin",
      "Avance sur facture pour entreprises industrielles",
      "Peu exigeant en garantie",
      "Compte courant BGFIBank requis",
      "Formulaire d'adhésion au CRC",
    ],
    available: true, cta: "Faire une demande", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
  },
  {
    id: 23, segment: "professionnels", slug: "engagements-signature",
    title: "Engagements par Signature", icon: "fa-file-signature",
    description: "BGFIBank prend l'engagement de se substituer à son client en cas de défaillance. Escompte commerciale, Avals effets, Cautions, Garantie bancaire, Crédit documentaire.",
    features: [
      "Cautions de marché, douane, étudiante",
      "Garantie bancaire pour opérations financières",
      "Escompte commerciale pour règlement avant terme",
      "Crédit documentaire pour importateurs",
      "Facilite l'obtention de marchés publics",
      "Documents : appel d'offre, modèle caution, dépôt en compte",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
  },
  {
    id: 24, segment: "professionnels", slug: "bgfi-online-pro",
    title: "BGFIOnline Entreprises", icon: "fa-laptop",
    description: "Solution web banking dédiée aux entreprises pour gérer vos comptes, effectuer des virements et suivre vos opérations à distance.",
    features: [
      "Gestion multi-comptes",
      "Virements simples et permanents",
      "Historique et relevés téléchargeables",
      "Opposition sur cartes/chèques en ligne",
      "Réclamations en ligne",
      "Coût : 100 000 FCFA HT",
    ],
    available: true, cta: "Se connecter", ctaUrl: "https://www5.bgfionline.com/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // ENTREPRISES
  // ═══════════════════════════════════════
  {
    id: 25, segment: "entreprises", slug: "compte-courant-entreprise",
    title: "Compte Courant Société", icon: "fa-building",
    description: "Compte dédié aux grandes entreprises, administrations publiques et privées, ONG et institutions. Versement minimum d'un million de FCFA.",
    features: [
      "Versement minimum : 1 000 000 FCFA",
      "Fonctionne en ligne créditrice et débitrice",
      "Pour SA, SARL, SURL et structures similaires",
      "Services bancaires adaptés aux grandes structures",
      "Documents : NIF, RCCM, statuts notariés, PV désignation gérant",
      "Conseiller entreprise dédié",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: 26, segment: "entreprises", slug: "credit-investissement",
    title: "Crédit d'Investissement", icon: "fa-chart-bar",
    description: "Crédit moyen/long terme pour financer l'acquisition ou l'amélioration de l'outil de production. Finance entre 70 et 80% du coût total du projet.",
    features: [
      "Financement de 70 à 80% du coût du projet",
      "Matériels, immatériels ou financiers",
      "Amélioration de l'outil de production",
      "États financiers 3 ans + prévisionnel requis",
      "RCCM, NIF, quitus fiscal, CNSS, ACFPE",
      "Demande adressée à la Direction Générale",
    ],
    available: true, cta: "Faire une demande", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80"
  },
  {
    id: 27, segment: "entreprises", slug: "dat-entreprise",
    title: "Dépôt à Terme Entreprise", icon: "fa-coins",
    description: "Placement à terme pour entreprises avec conditions négociées. Collecte de ressources stables avec taux avantageux et possibilité de taux préférentiels sur financements.",
    features: [
      "Montant minimal : 1 000 000 FCFA",
      "Taux minimum post compté : 2,5%",
      "Conditions de durée et taux négociées",
      "Taux préférentiels sur demandes de financement",
      "Rattaché au compte courant",
      "Conditions : pièce d'identité + formulaire CRC",
    ],
    available: true, cta: "Souscrire", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80"
  },
  {
    id: 28, segment: "entreprises", slug: "trade-finance",
    title: "Trade Finance / Virement International", icon: "fa-ship",
    description: "Sécurisez vos transactions commerciales internationales. Crédit documentaire, garanties bancaires, virements hors CEMAC pour import/export.",
    features: [
      "Crédit documentaire pour importateurs",
      "Garanties bancaires internationales",
      "Virements internationaux sécurisés",
      "Achat de biens et services à l'étranger",
      "Attestation de domiciliation bancaire",
      "Documents selon nature de l'opération",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80"
  },

  // ═══════════════════════════════════════
  // BANQUE PRIVÉE
  // ═══════════════════════════════════════
  {
    id: 29, segment: "banque-privee", slug: "compte-premium",
    title: "Compte Premium", icon: "fa-crown",
    description: "Une offre bancaire d'exception avec services exclusifs et conseiller privé dédié. Pour une clientèle haut de gamme exigeant le meilleur.",
    features: [
      "Conseiller privé exclusif",
      "Carte Visa Gold incluse",
      "Services bancaires prioritaires",
      "Accès aux produits de placement premium",
      "Accompagnement personnalisé",
      "Contactez-nous pour les conditions",
    ],
    available: true, cta: "Prendre RDV", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
  },
  {
    id: 30, segment: "banque-privee", slug: "gestion-patrimoine",
    title: "Gestion de Patrimoine", icon: "fa-gem",
    description: "Valorisez et protégez votre patrimoine avec l'accompagnement d'experts financiers BGFIBank. Solutions sur mesure pour vos placements et investissements.",
    features: [
      "Conseil patrimonial personnalisé",
      "Dépôt à Terme et Bon de Caisse",
      "Diversification des placements",
      "Accompagnement sur les investissements",
      "Reporting exclusif et régulier",
      "Contactez-nous pour les conditions",
    ],
    available: true, cta: "Prendre RDV", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
  },
  {
    id: 31, segment: "banque-privee", slug: "bon-caisse-prive",
    title: "Bon de Caisse Privé", icon: "fa-file-invoice-dollar",
    description: "Titre de créance anonyme ou nominatif pour des placements importants. Taux selon conditions du marché. Solution idéale pour sécuriser et faire fructifier un capital élevé.",
    features: [
      "Montant minimum : 50 000 000 FCFA",
      "Anonymat possible",
      "Taux selon conditions du marché",
      "Épargne dédiée à un projet futur",
      "Suivi indépendant du compte courant",
      "Conditions : pièce d'identité + formulaire CRC",
    ],
    available: true, cta: "Nous contacter", ctaUrl: "/contact",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
];

export const defaultAgencies: Agency[] = [
  {
    id: 1, name: "BGFIBank — Agence Centrale", type: "agence",
    address: "Avenue des Martyrs, Centre-ville", city: "Bangui",
    phone: "+236 75 00 00 01", hours: "Lun-Ven : 8h00-17h00 | Sam : 8h00-12h00",
    lat: 4.3612, lng: 18.5550
  },
  {
    id: 2, name: "BGFIBank — Agence Km5", type: "agence",
    address: "Avenue Boganda, Kilomètre 5", city: "Bangui",
    phone: "+236 75 00 00 02", hours: "Lun-Ven : 8h00-17h00",
    lat: 4.3750, lng: 18.5700
  },
  {
    id: 3, name: "BGFIBank — Agence Bimbo", type: "agence",
    address: "Route de Bimbo", city: "Bimbo",
    phone: "+236 75 00 00 03", hours: "Lun-Ven : 8h00-16h30",
    lat: 4.3200, lng: 18.4900
  },
  {
    id: 4, name: "GAB — Aéroport International", type: "gab",
    address: "Aéroport International de Bangui M'Poko", city: "Bangui",
    phone: "", hours: "24h/24 - 7j/7",
    lat: 4.3986, lng: 18.5186
  },
  {
    id: 5, name: "GAB — Centre Commercial", type: "gab",
    address: "Centre Commercial de Bangui, Avenue Boganda", city: "Bangui",
    phone: "", hours: "24h/24 - 7j/7",
    lat: 4.3614, lng: 18.5530
  },
  {
    id: 6, name: "BGFIBank — Agence Berberati", type: "agence",
    address: "Quartier Commercial", city: "Berberati",
    phone: "+236 75 00 00 04", hours: "Lun-Ven : 8h00-16h00",
    lat: 4.2617, lng: 15.7862
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jean-Baptiste Kolingba",
    role: "Entrepreneur, Bangui",
    content: "Grâce au financement PME de BGFIBank Centrafrique, j'ai pu développer mon activité de négoce. Le suivi de mon conseiller est exceptionnel.",
    avatar: "JK",
    published: true,
  },
  {
    id: 2,
    name: "Marie-Claire Nguyen",
    role: "Directrice, Import-Export RCA",
    content: "Le service Trade Finance de BGFIBank m'a permis de sécuriser mes transactions internationales. Je recommande vivement leurs services.",
    avatar: "MN",
    published: true,
  },
  {
    id: 3,
    name: "Pierre Maïdou",
    role: "Fonctionnaire, Bangui",
    content: "L'ouverture de mon compte en ligne via leclient.bgfi.com a été simple et rapide. En moins de 10 minutes, tout était fait !",
    avatar: "PM",
    published: true,
  },
];

export const defaultJobOffers: JobOffer[] = [
  {
    id: 1,
    title: "Chargé de Clientèle Particuliers",
    department: "Commerce & Relation Client",
    location: "Bangui",
    type: "CDI",
    description: "Nous recherchons un Chargé de Clientèle Particuliers dynamique pour rejoindre notre équipe commerciale à Bangui.",
    published: true,
    date: "2024-03-01",
  },
  {
    id: 2,
    title: "Analyste Crédit Entreprises",
    department: "Risques & Crédit",
    location: "Bangui",
    type: "CDI",
    description: "Rejoignez notre département Crédit pour analyser et structurer les dossiers de financement des entreprises centrafricaines.",
    published: true,
    date: "2024-03-05",
  },
];

export const defaultPreRegistrations: PreRegistration[] = [];

// ========================
// STORE GLOBAL (in-memory)
// ========================
export const store = {
  settings: { ...defaultSettings },
  articles: [...defaultArticles],
  products: [...defaultProducts],
  agencies: [...defaultAgencies],
  testimonials: [...defaultTestimonials],
  jobs: [...defaultJobOffers],
  preRegistrations: [...defaultPreRegistrations],
  contactMessages: [] as any[],
  adminPassword: "bgfi@admin2024", // À changer depuis l'admin
  uploadedFiles: {} as Record<string, { data: string; mimeType: string; name: string }>,
};
