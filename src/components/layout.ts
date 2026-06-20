// ============================================================
// LAYOUT COMMUN — Header, Nav, Footer
// BGFIBank Centrafrique
// ============================================================

export const getLayout = (content: string, title = 'BGFIBank Centrafrique', activePage = '', s: any = {}) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — BGFIBank Centrafrique</title>
  <meta name="description" content="BGFIBank Centrafrique - Votre partenaire bancaire de confiance en République Centrafricaine. Comptes, épargne, crédits et solutions digitales.">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/static/images/bgfibank-logo.png">
  <!-- Charte BGFIBank -->
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <!-- Leaflet (OpenStreetMap) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <!-- Deep link global BGFIMobile -->
  <script>
  function openBGFIMobile() {
    var playStore = 'https://play.google.com/store/apps/details?id=com.bfi.rca.gabon&hl=fr';
    var isAndroid = /android/i.test(navigator.userAgent);
    if (isAndroid) {
      var intent = 'intent://launch/#Intent;scheme=bgfimobile;package=com.bfi.rca.gabon;S.browser_fallback_url=' + encodeURIComponent(playStore) + ';end';
      window.location.href = intent;
    } else {
      window.open(playStore, '_blank');
    }
  }
  </script>
</head>
<body>

  <!-- ── LOADER ── -->
  <div id="page-loader">
    <div class="loader-inner">
      <img src="/static/images/bgfibank-logo.png" alt="BGFIBank" class="loader-logo">
      <div class="loader-bar"><div class="loader-progress"></div></div>
    </div>
  </div>

  <!-- ── BOUTON RETOUR EN HAUT ── -->
  <button id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Retour en haut">
    <i class="fas fa-chevron-up"></i>
  </button>

  <!-- ── DRAWER MOBILE ── -->
  <div id="nav-drawer-overlay" onclick="closeDrawer()"></div>
  <div id="nav-drawer">
    <div class="drawer-header">
      <img src="/static/images/bgfibank-logo.png" alt="BGFIBank">
      <button class="drawer-close" onclick="closeDrawer()" aria-label="Fermer">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <nav class="drawer-nav">
      <span class="drawer-section-title">Navigation</span>
      <a href="/" class="${activePage === '' ? 'active' : ''}"><i class="fas fa-home"></i> Accueil</a>
      <a href="/particuliers" class="${activePage === 'particuliers' ? 'active' : ''}"><i class="fas fa-user"></i> Particuliers</a>
      <a href="/professionnels" class="${activePage === 'professionnels' ? 'active' : ''}"><i class="fas fa-briefcase"></i> Professionnels</a>
      <a href="/entreprises" class="${activePage === 'entreprises' ? 'active' : ''}"><i class="fas fa-industry"></i> Entreprises</a>
      <a href="/banque-privee" class="${activePage === 'banque-privee' ? 'active' : ''}"><i class="fas fa-gem"></i> Banque Privée</a>
      <a href="/espace-pme" class="${activePage === 'espace-pme' ? 'active' : ''}"><i class="fas fa-store"></i> Espace PME</a>
      <span class="drawer-section-title">Informations</span>
      <a href="/bgfibank-rca" class="${activePage === 'bgfibank-rca' ? 'active' : ''}"><i class="fas fa-globe-africa"></i> BGFIBank &amp; la RCA</a>
      <a href="/actualites" class="${activePage === 'actualites' ? 'active' : ''}"><i class="fas fa-newspaper"></i> Actualités</a>
      <a href="/simulateurs" class="${activePage === 'simulateurs' ? 'active' : ''}"><i class="fas fa-calculator"></i> Simulateurs</a>
      <a href="/agences"><i class="fas fa-map-marker-alt"></i> Nos Agences</a>
      <a href="/contact"><i class="fas fa-envelope"></i> Contact</a>
    </nav>
    <div class="drawer-footer">
      <a href="https://www5.bgfionline.com/" target="_blank" class="drawer-btn-client">
        <i class="fas fa-user-plus"></i> Devenir client
      </a>
      <a href="https://www5.bgfionline.com/" target="_blank" class="drawer-btn-online">
        <i class="fas fa-lock"></i> BGFIOnline
      </a>
    </div>
  </div>

  <!-- ── TOP BAR ── -->
  <div id="top-bar">
    <div class="container">
      <div style="display:flex;align-items:center;gap:20px;">
        <span><i class="fas fa-phone" style="margin-right:6px;"></i>${s.phone || '00236 72 80 98 08 / 75 65 54 65'}</span>
        <span><i class="fas fa-map-marker-alt" style="margin-right:6px;"></i>${s.address || 'Bangui, République Centrafricaine'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:16px;">
        <div class="lang-switcher">
          <a href="#" class="active">FR</a>
          <a href="#">EN</a>
        </div>
        <a href="/agences"><i class="fas fa-map-marker-alt"></i> Nos agences</a>
        <a href="/contact"><i class="fas fa-envelope"></i> Contact</a>
      </div>
    </div>
  </div>

  <!-- ── HEADER ── -->
  <header id="header">
    <div class="container">
      <a href="/" class="logo">
        <img src="/static/images/bgfibank-logo.png" alt="BGFIBank Centrafrique" class="logo-img">
      </a>
      <div class="header-actions">
        <a href="https://www5.bgfionline.com/" target="_blank" class="btn-client">
          <i class="fas fa-user-plus"></i> Devenir client
        </a>
        <a href="https://www5.bgfionline.com/" target="_blank" class="btn-online">
          <i class="fas fa-lock"></i> BGFIOnline
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu" onclick="openDrawer()">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- ── NAV PRINCIPALE ── -->
  <nav id="main-nav">
    <div class="container">
      <ul>
        <li>
          <a href="/particuliers" class="${activePage === 'particuliers' ? 'active' : ''}">
            <i class="fas fa-user"></i> Particuliers <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/particuliers#tab-comptes"><i class="fas fa-university"></i> Comptes bancaires</a>
            <a href="/particuliers#tab-epargne"><i class="fas fa-piggy-bank"></i> Épargne & Placements</a>
            <a href="/particuliers#tab-credits"><i class="fas fa-hand-holding-usd"></i> Crédits</a>
            <a href="/particuliers#tab-cartes"><i class="fas fa-credit-card"></i> Cartes & Paiements</a>
            <a href="/particuliers#tab-digital"><i class="fas fa-laptop"></i> Banque Digitale</a>
            <a href="/particuliers#tab-transferts"><i class="fas fa-exchange-alt"></i> Transferts d'argent</a>
          </div>
        </li>
        <li>
          <a href="/professionnels" class="${activePage === 'professionnels' ? 'active' : ''}">
            <i class="fas fa-briefcase"></i> Professionnels <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/professionnels#tab-compte"><i class="fas fa-building"></i> Compte professionnel</a>
            <a href="/professionnels#tab-credits-pro"><i class="fas fa-tools"></i> Crédits & Financement</a>
            <a href="/professionnels#tab-digital-pro"><i class="fas fa-laptop"></i> Banque Digitale</a>
          </div>
        </li>
        <li>
          <a href="/entreprises" class="${activePage === 'entreprises' ? 'active' : ''}">
            <i class="fas fa-industry"></i> Entreprises <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/entreprises#tab-compte-ent"><i class="fas fa-building"></i> Compte Société</a>
            <a href="/entreprises#tab-financement-ent"><i class="fas fa-chart-bar"></i> Financement & Épargne</a>
            <a href="/entreprises#tab-international"><i class="fas fa-ship"></i> Commerce International</a>
          </div>
        </li>
        <li>
          <a href="/banque-privee" class="${activePage === 'banque-privee' ? 'active' : ''}">
            <i class="fas fa-gem"></i> Banque Privée <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/banque-privee#tab-compte-prive"><i class="fas fa-crown"></i> Compte Premium</a>
            <a href="/banque-privee#tab-patrimoine"><i class="fas fa-gem"></i> Gestion de Patrimoine</a>
            <a href="/banque-privee#tab-placements"><i class="fas fa-file-invoice-dollar"></i> Placements</a>
          </div>
        </li>
        <li>
          <a href="/bgfibank-rca" class="${activePage === 'bgfibank-rca' ? 'active' : ''}">
            <i class="fas fa-globe-africa"></i> BGFIBank & la RCA <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/bgfibank-rca#histoire"><i class="fas fa-history"></i> Notre histoire</a>
            <a href="/bgfibank-rca#impact"><i class="fas fa-hands-helping"></i> Impact local</a>
            <a href="/bgfibank-rca#rse"><i class="fas fa-leaf"></i> Engagements RSE</a>
          </div>
        </li>
        <li>
          <a href="/espace-pme" class="${activePage === 'espace-pme' ? 'active' : ''}">
            <i class="fas fa-store"></i> Espace PME
          </a>
        </li>
        <li>
          <a href="/actualites" class="${activePage === 'actualites' ? 'active' : ''}">
            <i class="fas fa-newspaper"></i> Actualités
          </a>
        </li>
        <li>
          <a href="/simulateurs" class="${activePage === 'simulateurs' ? 'active' : ''}">
            <i class="fas fa-calculator"></i> Simulateurs
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- ── CONTENU PRINCIPAL ── -->
  <main id="main-content">
    ${content}
  </main>

  <!-- ── NEWSLETTER ── -->
  <section id="newsletter-section">
    <div class="container">
      <div class="newsletter-grid">
        <div>
          <h2><i class="fas fa-envelope-open-text" style="margin-right:10px;"></i>Restez informé</h2>
          <p>Recevez nos dernières actualités, offres et conseils financiers directement dans votre boîte mail.</p>
          <form class="newsletter-form" id="newsletterForm" onsubmit="subscribeNewsletter(event)">
            <input type="email" placeholder="Votre adresse email" required id="newsletterEmail">
            <button type="submit"><i class="fas fa-paper-plane"></i> S'abonner</button>
          </form>
          <p style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:10px;">
            <i class="fas fa-shield-alt" style="margin-right:4px;"></i>
            Vos données sont protégées conformément au RGPD.
          </p>
        </div>
        <div class="newsletter-apps">
          <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:6px;">
            <i class="fab fa-google-play" style="font-size:24px;color:white;flex-shrink:0;"></i>
            <div style="text-align:left;flex:1;min-width:0;">
              <div style="font-weight:700;color:white;font-size:14px;">BGFIMobile</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.7);">Application mobile banking</div>
            </div>
            <button onclick="openBGFIMobile()" style="background:white;color:#003a74;font-size:10px;padding:3px 8px;border-radius:10px;font-weight:700;border:none;cursor:pointer;white-space:nowrap;flex-shrink:0;">Télécharger</button>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:6px;">
            <i class="fas fa-laptop" style="font-size:24px;color:white;flex-shrink:0;"></i>
            <div style="text-align:left;flex:1;min-width:0;">
              <div style="font-weight:700;color:white;font-size:14px;">BGFIOnline</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.7);">Banque en ligne 24h/24</div>
            </div>
            <a href="https://www5.bgfionline.com/" target="_blank" style="background:white;color:#003a74;font-size:10px;padding:3px 8px;border-radius:10px;font-weight:700;text-decoration:none;white-space:nowrap;flex-shrink:0;">Accéder</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Wave entre newsletter et footer -->
  <div class="wave-divider" style="background:linear-gradient(135deg,var(--bgfi-sky),var(--bgfi-teal));">
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0d1b2e"/>
    </svg>
  </div>

  <!-- ── FOOTER ── -->
  <footer id="footer">
    <div id="footer-accent"></div>
    <div class="footer-inner">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            <img src="/static/images/bgfibank-logo.png" alt="BGFIBank Centrafrique" class="footer-logo-img">
            <p style="margin-top:12px;">Filiale du Groupe BGFIBank, nous accompagnons particuliers, professionnels et entreprises dans leur développement financier en République Centrafricaine.</p>
          </div>
          <div class="footer-social">
            <a href="${s.facebook || '#'}" title="Facebook" ${s.facebook ? 'target="_blank"' : ''}><i class="fab fa-facebook-f"></i></a>
            <a href="${s.twitter || '#'}" title="Twitter/X" ${s.twitter ? 'target="_blank"' : ''}><i class="fab fa-twitter"></i></a>
            <a href="${s.linkedin || '#'}" title="LinkedIn" ${s.linkedin ? 'target="_blank"' : ''}><i class="fab fa-linkedin-in"></i></a>
            <a href="${s.youtube || '#'}" title="YouTube" ${s.youtube ? 'target="_blank"' : ''}><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Nos Services</h4>
          <ul>
            <li><a href="/particuliers">Particuliers</a></li>
            <li><a href="/professionnels">Professionnels</a></li>
            <li><a href="/entreprises">Entreprises</a></li>
            <li><a href="/banque-privee">Banque Privée</a></li>
            <li><a href="/espace-pme">Espace PME</a></li>
            <li><a href="/simulateurs">Simulateurs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>BGFIBank</h4>
          <ul>
            <li><a href="/bgfibank-rca">BGFIBank & la RCA</a></li>
            <li><a href="/actualites">Actualités</a></li>
            <li><a href="/carrieres">Carrières</a></li>
            <li><a href="/presse">Espace Presse</a></li>
            <li><a href="/agences">Nos Agences</a></li>
            <li><a href="https://groupebgfibank.com" target="_blank">Groupe BGFIBank</a></li>
          </ul>
        </div>
        <div class="footer-col footer-contact">
          <h4>Nous Contacter</h4>
          <p><i class="fas fa-map-marker-alt"></i> ${s.address || 'Avenue des Martyrs, Bangui, RCA'}</p>
          <p><i class="fas fa-phone"></i> ${s.phone || '00236 72 80 98 08 / 75 65 54 65'}</p>
          <p><i class="fas fa-envelope"></i> ${s.email || 'f.koba@bgfi.com'}</p>
          <p><i class="fas fa-clock"></i> Lun-Ven : 8h00 - 17h00</p>
          <div style="margin-top:16px;">
            <a href="/contact" class="btn btn-outline" style="font-size:12px;padding:8px 16px;color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.3);">
              <i class="fas fa-envelope"></i> Nous écrire
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 BGFIBank Centrafrique — Tous droits réservés | Agréée par la COBAC</p>
        <div class="footer-links">
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/confidentialite">Confidentialité</a>
          <a href="/cookies">Cookies</a>
          <a href="/securite">Sécurité</a>
        </div>
      </div>
    </div>
    </div>
  </footer>

  <!-- ── TOAST ── -->
  <div class="toast" id="toast"></div>

  <!-- ── SCRIPTS GLOBAUX ── -->
  <script>
    // Drawer mobile
    function openDrawer() {
      document.getElementById('nav-drawer').classList.add('open');
      document.getElementById('nav-drawer-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      document.getElementById('nav-drawer').classList.remove('open');
      document.getElementById('nav-drawer-overlay').classList.remove('open');
      document.body.style.overflow = '';
    }
    // Fermer avec Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Toast
    function showToast(msg, type = 'success') {
      const t = document.getElementById('toast');
      t.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + msg;
      t.className = 'toast show ' + type;
      setTimeout(() => t.className = 'toast', 3500);
    }

    // Newsletter
    async function subscribeNewsletter(e) {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      try {
        const res = await fetch('/api/newsletter', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email}) });
        const data = await res.json();
        if (data.success) { showToast('Inscription confirmée ! Merci.'); e.target.reset(); }
        else showToast(data.error || 'Erreur', 'error');
      } catch { showToast('Erreur de connexion', 'error'); }
    }

    // Pré-inscription "Bientôt disponible"
    async function preRegister(e, service) {
      e.preventDefault();
      const form = e.target;
      const email = form.querySelector('input[type="email"]').value;
      try {
        const res = await fetch('/api/pre-register', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email, service}) });
        const data = await res.json();
        if (data.success) { showToast('Vous serez notifié au lancement de ' + service + ' !'); form.reset(); }
        else showToast(data.error || 'Erreur', 'error');
      } catch { showToast('Erreur de connexion', 'error'); }
    }
  </script>

  <!-- ── LOADER + BACK TO TOP + REVEAL ── -->
  <script>
  // 1. LOADER — masquer après chargement
  window.addEventListener('load', function() {
    var loader = document.getElementById('page-loader');
    if (loader) {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 1500);
    }
  });

  // 2. BOUTON RETOUR EN HAUT + HEADER SHRINK
  var backToTop = document.getElementById('back-to-top');
  var header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    // Back to top
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    // Header shrink
    if (window.scrollY > 80) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  }, { passive: true });

  // 2b. RIPPLE sur boutons .btn-ripple
  document.querySelectorAll('.btn-ripple, .btn-primary-sm, .btn-primary, #hero .btn-primary, #hero .btn-secondary').forEach(function(btn) {
    btn.classList.add('btn-ripple');
    btn.addEventListener('click', function(e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 2;
      var ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size/2) + 'px;top:' + (e.clientY - rect.top - size/2) + 'px;';
      btn.appendChild(ripple);
      setTimeout(function() { ripple.remove(); }, 600);
    });
  });

  // 2c. COMPTEURS ANIMÉS sur .stat-number[data-count]
  function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    var raw = el.dataset.count || el.textContent;
    var suffix = raw.replace(/[0-9]/g, '').trim();
    var prefix = '';
    var numStr = raw.replace(/[^0-9]/g, '');
    if (!numStr) { return; } // valeur non numérique (ex: "24h")
    var target = parseInt(numStr, 10);
    var duration = 1800;
    var start = null;
    // stocker la valeur finale complète
    var finalDisplay = el.dataset.display || raw;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var val = Math.floor(ease * target);
      el.textContent = prefix + val + suffix;
      if (progress < 1) { requestAnimationFrame(step); }
      else { el.textContent = finalDisplay; }
    }
    requestAnimationFrame(step);
  }

  // Observer pour déclencher les compteurs quand visibles
  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(function(el) {
    // Stocker la valeur affichée comme data-display et data-count
    var txt = el.textContent.trim();
    if (!el.dataset.display) el.dataset.display = txt;
    if (!el.dataset.count) el.dataset.count = txt;
    counterObserver.observe(el);
  });

  // 3. REVEAL AU SCROLL — IntersectionObserver
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
    revealObserver.observe(el);
  });
  </script>
</body>
</html>`;
