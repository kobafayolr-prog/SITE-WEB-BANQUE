// ============================================================
// PAGES PUBLIQUES — BGFIBank Centrafrique
// ============================================================

import { Hono } from 'hono'
import { getLayout } from '../components/layout'
import { store } from '../data/db'

const pages = new Hono()

// ── HELPERS ──────────────────────────────────────────────────
const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const productCard = (p: any) => `
<div class="card product-card ${!p.available ? 'unavailable' : ''}">
  ${!p.available ? '<span class="badge-soon"><i class="fas fa-clock"></i> Bientôt disponible</span>' : ''}
  <div class="card-body">
    <div class="product-icon"><i class="fas ${p.icon}"></i></div>
    <div class="card-title">${p.title}</div>
    <div class="card-text">${p.description}</div>
    <ul>${p.features.map((f: string) => `<li>${f}</li>`).join('')}</ul>
    ${p.available
      ? `<a href="${p.ctaUrl || '#'}" class="btn btn-primary-sm btn-full" style="margin-top:12px;">${p.cta || 'En savoir plus'}</a>`
      : `<form class="notify-form" onsubmit="preRegister(event,'${p.title}')">
          <input type="email" placeholder="Votre email" required>
          <button type="submit"><i class="fas fa-bell"></i> Notifiez-moi</button>
        </form>`
    }
  </div>
</div>`

const articleCard = (a: any) => `
<div class="card" onclick="location.href='/actualites/${a.slug}'" style="cursor:pointer;">
  <img src="${a.image}" alt="${a.title}" class="card-img" loading="lazy">
  <div class="card-body">
    <div class="card-category"><i class="fas fa-tag" style="margin-right:4px;"></i>${a.category}</div>
    <div class="card-title">${a.title}</div>
    <div class="card-text">${a.excerpt}</div>
    <div class="card-date"><i class="fas fa-calendar-alt"></i>${formatDate(a.date)}</div>
    <a href="/actualites/${a.slug}" class="card-link">Lire la suite <i class="fas fa-arrow-right"></i></a>
  </div>
</div>`

