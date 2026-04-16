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
  facebook: "https://facebook.com/bgfibankrca",
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
  // PARTICULIERS
  {
    id: 1, segment: "particuliers", slug: "compte-courant",
    title: "Compte Courant", icon: "fa-university",
    description: "Gérez vos finances au quotidien avec notre compte courant flexible et sécurisé.",
    features: ["Carte bancaire incluse", "Accès BGFIOnline 24h/24", "Relevés mensuels", "Virements nationaux et internationaux"],
    available: true, cta: "Ouvrir un compte", ctaUrl: "https://leclient.bgfi.com"
  },
  {
    id: 2, segment: "particuliers", slug: "compte-epargne",
    title: "Compte Épargne", icon: "fa-piggy-bank",
    description: "Constituez votre épargne progressivement avec un taux d'intérêt attractif.",
    features: ["Taux d'intérêt attractif", "Pas de frais de gestion", "Versements libres", "Disponibilité immédiate"],
    available: true, cta: "En savoir plus", ctaUrl: "/particuliers/compte-epargne"
  },
  {
    id: 3, segment: "particuliers", slug: "dat",
    title: "Dépôt à Terme (DAT)", icon: "fa-chart-line",
    description: "Faites fructifier votre capital avec un rendement garanti sur une durée choisie.",
    features: ["Capital garanti", "Taux fixe à la souscription", "Durées de 3 à 24 mois", "Renouvellement automatique possible"],
    available: true, cta: "Simuler mon DAT", ctaUrl: "/simulateurs"
  },
  {
    id: 4, segment: "particuliers", slug: "credit-personnel",
    title: "Crédit Personnel", icon: "fa-hand-holding-usd",
    description: "Financez vos projets personnels avec notre crédit rapide et flexible.",
    features: ["Réponse rapide", "Taux compétitifs", "Durée flexible", "Sans justificatif d'utilisation"],
    available: true, cta: "Simuler mon crédit", ctaUrl: "/simulateurs"
  },
  {
    id: 5, segment: "particuliers", slug: "cartes-bancaires",
    title: "Cartes Bancaires", icon: "fa-credit-card",
    description: "Payez partout dans le monde avec nos cartes Visa et Mastercard.",
    features: ["Visa Classic & Gold", "Paiement sans contact", "Utilisation internationale", "Assurance voyage incluse"],
    available: true, cta: "Choisir ma carte", ctaUrl: "/particuliers/cartes"
  },
  {
    id: 6, segment: "particuliers", slug: "transfert-argent",
    title: "Transfert d'Argent", icon: "fa-exchange-alt",
    description: "Envoyez et recevez de l'argent en toute sécurité, en RCA et à l'international.",
    features: ["Western Union disponible", "Virements CEMAC", "Transferts internationaux", "Délais rapides"],
    available: true, cta: "Effectuer un transfert", ctaUrl: "/particuliers/transferts"
  },
  {
    id: 7, segment: "particuliers", slug: "bgfi-mobile",
    title: "BGFIMobile", icon: "fa-mobile-alt",
    description: "Gérez votre banque depuis votre smartphone, où que vous soyez.",
    features: ["Consultation de solde", "Virements instantanés", "Paiement de factures", "Notifications en temps réel"],
    available: false, cta: "Être notifié", ctaUrl: "#notify-bgfimobile"
  },
  {
    id: 8, segment: "particuliers", slug: "bgfi-online",
    title: "BGFIOnline", icon: "fa-laptop",
    description: "Accédez à votre espace bancaire en ligne 24h/24 et 7j/7.",
    features: ["Tableau de bord complet", "Historique des transactions", "Virements en ligne", "Téléchargement de relevés"],
    available: true, cta: "Se connecter", ctaUrl: "https://online.bgfi.com"
  },
  // PROFESSIONNELS
  {
    id: 9, segment: "professionnels", slug: "compte-pro",
    title: "Compte Professionnel", icon: "fa-briefcase",
    description: "Un compte dédié aux professionnels avec des services adaptés à votre activité.",
    features: ["Chéquier professionnel", "Accès multi-utilisateurs", "Reporting mensuel", "Conseiller dédié"],
    available: true, cta: "Ouvrir un compte pro", ctaUrl: "https://leclient.bgfi.com"
  },
  {
    id: 10, segment: "professionnels", slug: "credit-professionnel",
    title: "Crédit Professionnel", icon: "fa-tools",
    description: "Financez votre activité et développez votre entreprise avec nos crédits professionnels.",
    features: ["Crédit d'équipement", "Crédit de trésorerie", "Financement de stocks", "Garanties flexibles"],
    available: true, cta: "Simuler", ctaUrl: "/simulateurs"
  },
  {
    id: 11, segment: "professionnels", slug: "tpe-paiement",
    title: "Terminal de Paiement (TPE)", icon: "fa-cash-register",
    description: "Acceptez les paiements par carte dans votre commerce avec notre solution TPE.",
    features: ["Installation rapide", "Compatible toutes cartes", "Reporting en temps réel", "Support technique dédié"],
    available: false, cta: "Être notifié", ctaUrl: "#notify-tpe"
  },
  // ENTREPRISES
  {
    id: 12, segment: "entreprises", slug: "cash-management",
    title: "Cash Management", icon: "fa-coins",
    description: "Optimisez la gestion de votre trésorerie avec nos solutions Cash Management.",
    features: ["Centralisation des comptes", "Prévisions de trésorerie", "Virements de masse", "Reporting consolidé"],
    available: false, cta: "Être notifié", ctaUrl: "#notify-cash"
  },
  {
    id: 13, segment: "entreprises", slug: "financement-entreprise",
    title: "Financement Entreprise", icon: "fa-building",
    description: "Des solutions de financement sur mesure pour accompagner la croissance de votre entreprise.",
    features: ["Crédit d'investissement", "Financement de projet", "Lignes de crédit", "Structuration sur mesure"],
    available: true, cta: "Nous contacter", ctaUrl: "/contact"
  },
  {
    id: 14, segment: "entreprises", slug: "trade-finance",
    title: "Trade Finance", icon: "fa-ship",
    description: "Sécurisez vos transactions commerciales internationales avec nos instruments de Trade Finance.",
    features: ["Lettres de crédit", "Remises documentaires", "Garanties bancaires", "Financement import/export"],
    available: true, cta: "En savoir plus", ctaUrl: "/entreprises/trade-finance"
  },
  // BANQUE PRIVÉE
  {
    id: 15, segment: "banque-privee", slug: "gestion-patrimoine",
    title: "Gestion de Patrimoine", icon: "fa-gem",
    description: "Une gestion personnalisée de votre patrimoine par nos experts financiers.",
    features: ["Conseil patrimonial personnalisé", "Diversification des placements", "Optimisation fiscale", "Reporting exclusif"],
    available: true, cta: "Prendre RDV", ctaUrl: "/rendez-vous"
  },
  {
    id: 16, segment: "banque-privee", slug: "compte-premium",
    title: "Compte Premium", icon: "fa-crown",
    description: "Une offre bancaire d'exception avec des services exclusifs et un conseiller privé dédié.",
    features: ["Conseiller privé exclusif", "Carte Visa Infinite", "Accès salons VIP aéroports", "Services conciergerie"],
    available: true, cta: "Nous rejoindre", ctaUrl: "/contact"
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
};
