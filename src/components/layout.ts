// ============================================================
// LAYOUT COMMUN — Header, Nav, Footer
// BGFIBank Centrafrique
// ============================================================

export const getLayout = (content: string, title = 'BGFIBank Centrafrique', activePage = '') => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — BGFIBank Centrafrique</title>
  <meta name="description" content="BGFIBank Centrafrique - Votre partenaire bancaire de confiance en République Centrafricaine. Comptes, épargne, crédits et solutions digitales.">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%23003a74'/><text y='.9em' font-size='65' font-family='Arial' font-weight='bold' fill='white' x='50%' text-anchor='middle' dominant-baseline='auto' dy='0.75em'>B</text></svg>">
  <!-- Charte BGFIBank -->
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <!-- Leaflet (OpenStreetMap) -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>

  <!-- ── TOP BAR ── -->
  <div id="top-bar">
    <div class="container">
      <div style="display:flex;align-items:center;gap:20px;">
        <span><i class="fas fa-phone" style="margin-right:6px;"></i>+236 75 00 00 00</span>
        <span><i class="fas fa-map-marker-alt" style="margin-right:6px;"></i>Bangui, République Centrafricaine</span>
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
        <div class="logo-icon"><span>BGFI</span></div>
        <div class="logo-text">
          <span class="bank-name">BGFIBank</span>
          <span class="bank-country">Centrafrique</span>
        </div>
      </a>
      <div class="header-actions">
        <a href="https://leclient.bgfi.com" target="_blank" class="btn-client">
          <i class="fas fa-user-plus"></i> Devenir client
        </a>
        <a href="https://online.bgfi.com" target="_blank" class="btn-online">
          <i class="fas fa-lock"></i> BGFIOnline
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu">
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
            <a href="/particuliers#comptes"><i class="fas fa-university"></i> Comptes bancaires</a>
            <a href="/particuliers#epargne"><i class="fas fa-piggy-bank"></i> Épargne & DAT</a>
            <a href="/particuliers#credits"><i class="fas fa-hand-holding-usd"></i> Crédits</a>
            <a href="/particuliers#cartes"><i class="fas fa-credit-card"></i> Cartes & Paiements</a>
            <a href="/particuliers#transferts"><i class="fas fa-exchange-alt"></i> Transferts d'argent</a>
            <a href="/particuliers#digital"><i class="fas fa-mobile-alt"></i> Services Digitaux</a>
          </div>
        </li>
        <li>
          <a href="/professionnels" class="${activePage === 'professionnels' ? 'active' : ''}">
            <i class="fas fa-briefcase"></i> Professionnels <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/professionnels#comptes"><i class="fas fa-building"></i> Compte professionnel</a>
            <a href="/professionnels#credits"><i class="fas fa-tools"></i> Crédits professionnels</a>
            <a href="/professionnels#tpe"><i class="fas fa-cash-register"></i> Terminal de paiement</a>
          </div>
        </li>
        <li>
          <a href="/entreprises" class="${activePage === 'entreprises' ? 'active' : ''}">
            <i class="fas fa-industry"></i> Entreprises <i class="fas fa-chevron-down chevron"></i>
          </a>
          <div class="dropdown-menu">
            <a href="/entreprises#cash"><i class="fas fa-coins"></i> Cash Management</a>
            <a href="/entreprises#financement"><i class="fas fa-chart-bar"></i> Financements</a>
            <a href="/entreprises#trade"><i class="fas fa-ship"></i> Trade Finance</a>
          </div>
        </li>
        <li>
          <a href="/banque-privee" class="${activePage === 'banque-privee' ? 'active' : ''}">
            <i class="fas fa-gem"></i> Banque Privée
          </a>
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
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;">
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
        <div style="text-align:right;">
          <div style="display:inline-flex;flex-direction:column;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:6px;">
              <i class="fas fa-mobile-alt" style="font-size:24px;color:white;"></i>
              <div style="text-align:left;">
                <div style="font-weight:700;color:white;font-size:14px;">BGFIMobile</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.7);">Application mobile banking</div>
              </div>
              <span style="background:rgba(255,255,255,0.2);color:white;font-size:10px;padding:3px 8px;border-radius:10px;font-weight:700;">Bientôt</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:6px;">
              <i class="fas fa-laptop" style="font-size:24px;color:white;"></i>
              <div style="text-align:left;">
                <div style="font-weight:700;color:white;font-size:14px;">BGFIOnline</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.7);">Banque en ligne 24h/24</div>
              </div>
              <a href="https://online.bgfi.com" target="_blank" style="background:white;color:#003a74;font-size:10px;padding:3px 8px;border-radius:10px;font-weight:700;text-decoration:none;">Accéder</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── FOOTER ── -->
  <footer id="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-bgfi-logo"><span>BGFI</span></div>
          <div class="footer-brand">
            <div class="bank-name">BGFIBank Centrafrique</div>
            <div class="slogan">Votre partenaire pour l'avenir</div>
            <p>Filiale du Groupe BGFIBank, nous accompagnons particuliers, professionnels et entreprises dans leur développement financier en République Centrafricaine.</p>
          </div>
          <div class="footer-social">
            <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" title="Twitter/X"><i class="fab fa-twitter"></i></a>
            <a href="#" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
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
          <p><i class="fas fa-map-marker-alt"></i> Avenue des Martyrs, Bangui, RCA</p>
          <p><i class="fas fa-phone"></i> +236 75 00 00 00</p>
          <p><i class="fas fa-envelope"></i> contact@bgfibank-rca.com</p>
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
  </footer>

  <!-- ── TOAST ── -->
  <div class="toast" id="toast"></div>

  <!-- ── SCRIPTS GLOBAUX ── -->
  <script>
    // Menu mobile
    document.getElementById('menuToggle').addEventListener('click', () => {
      document.getElementById('main-nav').classList.toggle('open');
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
</body>
</html>`;