// ── ACCUEIL ───────────────────────────────────────────────────
pages.get('/', (c) => {
  const s = store.settings
  const articles = store.articles.filter(a => a.published).slice(0, 4)
  const particuliers = store.products.filter(p => p.segment === 'particuliers').slice(0, 4)
  const testimonials = store.testimonials.filter(t => t.published).slice(0, 3)

  const content = `
  <!-- HERO -->
  <section id="hero">
    <!-- Image de fond configurable via admin -->
    <div class="hero-image-bg">
      <img src="${s.heroImage || '/static/images/hero-bgfi-invest.jpg'}" alt="BGFIBank Centrafrique — Investir durablement" id="hero-bg-img" onerror="this.style.opacity='0'">
    </div>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <h1>${s.heroTitle.replace('Centrafrique', '<span>Centrafrique</span>')}</h1>
      <p>${s.heroSubtitle}</p>
      <div class="hero-btns">
        <a href="https://leclient.bgfi.com" target="_blank" class="btn-primary">
          <i class="fas fa-user-plus"></i> ${s.heroCta}
        </a>
        <a href="/simulateurs" class="btn-secondary">
          <i class="fas fa-calculator"></i> Simuler mon crédit
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat"><span class="stat-number">30+</span><span class="stat-label">Ans d'expérience</span></div>
        <div class="stat"><span class="stat-number">12</span><span class="stat-label">Pays africains</span></div>
        <div class="stat"><span class="stat-number">100%</span><span class="stat-label">Digital & Sécurisé</span></div>
        <div class="stat"><span class="stat-number">24h</span><span class="stat-label">Service en ligne</span></div>
      </div>
    </div>
  </section>

  <!-- ECONOMIC TICKER -->
  <div id="economic-ticker">
    <div class="container">
      <div class="ticker-inner">
        <span class="ticker-label"><i class="fas fa-chart-line"></i> Marchés</span>
        <div class="ticker-items">
          <div class="ticker-item">
            <span class="label"><i class="fas fa-dollar-sign"></i> USD/FCFA</span>
            <span class="value" id="rateUSD">${s.exchangeUSD}</span>
          </div>
          <div class="ticker-item">
            <span class="label"><i class="fas fa-euro-sign"></i> EUR/FCFA</span>
            <span class="value" id="rateEUR">${s.exchangeEUR}</span>
          </div>
          <div class="ticker-item">
            <span class="label"><i class="fas fa-university"></i> Taux BEAC</span>
            <span class="value" id="rateBeac">${s.beacRate}%</span>
          </div>
        </div>
        <div class="ticker-tip" id="economicTip">
          <i class="fas fa-lightbulb" style="color:#7dcaa5;margin-right:6px;"></i>
          ${s.economicTip}
        </div>
      </div>
    </div>
  </div>

  <!-- SERVICES RAPIDES -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Nos solutions</span>
        <h2>Tout ce dont vous avez besoin, en un seul endroit</h2>
        <div class="divider"></div>
        <p>Des services bancaires adaptés à chaque profil, disponibles partout en République Centrafricaine</p>
      </div>
      <div class="grid-4">
        <div class="card" style="text-align:center;cursor:pointer;" onclick="location.href='/particuliers'">
          <div class="card-body">
            <div style="font-size:40px;margin-bottom:12px;">👤</div>
            <div class="card-title" style="font-size:18px;">Particuliers</div>
            <div class="card-text">Comptes, épargne, crédits et services digitaux pour votre vie quotidienne.</div>
            <a href="/particuliers" class="card-link" style="justify-content:center;">Découvrir <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;" onclick="location.href='/professionnels'">
          <div class="card-body">
            <div style="font-size:40px;margin-bottom:12px;">💼</div>
            <div class="card-title" style="font-size:18px;">Professionnels</div>
            <div class="card-text">Des solutions complètes pour gérer et développer votre activité.</div>
            <a href="/professionnels" class="card-link" style="justify-content:center;">Découvrir <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;" onclick="location.href='/entreprises'">
          <div class="card-body">
            <div style="font-size:40px;margin-bottom:12px;">🏗️</div>
            <div class="card-title" style="font-size:18px;">Entreprises</div>
            <div class="card-text">Cash management, trade finance et financements structurés.</div>
            <a href="/entreprises" class="card-link" style="justify-content:center;">Découvrir <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;" onclick="location.href='/banque-privee'">
          <div class="card-body">
            <div style="font-size:40px;margin-bottom:12px;">💎</div>
            <div class="card-title" style="font-size:18px;">Banque Privée</div>
            <div class="card-text">Une offre d'exception avec un conseiller privé dédié à votre patrimoine.</div>
            <a href="/banque-privee" class="card-link" style="justify-content:center;">Découvrir <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- DEVENIR CLIENT -->
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
        <div>
          <span class="eyebrow" style="font-size:12px;font-weight:700;color:var(--bgfi-sky);text-transform:uppercase;letter-spacing:2px;display:block;margin-bottom:10px;">Ouverture de compte</span>
          <h2 style="font-size:32px;font-weight:700;color:var(--bgfi-navy);line-height:1.3;margin-bottom:16px;">Devenez client en <span style="color:var(--bgfi-sky);">4 étapes simples</span></h2>
          <p style="color:var(--bgfi-text-light);font-size:16px;line-height:1.7;margin-bottom:28px;">Ouvrez votre compte bancaire en ligne depuis votre smartphone ou ordinateur. Rapide, sécurisé et sans déplacement.</p>
          <a href="https://leclient.bgfi.com" target="_blank" class="btn btn-primary-sm">
            <i class="fas fa-user-plus"></i> Ouvrir mon compte maintenant
          </a>
        </div>
        <div>
          <div style="display:flex;flex-direction:column;gap:16px;">
            ${[
              ['1', 'fa-id-card', 'Remplissez le formulaire', 'Saisissez vos informations personnelles en ligne'],
              ['2', 'fa-camera', 'Téléchargez vos documents', 'Pièce d\'identité, justificatif de domicile'],
              ['3', 'fa-check-circle', 'Validation sous 24h', 'Notre équipe vérifie votre dossier rapidement'],
              ['4', 'fa-credit-card', 'Recevez votre carte', 'Votre carte et identifiants vous sont remis en agence'],
            ].map(([n, icon, title, desc]) => `
              <div style="display:flex;align-items:flex-start;gap:16px;padding:16px;background:var(--bgfi-light);border-radius:8px;border-left:4px solid var(--bgfi-sky);">
                <div style="width:40px;height:40px;background:var(--bgfi-sky);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0;">${n}</div>
                <div>
                  <div style="font-weight:700;color:var(--bgfi-navy);margin-bottom:4px;"><i class="fas ${icon}" style="margin-right:8px;color:var(--bgfi-sky);"></i>${title}</div>
                  <div style="font-size:13px;color:var(--bgfi-text-light);">${desc}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUITS POPULAIRES -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Produits & Services</span>
        <h2>Nos solutions pour les Particuliers</h2>
        <div class="divider"></div>
      </div>
      <div class="grid-4">
        ${particuliers.map(productCard).join('')}
      </div>
      <div style="text-align:center;margin-top:32px;">
        <a href="/particuliers" class="btn btn-outline">
          <i class="fas fa-th-large"></i> Voir tous nos produits
        </a>
      </div>
    </div>
  </section>

  <!-- BGFIMOBILE BANNER -->
  <section style="background:linear-gradient(135deg,var(--bgfi-navy),var(--bgfi-blue));padding:48px 0;">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;">
        <div>
          <span style="background:rgba(232,104,40,0.9);color:white;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;display:inline-block;margin-bottom:16px;animation:pulse-badge 2s infinite;">
            <i class="fas fa-clock"></i> Bientôt disponible
          </span>
          <h2 style="font-size:32px;font-weight:700;color:white;margin-bottom:12px;"><i class="fas fa-mobile-alt" style="margin-right:10px;color:var(--bgfi-mint);"></i>BGFIMobile</h2>
          <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.7;margin-bottom:24px;">Votre banque dans votre poche. Gérez vos comptes, effectuez des virements et payez vos factures depuis votre smartphone, où que vous soyez en RCA.</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
            ${['Consultation de solde', 'Virements instantanés', 'Paiement de factures', 'Notifications temps réel'].map(f => `<span style="background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.9);padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;"><i class="fas fa-check" style="margin-right:4px;color:var(--bgfi-mint);"></i>${f}</span>`).join('')}
          </div>
          <form class="notify-form" onsubmit="preRegister(event,'BGFIMobile')" style="max-width:400px;">
            <input type="email" placeholder="Votre email pour être notifié" required style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:white;">
            <button type="submit" style="background:var(--bgfi-sky);"><i class="fas fa-bell"></i> Notifiez-moi</button>
          </form>
        </div>
        <div style="text-align:center;">
          <div style="width:200px;height:360px;background:rgba(255,255,255,0.1);border-radius:32px;margin:0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.2);position:relative;">
            <div style="position:absolute;top:16px;width:60px;height:6px;background:rgba(255,255,255,0.3);border-radius:3px;"></div>
            <i class="fas fa-mobile-alt" style="font-size:80px;color:rgba(255,255,255,0.3);"></i>
            <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-top:12px;">En cours de développement</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ACTUALITÉS -->
  <section class="section">
    <div class="container">
      <div class="section-header" style="display:flex;justify-content:space-between;align-items:flex-end;text-align:left;margin-bottom:32px;">
        <div>
          <span class="eyebrow">Actualités</span>
          <h2>Les dernières nouvelles</h2>
          <div class="divider" style="margin:12px 0 0;"></div>
        </div>
        <a href="/actualites" class="btn btn-outline" style="flex-shrink:0;">
          <i class="fas fa-newspaper"></i> Toutes les actualités
        </a>
      </div>
      <div class="news-featured">
        <div>
          ${articles[0] ? articleCard(articles[0]) : ''}
        </div>
        <div class="news-side">
          ${articles.slice(1, 4).map(a => `
            <div class="news-mini" onclick="location.href='/actualites/${a.slug}'" style="cursor:pointer;">
              <img src="${a.image}" alt="${a.title}">
              <div class="news-mini-body">
                <div class="card-category">${a.category}</div>
                <div class="card-title">${a.title}</div>
                <div class="card-date" style="margin-top:4px;"><i class="fas fa-calendar-alt"></i>${formatDate(a.date)}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- TÉMOIGNAGES -->
  <section class="section section-alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Ils nous font confiance</span>
        <h2>Ce que disent nos clients</h2>
        <div class="divider"></div>
      </div>
      <div class="grid-3">
        ${testimonials.map(t => `
          <div class="testimonial-card">
            <blockquote>${t.content}</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">${t.avatar}</div>
              <div>
                <div class="author-name">${t.name}</div>
                <div class="author-role">${t.role}</div>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ESPACE PME APERÇU -->
  <section class="section section-dark">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
        <div>
          <span class="eyebrow" style="color:var(--bgfi-mint);">Innovation BGFIBank RCA</span>
          <h2 style="color:white;font-size:32px;font-weight:700;margin-bottom:16px;line-height:1.3;">Espace PME Centrafrique</h2>
          <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.7;margin-bottom:24px;">BGFIBank Centrafrique croit au potentiel des entrepreneurs centrafricains. Découvrez nos solutions spécialement conçues pour les PME locales.</p>
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px;">
            ${[
              ['fa-percentage', 'Taux préférentiels PME', 'Des conditions de financement avantageuses'],
              ['fa-user-tie', 'Conseiller PME dédié', 'Un expert à votre écoute pour votre projet'],
              ['fa-file-contract', 'Accompagnement complet', 'De la création au développement de votre entreprise'],
            ].map(([icon, title, desc]) => `
              <div style="display:flex;gap:12px;align-items:flex-start;">
                <div style="width:36px;height:36px;background:rgba(13,145,208,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <i class="fas ${icon}" style="color:var(--bgfi-mint);"></i>
                </div>
                <div>
                  <div style="font-weight:700;color:white;font-size:14px;">${title}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.6);">${desc}</div>
                </div>
              </div>`).join('')}
          </div>
          <a href="/espace-pme" class="btn btn-white"><i class="fas fa-store"></i> Découvrir l'Espace PME</a>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          ${[
            ['fa-chart-line', 'var(--bgfi-sky)', 'Croissance', 'Financez votre expansion'],
            ['fa-tools', 'var(--bgfi-mint)', 'Équipement', 'Modernisez vos outils'],
            ['fa-users', 'var(--bgfi-p4)', 'Emploi', 'Développez vos équipes'],
            ['fa-globe-africa', 'var(--bgfi-p3)', 'Export', 'Ouvrez-vous aux marchés'],
          ].map(([icon, color, title, desc]) => `
            <div style="background:rgba(255,255,255,0.07);border-radius:8px;padding:20px;border:1px solid rgba(255,255,255,0.1);text-align:center;">
              <i class="fas ${icon}" style="font-size:28px;color:${color};margin-bottom:10px;display:block;"></i>
              <div style="font-weight:700;color:white;margin-bottom:4px;">${title}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.5);">${desc}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </section>
  `

  return c.html(getLayout(content, 'Accueil', ''))
})

// ── PARTICULIERS ──────────────────────────────────────────────
pages.get('/particuliers', (c) => {
  const products = store.products.filter(p => p.segment === 'particuliers')
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Particuliers</div>
      <h1><i class="fas fa-user" style="margin-right:10px;"></i>Espace Particuliers</h1>
      <p>Des solutions bancaires complètes pour votre vie quotidienne et vos projets personnels</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div id="comptes" class="section-header"><span class="eyebrow">Tous nos produits</span><h2>Nos services pour les Particuliers</h2><div class="divider"></div></div>
      <div class="grid-4" id="epargne" style="margin-top:16px;">${products.map(productCard).join('')}</div>
    </div>
  </section>
  <section class="section section-alt" id="credits">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
        <div>
          <span class="eyebrow">Banque à distance</span>
          <h2 style="font-size:28px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;" id="digital">Gérez votre banque depuis partout</h2>
          <p style="color:var(--bgfi-text-light);line-height:1.7;">BGFIOnline vous permet de consulter vos comptes, effectuer des virements et télécharger vos relevés à tout moment, depuis n'importe quel navigateur.</p>
          <div style="margin:20px 0;display:flex;flex-direction:column;gap:10px;">
            ${['Consultation de solde en temps réel','Virements nationaux et internationaux','Téléchargement de relevés PDF','Historique complet des transactions'].map(f=>`<div style="display:flex;gap:10px;align-items:center;"><i class="fas fa-check-circle" style="color:var(--bgfi-p3);"></i><span style="font-size:14px;">${f}</span></div>`).join('')}
          </div>
          <a href="https://online.bgfi.com" target="_blank" class="btn btn-primary-sm"><i class="fas fa-laptop"></i> Accéder à BGFIOnline</a>
        </div>
        <div style="background:var(--bgfi-navy);border-radius:12px;padding:32px;text-align:center;">
          <i class="fas fa-laptop" style="font-size:64px;color:rgba(255,255,255,0.2);margin-bottom:16px;display:block;"></i>
          <div style="color:white;font-size:18px;font-weight:700;margin-bottom:8px;">BGFIOnline</div>
          <div style="color:rgba(255,255,255,0.6);font-size:13px;">Votre banque en ligne 24h/24</div>
          <a href="https://online.bgfi.com" target="_blank" class="btn btn-white" style="margin-top:20px;"><i class="fas fa-external-link-alt"></i> Se connecter</a>
        </div>
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, 'Particuliers', 'particuliers'))
})

// ── PROFESSIONNELS ────────────────────────────────────────────
pages.get('/professionnels', (c) => {
  const products = store.products.filter(p => p.segment === 'professionnels')
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Professionnels</div>
      <h1><i class="fas fa-briefcase" style="margin-right:10px;"></i>Espace Professionnels</h1>
      <p>Des solutions adaptées pour développer et pérenniser votre activité professionnelle</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Nos produits</span><h2>Solutions pour Professionnels</h2><div class="divider"></div></div>
      <div class="grid-3">${products.map(productCard).join('')}</div>
    </div>
  </section>
  <section class="section section-alt">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Expertise</span><h2>Pourquoi choisir BGFIBank pour votre activité ?</h2><div class="divider"></div></div>
      <div class="grid-4">
        ${[['fa-user-tie','Conseiller dédié','Un expert à votre disposition pour toutes vos opérations bancaires professionnelles'],['fa-tachometer-alt','Réactivité','Des décisions rapides pour ne pas bloquer votre activité'],['fa-shield-alt','Sécurité','Des solutions sécurisées conformes aux normes bancaires internationales'],['fa-handshake','Partenariat','Plus qu\'une banque, un véritable partenaire de votre croissance']].map(([icon,title,desc])=>`
        <div class="card"><div class="card-body" style="text-align:center;">
          <div style="font-size:36px;color:var(--bgfi-sky);margin-bottom:12px;"><i class="fas ${icon}"></i></div>
          <div class="card-title">${title}</div>
          <div class="card-text">${desc}</div>
        </div></div>`).join('')}
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, 'Professionnels', 'professionnels'))
})

// ── ENTREPRISES ───────────────────────────────────────────────
pages.get('/entreprises', (c) => {
  const products = store.products.filter(p => p.segment === 'entreprises')
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Entreprises</div>
      <h1><i class="fas fa-industry" style="margin-right:10px;"></i>Espace Entreprises & Institutions</h1>
      <p>Des solutions sur mesure pour accompagner la croissance de votre entreprise en RCA et à l'international</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Solutions corporate</span><h2>Nos services Entreprises</h2><div class="divider"></div></div>
      <div class="grid-3">${products.map(productCard).join('')}</div>
    </div>
  </section>
  <section class="section section-alt">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Chiffres clés</span><h2>BGFIBank Centrafrique en chiffres</h2><div class="divider"></div></div>
      <div class="grid-4">
        ${[['30+','Années de présence en RCA'],['500M+','FCFA de crédits accordés'],['1000+','Entreprises accompagnées'],['6','Agences & GAB en RCA']].map(([num,label])=>`
        <div class="card"><div class="card-body" style="text-align:center;padding:32px 20px;">
          <div style="font-size:40px;font-weight:700;color:var(--bgfi-sky);margin-bottom:8px;">${num}</div>
          <div style="font-size:14px;color:var(--bgfi-text-light);">${label}</div>
        </div></div>`).join('')}
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, 'Entreprises & Institutions', 'entreprises'))
})

// ── BANQUE PRIVÉE ─────────────────────────────────────────────
pages.get('/banque-privee', (c) => {
  const products = store.products.filter(p => p.segment === 'banque-privee')
  const content = `
  <div class="page-hero" style="background:linear-gradient(135deg,#1a0533,#003a74);">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Banque Privée</div>
      <h1><i class="fas fa-gem" style="margin-right:10px;color:#a8b088;"></i>Banque Privée</h1>
      <p>Une expérience bancaire d'exception, personnalisée selon vos ambitions patrimoniales</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:60px;">
        <div>
          <span class="eyebrow">Excellence & Exclusivité</span>
          <h2 style="font-size:28px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;">Un service sur mesure pour votre patrimoine</h2>
          <p style="color:var(--bgfi-text-light);line-height:1.7;margin-bottom:20px;">La Banque Privée BGFIBank s'adresse aux particuliers souhaitant une gestion personnalisée et discrète de leur patrimoine, avec l'expertise d'un conseiller privé dédié.</p>
          <a href="/rendez-vous" class="btn btn-primary-sm"><i class="fas fa-calendar-check"></i> Prendre rendez-vous</a>
        </div>
        <div style="background:linear-gradient(135deg,var(--bgfi-navy),#1a0533);border-radius:12px;padding:32px;">
          ${['Conseiller privé exclusif','Discrétion absolue','Stratégies d\'investissement sur mesure','Accès aux marchés financiers'].map(f=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
            <i class="fas fa-check-circle" style="color:#a8b088;flex-shrink:0;"></i>
            <span style="color:rgba(255,255,255,0.9);font-size:14px;">${f}</span>
          </div>`).join('')}
        </div>
      </div>
      <div class="section-header"><span class="eyebrow">Nos offres</span><h2>Services Banque Privée</h2><div class="divider"></div></div>
      <div class="grid-2" style="margin-top:32px;">${products.map(productCard).join('')}</div>
    </div>
  </section>`
  return c.html(getLayout(content, 'Banque Privée', 'banque-privee'))
})

// ── BGFIBank & la RCA ─────────────────────────────────────────
pages.get('/bgfibank-rca', (c) => {
  const content = `
  <div class="page-hero" style="background:linear-gradient(135deg,var(--bgfi-dark-teal),var(--bgfi-navy));">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>BGFIBank & la RCA</div>
      <h1><i class="fas fa-globe-africa" style="margin-right:10px;"></i>BGFIBank & la République Centrafricaine</h1>
      <p>Notre engagement pour le développement économique et social de la RCA</p>
    </div>
  </div>
  <section class="section" id="histoire">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
        <div>
          <span class="eyebrow">Notre histoire</span>
          <h2 style="font-size:28px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;">30 ans au service de la RCA</h2>
          <p style="color:var(--bgfi-text-light);line-height:1.7;margin-bottom:16px;">Présent en République Centrafricaine depuis plusieurs décennies, BGFIBank s'est imposé comme un acteur incontournable du paysage bancaire centrafricain.</p>
          <p style="color:var(--bgfi-text-light);line-height:1.7;">Filiale du Groupe BGFIBank, présent dans 12 pays africains, nous combinons l'expertise d'un groupe continental avec une profonde connaissance du marché local.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          ${[['fa-calendar','Fondation','Présence historique en RCA'],['fa-map-marked-alt','6 Points de service','À Bangui et en province'],['fa-users','+10 000 clients','Particuliers et entreprises'],['fa-award','Qualité','Certifié par la COBAC']].map(([icon,title,desc])=>`
          <div style="background:var(--bgfi-light);border-radius:8px;padding:20px;text-align:center;border-top:3px solid var(--bgfi-sky);">
            <i class="fas ${icon}" style="font-size:24px;color:var(--bgfi-sky);margin-bottom:10px;display:block;"></i>
            <div style="font-weight:700;color:var(--bgfi-navy);font-size:14px;">${title}</div>
            <div style="font-size:12px;color:var(--bgfi-text-light);margin-top:4px;">${desc}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>
  <section class="section section-alt" id="impact">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Impact local</span><h2>Notre contribution au développement de la RCA</h2><div class="divider"></div></div>
      <div class="grid-3" style="margin-top:32px;">
        ${[
          ['fa-building','Infrastructure','Financement de projets d\'infrastructure économique à Bangui et en province'],
          ['fa-seedling','Agriculture','Soutien aux filières agricoles et aux coopératives rurales centrafricaines'],
          ['fa-graduation-cap','Éducation','Partenariats avec des institutions académiques pour la formation financière'],
          ['fa-hospital','Santé','Financement d\'établissements de santé et de projets médicaux'],
          ['fa-solar-panel','Énergie','Accompagnement de projets d\'énergie renouvelable pour la RCA'],
          ['fa-hands-helping','Social','Actions sociales via la Fondation BGFIBank'],
        ].map(([icon,title,desc])=>`
        <div class="card"><div class="card-body">
          <div style="font-size:28px;color:var(--bgfi-sky);margin-bottom:12px;"><i class="fas ${icon}"></i></div>
          <div class="card-title">${title}</div>
          <div class="card-text">${desc}</div>
        </div></div>`).join('')}
      </div>
    </div>
  </section>
  <section class="section section-dark" id="rse">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Responsabilité</span><h2>Nos engagements RSE</h2><div class="divider"></div><p>BGFIBank Centrafrique s'engage pour un développement durable et inclusif</p></div>
      <div class="grid-3">
        ${[['fa-leaf','Environnement','Réduction de notre empreinte carbone et soutien aux initiatives vertes en RCA'],['fa-users','Social','Emploi local, formation et inclusion financière des populations centrafricaines'],['fa-balance-scale','Gouvernance','Transparence, éthique et conformité aux standards bancaires internationaux']].map(([icon,title,desc])=>`
        <div style="background:rgba(255,255,255,0.07);border-radius:8px;padding:28px;text-align:center;border:1px solid rgba(255,255,255,0.1);">
          <i class="fas ${icon}" style="font-size:40px;color:var(--bgfi-mint);margin-bottom:16px;display:block;"></i>
          <div style="font-weight:700;color:white;font-size:16px;margin-bottom:10px;">${title}</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.6);">${desc}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, 'BGFIBank & la RCA', 'bgfibank-rca'))
})

// ── ESPACE PME ────────────────────────────────────────────────
pages.get('/espace-pme', (c) => {
  const content = `
  <div class="page-hero" style="background:linear-gradient(135deg,var(--bgfi-p3),var(--bgfi-teal));">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Espace PME</div>
      <h1><i class="fas fa-store" style="margin-right:10px;"></i>Espace PME Centrafrique</h1>
      <p>BGFIBank croit au potentiel des entrepreneurs centrafricains — Solutions exclusives pour les PME</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Programme PME</span><h2>Comment financer votre projet en RCA ?</h2><div class="divider"></div></div>
      <div class="pme-steps">
        <div class="pme-step"><div class="step-num">1</div><h4>Évaluez votre projet</h4><p>Utilisez nos simulateurs pour estimer votre besoin de financement</p></div>
        <div class="pme-step"><div class="step-num">2</div><h4>Rencontrez votre conseiller</h4><p>Un expert PME analyse votre dossier et vous conseille</p></div>
        <div class="pme-step"><div class="step-num">3</div><h4>Montez votre dossier</h4><p>Nous vous accompagnons dans la constitution de votre dossier</p></div>
        <div class="pme-step"><div class="step-num">4</div><h4>Obtenez votre financement</h4><p>Décision rapide et déblocage des fonds sous 48h</p></div>
      </div>
    </div>
  </section>
  <section class="section section-alt">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Nos offres PME</span><h2>Solutions conçues pour les entrepreneurs centrafricains</h2><div class="divider"></div></div>
      <div class="grid-3">
        ${[
          ['fa-rocket','Crédit Création','Lancez votre entreprise avec un financement adapté à vos premiers besoins','Taux préférentiel · Durée 1-5 ans · Apport 20%',true],
          ['fa-chart-line','Crédit Développement','Développez votre activité existante avec un financement structuré','Jusqu\'à 50M FCFA · Durée 1-7 ans · Garanties flexibles',true],
          ['fa-warehouse','Crédit Équipement','Modernisez vos équipements et boostez votre productivité','Financement 80% · Durée 1-5 ans · Remboursement mensuel',true],
        ].map(([icon,title,desc,detail,avail])=>`
        <div class="card">
          <div class="card-body">
            <div style="font-size:32px;color:var(--bgfi-p3);margin-bottom:12px;"><i class="fas ${icon}"></i></div>
            <div class="card-title">${title}</div>
            <div class="card-text">${desc}</div>
            <div style="background:var(--bgfi-light);border-radius:4px;padding:10px;margin:12px 0;font-size:12px;color:var(--bgfi-text-light);">${detail}</div>
            <a href="/contact" class="btn btn-primary-sm btn-full"><i class="fas fa-paper-plane"></i> Faire une demande</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
        <div>
          <span class="eyebrow">Témoignage</span>
          <h2 style="font-size:28px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;">Ils ont réussi avec BGFIBank</h2>
          <div class="testimonial-card">
            <blockquote>Le programme PME de BGFIBank Centrafrique m'a permis de financer l'extension de mon atelier de menuiserie. En 6 mois, mon chiffre d'affaires a doublé. Mon conseiller m'a accompagné tout au long du processus.</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">AK</div>
              <div><div class="author-name">Alphonse Koyagialo</div><div class="author-role">Artisan menuisier, Bangui</div></div>
            </div>
          </div>
        </div>
        <div style="background:var(--bgfi-light);border-radius:12px;padding:32px;">
          <h3 style="font-size:18px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;"><i class="fas fa-paper-plane" style="color:var(--bgfi-sky);margin-right:8px;"></i>Demandez votre financement PME</h3>
          <form onsubmit="submitPMERequest(event)">
            <div class="form-group"><label>Nom complet *</label><input type="text" placeholder="Votre nom" required></div>
            <div class="form-group"><label>Téléphone *</label><input type="tel" placeholder="+236 ..."></div>
            <div class="form-group"><label>Type de projet *</label>
              <select><option>Création d'entreprise</option><option>Développement d'activité</option><option>Achat d'équipements</option><option>Besoin en fonds de roulement</option></select>
            </div>
            <div class="form-group"><label>Montant souhaité (FCFA) *</label><input type="number" placeholder="Ex: 5000000"></div>
            <div class="form-group"><label>Description du projet</label><textarea placeholder="Décrivez brièvement votre projet..."></textarea></div>
            <button type="submit" class="btn btn-primary-sm btn-full"><i class="fas fa-paper-plane"></i> Envoyer ma demande</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <script>
    function submitPMERequest(e) { e.preventDefault(); showToast('Votre demande a été envoyée ! Un conseiller vous contactera sous 48h.'); e.target.reset(); }
  </script>`
  return c.html(getLayout(content, 'Espace PME', 'espace-pme'))
})

// ── ACTUALITÉS ────────────────────────────────────────────────
pages.get('/actualites', (c) => {
  const articles = store.articles.filter(a => a.published)
  const categories = [...new Set(articles.map(a => a.category))]
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Actualités</div>
      <h1><i class="fas fa-newspaper" style="margin-right:10px;"></i>Actualités</h1>
      <p>Les dernières nouvelles de BGFIBank Centrafrique et de l'économie centrafricaine</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <!-- Filtres catégories -->
      <div class="segment-tabs" style="margin-bottom:32px;" id="cat-tabs">
        <button class="segment-tab active" onclick="filterArticles('all', this)">Toutes</button>
        ${categories.map(cat => `<button class="segment-tab" onclick="filterArticles('${cat}', this)">${cat}</button>`).join('')}
      </div>
      <div class="grid-3" id="articles-grid">
        ${articles.map(a => `<div class="article-item" data-category="${a.category}">${articleCard(a)}</div>`).join('')}
      </div>
      ${articles.length === 0 ? '<div style="text-align:center;padding:60px;color:var(--bgfi-text-light);">Aucun article publié pour le moment.</div>' : ''}
    </div>
  </section>
  <script>
    function filterArticles(cat, btn) {
      document.querySelectorAll('#cat-tabs .segment-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.article-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? 'block' : 'none';
      });
    }
  </script>`
  return c.html(getLayout(content, 'Actualités', 'actualites'))
})

// ── ARTICLE DETAIL ────────────────────────────────────────────
pages.get('/actualites/:slug', (c) => {
  const article = store.articles.find(a => a.slug === c.req.param('slug') && a.published)
  if (!article) return c.redirect('/actualites')
  const related = store.articles.filter(a => a.published && a.id !== article.id && a.category === article.category).slice(0, 3)
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span><a href="/actualites">Actualités</a><span class="sep">›</span>${article.category}</div>
      <span style="background:var(--bgfi-sky);color:white;font-size:11px;font-weight:700;padding:4px 12px;border-radius:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;display:inline-block;">${article.category}</span>
      <h1 style="max-width:800px;">${article.title}</h1>
      <div style="display:flex;gap:16px;align-items:center;margin-top:12px;flex-wrap:wrap;">
        <span style="color:rgba(255,255,255,0.7);font-size:13px;"><i class="fas fa-calendar-alt" style="margin-right:6px;"></i>${formatDate(article.date)}</span>
        <span style="color:rgba(255,255,255,0.7);font-size:13px;"><i class="fas fa-user" style="margin-right:6px;"></i>${article.author}</span>
      </div>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 340px;gap:40px;">
        <div>
          <img src="${article.image}" alt="${article.title}" style="width:100%;height:360px;object-fit:cover;border-radius:8px;margin-bottom:32px;">
          <div style="font-size:16px;line-height:1.9;color:var(--bgfi-text);">${article.content}</div>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--bgfi-border);display:flex;align-items:center;gap:12px;">
            <span style="font-size:13px;color:var(--bgfi-text-light);">Partager :</span>
            <a href="#" style="background:#1877f2;color:white;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none;"><i class="fab fa-facebook-f" style="margin-right:4px;"></i>Facebook</a>
            <a href="#" style="background:#1da1f2;color:white;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none;"><i class="fab fa-twitter" style="margin-right:4px;"></i>Twitter</a>
            <a href="#" style="background:#25d366;color:white;padding:6px 14px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none;"><i class="fab fa-whatsapp" style="margin-right:4px;"></i>WhatsApp</a>
          </div>
        </div>
        <div>
          <div style="background:var(--bgfi-light);border-radius:8px;padding:20px;margin-bottom:24px;">
            <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">Articles similaires</h3>
            ${related.length > 0 ? related.map(r => `
              <div class="news-mini" onclick="location.href='/actualites/${r.slug}'" style="cursor:pointer;margin-bottom:12px;border-radius:6px;overflow:hidden;display:flex;gap:10px;border:1px solid var(--bgfi-border);">
                <img src="${r.image}" style="width:80px;height:70px;object-fit:cover;flex-shrink:0;">
                <div style="padding:8px 10px;">
                  <div style="font-size:11px;font-weight:700;color:var(--bgfi-sky);margin-bottom:4px;">${r.category}</div>
                  <div style="font-size:12px;font-weight:700;color:var(--bgfi-navy);line-height:1.4;">${r.title}</div>
                </div>
              </div>`).join('') : '<p style="font-size:13px;color:var(--bgfi-text-light);">Aucun article similaire.</p>'}
          </div>
          <div style="background:linear-gradient(135deg,var(--bgfi-navy),var(--bgfi-blue));border-radius:8px;padding:20px;text-align:center;">
            <i class="fas fa-envelope-open-text" style="font-size:32px;color:var(--bgfi-mint);margin-bottom:12px;display:block;"></i>
            <h4 style="color:white;margin-bottom:8px;">Newsletter BGFIBank</h4>
            <p style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:16px;">Restez informé de nos dernières actualités</p>
            <form onsubmit="subscribeNewsletter(event)">
              <input id="newsletterEmail" type="email" placeholder="Votre email" required style="width:100%;padding:10px;border-radius:4px;border:none;font-size:13px;margin-bottom:10px;">
              <button type="submit" class="btn btn-white btn-full" style="justify-content:center;font-size:13px;"><i class="fas fa-paper-plane"></i> S'abonner</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, article.title, 'actualites'))
})

// ── SIMULATEURS ───────────────────────────────────────────────
pages.get('/simulateurs', (c) => {
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Simulateurs</div>
      <h1><i class="fas fa-calculator" style="margin-right:10px;"></i>Simulateurs Bancaires</h1>
      <p>Calculez et anticipez vos projets financiers en toute simplicité</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
        <div>
          <div class="simulator-tabs">
            <button class="sim-tab active" onclick="showSim('credit',this)"><i class="fas fa-hand-holding-usd"></i> Crédit</button>
            <button class="sim-tab" onclick="showSim('dat',this)"><i class="fas fa-chart-line"></i> DAT</button>
            <button class="sim-tab" onclick="showSim('epargne',this)"><i class="fas fa-piggy-bank"></i> Épargne</button>
          </div>
          <!-- Simulateur Crédit -->
          <div id="sim-credit" class="sim-box">
            <h3 style="font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;"><i class="fas fa-hand-holding-usd" style="color:var(--bgfi-sky);margin-right:8px;"></i>Simulateur de Crédit</h3>
            <div class="form-group"><label>Montant du crédit (FCFA)</label><input type="number" id="creditAmount" value="5000000" oninput="calcCredit()"></div>
            <div class="form-group"><label>Durée (mois)</label><input type="range" id="creditDuration" min="6" max="120" value="24" oninput="calcCredit();document.getElementById('durLabel').textContent=this.value+' mois'"><span id="durLabel" style="font-size:13px;color:var(--bgfi-sky);font-weight:600;">24 mois</span></div>
            <div class="form-group"><label>Taux annuel (%)</label><input type="number" id="creditRate" value="12" step="0.1" oninput="calcCredit()"></div>
            <div class="sim-result" id="creditResult">
              <div class="result-label">Mensualité estimée</div>
              <div class="result-value" id="creditMonthly">—</div>
              <div class="result-detail" id="creditTotal">—</div>
            </div>
          </div>
          <!-- Simulateur DAT -->
          <div id="sim-dat" class="sim-box" style="display:none;">
            <h3 style="font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;"><i class="fas fa-chart-line" style="color:var(--bgfi-sky);margin-right:8px;"></i>Simulateur DAT</h3>
            <div class="form-group"><label>Capital à placer (FCFA)</label><input type="number" id="datAmount" value="2000000" oninput="calcDAT()"></div>
            <div class="form-group"><label>Durée</label><select id="datDuration" onchange="calcDAT()"><option value="3">3 mois</option><option value="6" selected>6 mois</option><option value="12">12 mois</option><option value="24">24 mois</option></select></div>
            <div class="form-group"><label>Taux annuel (%)</label><input type="number" id="datRate" value="5.5" step="0.1" oninput="calcDAT()"></div>
            <div class="sim-result" id="datResult">
              <div class="result-label">Intérêts générés</div>
              <div class="result-value" id="datInterests">—</div>
              <div class="result-detail" id="datTotal">—</div>
            </div>
          </div>
          <!-- Simulateur Épargne -->
          <div id="sim-epargne" class="sim-box" style="display:none;">
            <h3 style="font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;"><i class="fas fa-piggy-bank" style="color:var(--bgfi-sky);margin-right:8px;"></i>Simulateur d'Épargne</h3>
            <div class="form-group"><label>Versement mensuel (FCFA)</label><input type="number" id="savMonthly" value="50000" oninput="calcSaving()"></div>
            <div class="form-group"><label>Durée (années)</label><input type="range" id="savDuration" min="1" max="20" value="5" oninput="calcSaving();document.getElementById('savDurLabel').textContent=this.value+' ans'"><span id="savDurLabel" style="font-size:13px;color:var(--bgfi-sky);font-weight:600;">5 ans</span></div>
            <div class="form-group"><label>Taux annuel (%)</label><input type="number" id="savRate" value="4" step="0.1" oninput="calcSaving()"></div>
            <div class="sim-result">
              <div class="result-label">Capital constitué</div>
              <div class="result-value" id="savTotal">—</div>
              <div class="result-detail" id="savInterests">—</div>
            </div>
          </div>
        </div>
        <div>
          <div style="background:var(--bgfi-navy);border-radius:12px;padding:32px;color:white;margin-bottom:24px;">
            <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-info-circle" style="color:var(--bgfi-mint);margin-right:8px;"></i>Bon à savoir</h3>
            <p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7;margin-bottom:16px;">Ces simulations sont données à titre indicatif. Les taux et conditions réels sont définis lors de l'étude de votre dossier par nos conseillers.</p>
            <a href="/contact" class="btn btn-white" style="font-size:13px;"><i class="fas fa-calendar-check"></i> Prendre rendez-vous</a>
          </div>
          <div style="background:var(--bgfi-light);border-radius:12px;padding:24px;">
            <h3 style="font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;">Nos produits d'épargne</h3>
            ${[['Compte Épargne','À partir de 0% de frais','Disponible'],['Dépôt à Terme','Taux garanti jusqu\'à 7%','Disponible'],['Épargne Projet','Pour vos grands projets','Disponible']].map(([name,detail,status])=>`
            <div style="padding:12px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;">
              <div><div style="font-weight:700;color:var(--bgfi-navy);font-size:13px;">${name}</div><div style="font-size:12px;color:var(--bgfi-text-light);">${detail}</div></div>
              <span class="badge-published">${status}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    function showSim(type, btn) {
      ['credit','dat','epargne'].forEach(t => { document.getElementById('sim-'+t).style.display = t===type?'block':'none'; });
      document.querySelectorAll('.sim-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if(type==='credit') calcCredit();
      if(type==='dat') calcDAT();
      if(type==='epargne') calcSaving();
    }
    function fmt(n) { return Math.round(n).toLocaleString('fr-FR') + ' FCFA'; }
    function calcCredit() {
      const p = parseFloat(document.getElementById('creditAmount').value)||0;
      const n = parseInt(document.getElementById('creditDuration').value)||1;
      const r = parseFloat(document.getElementById('creditRate').value)/100/12;
      if(r===0) { document.getElementById('creditMonthly').textContent = fmt(p/n); return; }
      const m = p * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
      document.getElementById('creditMonthly').textContent = fmt(m);
      document.getElementById('creditTotal').textContent = 'Coût total : ' + fmt(m*n) + ' | Intérêts : ' + fmt(m*n-p);
    }
    function calcDAT() {
      const p = parseFloat(document.getElementById('datAmount').value)||0;
      const m = parseInt(document.getElementById('datDuration').value)||1;
      const r = parseFloat(document.getElementById('datRate').value)/100;
      const interests = p * r * m / 12;
      document.getElementById('datInterests').textContent = fmt(interests);
      document.getElementById('datTotal').textContent = 'Capital final : ' + fmt(p + interests);
    }
    function calcSaving() {
      const m = parseFloat(document.getElementById('savMonthly').value)||0;
      const y = parseInt(document.getElementById('savDuration').value)||1;
      const r = parseFloat(document.getElementById('savRate').value)/100/12;
      const n = y * 12;
      const total = r===0 ? m*n : m * (Math.pow(1+r,n)-1)/r;
      const invested = m * n;
      document.getElementById('savTotal').textContent = fmt(total);
      document.getElementById('savInterests').textContent = 'Versements : ' + fmt(invested) + ' | Gains : ' + fmt(total-invested);
    }
    calcCredit(); calcDAT(); calcSaving();
  </script>`
  return c.html(getLayout(content, 'Simulateurs Bancaires', 'simulateurs'))
})

// ── AGENCES ───────────────────────────────────────────────────
pages.get('/agences', (c) => {
  const agencies = store.agencies
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Nos Agences</div>
      <h1><i class="fas fa-map-marker-alt" style="margin-right:10px;"></i>Nos Agences & GAB</h1>
      <p>Retrouvez toutes nos agences et distributeurs automatiques en République Centrafricaine</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div class="map-layout">
        <div id="map"></div>
        <div class="map-sidebar">
          <h3><i class="fas fa-list" style="color:var(--bgfi-sky);"></i> Points de service (${agencies.length})</h3>
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <button class="segment-tab active" style="flex:1;font-size:12px;" onclick="filterMap('all',this)">Tous</button>
            <button class="segment-tab" style="flex:1;font-size:12px;" onclick="filterMap('agence',this)">Agences</button>
            <button class="segment-tab" style="flex:1;font-size:12px;" onclick="filterMap('gab',this)">GAB</button>
          </div>
          <div id="agency-list">
            ${agencies.map(a => `
            <div class="agency-item" onclick="focusAgency(${a.lat},${a.lng},'${a.name.replace(/'/g,"\\'")}')">
              <div class="agency-name">
                <i class="fas ${a.type === 'agence' ? 'fa-university' : 'fa-atm'}" style="color:${a.type === 'agence' ? 'var(--bgfi-sky)' : 'var(--bgfi-p3)'};"></i>
                ${a.name.replace('BGFIBank — ', '')}
                <span class="agency-type ${a.type}">${a.type === 'agence' ? 'Agence' : 'GAB'}</span>
              </div>
              <div class="agency-info">
                <span><i class="fas fa-map-pin" style="width:14px;color:var(--bgfi-text-light);"></i> ${a.address}, ${a.city}</span>
                <span><i class="fas fa-clock" style="width:14px;color:var(--bgfi-text-light);"></i> ${a.hours}</span>
                ${a.phone ? `<span><i class="fas fa-phone" style="width:14px;color:var(--bgfi-text-light);"></i> ${a.phone}</span>` : ''}
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    const agencies = ${JSON.stringify(agencies)};
    const map = L.map('map').setView([4.36, 18.55], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
    
    const agenceIcon = L.divIcon({ html: '<div style="background:var(--bgfi-sky,#0d91d0);width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>', iconSize:[32,32], iconAnchor:[16,32], popupAnchor:[0,-32] });
    const gabIcon = L.divIcon({ html: '<div style="background:#40a860;width:28px;height:28px;border-radius:4px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><span style="color:white;font-size:10px;font-weight:700;">$</span></div>', iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-14] });
    
    const markers = [];
    agencies.forEach(a => {
      const icon = a.type === 'agence' ? agenceIcon : gabIcon;
      const m = L.marker([a.lat, a.lng], {icon}).addTo(map);
      m.bindPopup('<div style="min-width:200px;"><strong style="color:#003a74;">' + a.name + '</strong><br><small style="color:#666;">' + a.address + ', ' + a.city + '</small><br><small><i class="fas fa-clock"></i> ' + a.hours + '</small>' + (a.phone ? '<br><small><i class="fas fa-phone"></i> ' + a.phone + '</small>' : '') + '</div>');
      markers.push({ marker: m, type: a.type });
    });
    
    function focusAgency(lat, lng, name) { map.setView([lat, lng], 16); markers.forEach(m => { if(m.marker.getLatLng().lat === lat) m.marker.openPopup(); }); }
    function filterMap(type, btn) {
      document.querySelectorAll('.segment-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      markers.forEach(m => { if(type === 'all' || m.type === type) map.addLayer(m.marker); else map.removeLayer(m.marker); });
    }
  </script>`
  return c.html(getLayout(content, 'Nos Agences & GAB', ''))
})

// ── CONTACT ───────────────────────────────────────────────────
pages.get('/contact', (c) => {
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Contact</div>
      <h1><i class="fas fa-envelope" style="margin-right:10px;"></i>Contactez-nous</h1>
      <p>Notre équipe est disponible pour répondre à toutes vos questions</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;">
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--bgfi-navy);margin-bottom:24px;">Envoyez-nous un message</h2>
          <form onsubmit="submitContact(event)" class="admin-card" style="padding:28px;">
            <div class="form-group"><label>Nom complet *</label><input type="text" placeholder="Votre nom complet" required></div>
            <div class="form-group"><label>Email *</label><input type="email" placeholder="votre@email.com" required></div>
            <div class="form-group"><label>Téléphone</label><input type="tel" placeholder="+236 ..."></div>
            <div class="form-group"><label>Sujet *</label>
              <select><option>Demande d'information</option><option>Ouverture de compte</option><option>Crédit & Financement</option><option>Réclamation</option><option>Partenariat</option><option>Autre</option></select>
            </div>
            <div class="form-group"><label>Message *</label><textarea placeholder="Votre message..." required style="min-height:130px;"></textarea></div>
            <button type="submit" class="btn btn-primary-sm btn-full"><i class="fas fa-paper-plane"></i> Envoyer le message</button>
          </form>
        </div>
        <div>
          <h2 style="font-size:22px;font-weight:700;color:var(--bgfi-navy);margin-bottom:24px;">Nos coordonnées</h2>
          <div style="display:flex;flex-direction:column;gap:16px;">
            ${[
              ['fa-map-marker-alt','Adresse','Avenue des Martyrs, Bangui<br>République Centrafricaine','var(--bgfi-sky)'],
              ['fa-phone','Téléphone','+236 75 00 00 00','var(--bgfi-p3)'],
              ['fa-envelope','Email','contact@bgfibank-rca.com','var(--bgfi-p4)'],
              ['fa-clock','Horaires','Lun - Ven : 8h00 - 17h00<br>Samedi : 8h00 - 12h00','var(--bgfi-p6)'],
            ].map(([icon,label,val,color])=>`
            <div style="display:flex;gap:16px;align-items:flex-start;padding:16px;background:var(--bgfi-light);border-radius:8px;border-left:4px solid ${color};">
              <div style="width:40px;height:40px;background:${color};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas ${icon}" style="color:white;"></i>
              </div>
              <div><div style="font-weight:700;color:var(--bgfi-navy);margin-bottom:4px;">${label}</div><div style="font-size:14px;color:var(--bgfi-text-light);">${val}</div></div>
            </div>`).join('')}
          </div>
          <div style="margin-top:24px;padding:20px;background:var(--bgfi-navy);border-radius:8px;text-align:center;">
            <i class="fas fa-headset" style="font-size:32px;color:var(--bgfi-mint);margin-bottom:12px;display:block;"></i>
            <div style="color:white;font-weight:700;margin-bottom:4px;">Service Client 24/7</div>
            <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:12px;">Pour les urgences bancaires</div>
            <a href="tel:+23675000000" style="background:var(--bgfi-sky);color:white;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;">
              <i class="fas fa-phone" style="margin-right:6px;"></i>+236 75 00 00 00
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script>
    function submitContact(e) { e.preventDefault(); showToast('Message envoyé ! Nous vous répondrons sous 24h.'); e.target.reset(); }
  </script>`
  return c.html(getLayout(content, 'Contact', ''))
})

// ── CARRIÈRES ─────────────────────────────────────────────────
pages.get('/carrieres', (c) => {
  const jobs = store.jobs.filter(j => j.published)
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Carrières</div>
      <h1><i class="fas fa-briefcase" style="margin-right:10px;"></i>Rejoignez BGFIBank Centrafrique</h1>
      <p>Construisez votre carrière dans l'une des plus grandes banques d'Afrique Centrale</p>
    </div>
  </div>
  <section class="section">
    <div class="container">
      <div class="section-header"><span class="eyebrow">Opportunités</span><h2>Nos offres d'emploi</h2><div class="divider"></div></div>
      ${jobs.length > 0 ? `<div style="display:flex;flex-direction:column;gap:16px;margin-top:24px;">
        ${jobs.map(j => `
        <div class="admin-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div>
            <div style="font-size:18px;font-weight:700;color:var(--bgfi-navy);margin-bottom:6px;">${j.title}</div>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <span style="font-size:12px;background:var(--bgfi-light);padding:4px 10px;border-radius:10px;color:var(--bgfi-text-light);"><i class="fas fa-building" style="margin-right:4px;"></i>${j.department}</span>
              <span style="font-size:12px;background:var(--bgfi-light);padding:4px 10px;border-radius:10px;color:var(--bgfi-text-light);"><i class="fas fa-map-marker-alt" style="margin-right:4px;"></i>${j.location}</span>
              <span style="font-size:12px;background:var(--bgfi-sky);color:white;padding:4px 10px;border-radius:10px;">${j.type}</span>
            </div>
            <p style="font-size:14px;color:var(--bgfi-text-light);margin-top:8px;">${j.description}</p>
          </div>
          <a href="/contact" class="btn btn-primary-sm" style="flex-shrink:0;"><i class="fas fa-paper-plane"></i> Postuler</a>
        </div>`).join('')}
      </div>` : '<div style="text-align:center;padding:60px;"><i class="fas fa-briefcase" style="font-size:48px;color:var(--bgfi-border);margin-bottom:16px;display:block;"></i><p style="color:var(--bgfi-text-light);">Aucun poste disponible pour le moment.</p></div>'}
      <div style="margin-top:40px;background:var(--bgfi-light);border-radius:12px;padding:32px;text-align:center;">
        <h3 style="font-size:18px;font-weight:700;color:var(--bgfi-navy);margin-bottom:12px;">Candidature spontanée</h3>
        <p style="color:var(--bgfi-text-light);margin-bottom:20px;">Votre profil ne correspond pas à nos offres actuelles ? Envoyez-nous votre CV, nous l'étudierons avec attention.</p>
        <a href="/contact" class="btn btn-primary-sm"><i class="fas fa-file-alt"></i> Envoyer mon CV</a>
      </div>
    </div>
  </section>`
  return c.html(getLayout(content, 'Carrières', ''))
})

// ── PRISE DE RDV ──────────────────────────────────────────────
pages.get('/rendez-vous', (c) => {
  const content = `
  <div class="page-hero">
    <div class="container">
      <div class="breadcrumb"><a href="/">Accueil</a><span class="sep">›</span>Prendre rendez-vous</div>
      <h1><i class="fas fa-calendar-check" style="margin-right:10px;"></i>Prendre un Rendez-vous</h1>
      <p>Réservez un créneau avec l'un de nos conseillers</p>
    </div>
  </div>
  <section class="section">
    <div class="container" style="max-width:700px;">
      <div class="admin-card">
        <h2 style="font-size:20px;font-weight:700;color:var(--bgfi-navy);margin-bottom:24px;"><i class="fas fa-calendar-alt" style="color:var(--bgfi-sky);margin-right:8px;"></i>Réserver mon rendez-vous</h2>
        <form onsubmit="submitRDV(event)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label>Nom *</label><input type="text" required placeholder="Votre nom"></div>
            <div class="form-group"><label>Prénom *</label><input type="text" required placeholder="Votre prénom"></div>
          </div>
          <div class="form-group"><label>Téléphone *</label><input type="tel" required placeholder="+236 ..."></div>
          <div class="form-group"><label>Email</label><input type="email" placeholder="votre@email.com"></div>
          <div class="form-group"><label>Agence *</label>
            <select><option>Agence Centrale — Bangui Centre</option><option>Agence Km5 — Bangui</option><option>Agence Bimbo</option><option>Agence Berberati</option></select>
          </div>
          <div class="form-group"><label>Motif du rendez-vous *</label>
            <select><option>Ouverture de compte</option><option>Demande de crédit</option><option>Conseil en épargne</option><option>Banque Privée / Patrimoine</option><option>Réclamation</option><option>Autre</option></select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="form-group"><label>Date souhaitée *</label><input type="date" required min="${new Date().toISOString().split('T')[0]}"></div>
            <div class="form-group"><label>Heure souhaitée *</label>
              <select><option>08h00 - 09h00</option><option>09h00 - 10h00</option><option>10h00 - 11h00</option><option>11h00 - 12h00</option><option>14h00 - 15h00</option><option>15h00 - 16h00</option><option>16h00 - 17h00</option></select>
            </div>
          </div>
          <div class="form-group"><label>Message (optionnel)</label><textarea placeholder="Précisez l'objet de votre rendez-vous..."></textarea></div>
          <button type="submit" class="btn btn-primary-sm btn-full"><i class="fas fa-calendar-check"></i> Confirmer mon rendez-vous</button>
        </form>
      </div>
    </div>
  </section>
  <script>
    function submitRDV(e) { e.preventDefault(); showToast('Rendez-vous confirmé ! Vous recevrez une confirmation par SMS.'); e.target.reset(); }
  </script>`
  return c.html(getLayout(content, 'Prendre rendez-vous', ''))
})

export default pages
