// ============================================================
// DASHBOARD ADMIN — BGFIBank Centrafrique
// Interface de gestion complète du contenu du site
// ============================================================

import { Hono } from 'hono'
import { store } from '../data/db'

const admin = new Hono()

const adminLayout = (content: string, title = 'Dashboard', activePage = '') => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Admin BGFIBank RCA</title>
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
</head>
<body>
<div id="admin-layout">
  <!-- SIDEBAR -->
  <aside id="admin-sidebar">
    <div class="admin-logo">
      <div style="width:36px;height:36px;background:var(--bgfi-sky);border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:white;flex-shrink:0;">BGFI</div>
      <div>
        <span>BGFIBank RCA</span>
        <div class="badge">Admin</div>
      </div>
    </div>
    <nav id="admin-nav">
      <div class="nav-section">Principal</div>
      <a href="/admin/dashboard" class="${activePage==='dashboard'?'active':''}"><i class="fas fa-tachometer-alt"></i> Tableau de bord</a>
      <a href="/admin/settings" class="${activePage==='settings'?'active':''}"><i class="fas fa-cog"></i> Paramètres du site</a>

      <div class="nav-section">Contenu</div>
      <a href="/admin/articles" class="${activePage==='articles'?'active':''}"><i class="fas fa-newspaper"></i> Actualités</a>
      <a href="/admin/products" class="${activePage==='products'?'active':''}"><i class="fas fa-th-large"></i> Produits & Services</a>
      <a href="/admin/testimonials" class="${activePage==='testimonials'?'active':''}"><i class="fas fa-quote-left"></i> Témoignages</a>

      <div class="nav-section">Services</div>
      <a href="/admin/agencies" class="${activePage==='agencies'?'active':''}"><i class="fas fa-map-marker-alt"></i> Agences & GAB</a>
      <a href="/admin/jobs" class="${activePage==='jobs'?'active':''}"><i class="fas fa-briefcase"></i> Offres d'emploi</a>
      <a href="/admin/preregistrations" class="${activePage==='prereg'?'active':''}"><i class="fas fa-bell"></i> Pré-inscriptions</a>

      <div class="nav-section">Compte</div>
      <a href="/admin/security" class="${activePage==='security'?'active':''}"><i class="fas fa-shield-alt"></i> Sécurité</a>
      <a href="/" target="_blank"><i class="fas fa-external-link-alt"></i> Voir le site</a>
      <a href="/admin/logout" style="color:rgba(255,100,100,0.8);"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
    </nav>
  </aside>

  <!-- CONTENU -->
  <div id="admin-content">
    <div id="admin-topbar">
      <h1>${title}</h1>
      <div class="admin-user">
        <div style="width:32px;height:32px;background:var(--bgfi-sky);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;">A</div>
        <span>Administrateur</span>
      </div>
    </div>
    <div class="admin-main">
      ${content}
    </div>
  </div>
</div>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="modal">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modal-title">Modal</h3>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body" id="modal-body"></div>
    <div class="modal-footer" id="modal-footer"></div>
  </div>
</div>
<script>
  // Auth check
  const token = localStorage.getItem('bgfi_admin_token');
  if (!token && !window.location.pathname.includes('/admin/login')) window.location.href = '/admin/login';
  
  // Toast
  function showToast(msg, type='success') {
    const t = document.getElementById('toast');
    t.innerHTML = '<i class="fas fa-'+(type==='success'?'check-circle':'exclamation-circle')+'"></i> '+msg;
    t.className = 'toast show '+type;
    setTimeout(() => t.className='toast', 3500);
  }
  // Modal
  function openModal(title, body, footer='') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = body;
    document.getElementById('modal-footer').innerHTML = footer;
    document.getElementById('modal').classList.add('open');
  }
  function closeModal() { document.getElementById('modal').classList.remove('open'); }
  document.getElementById('modal').addEventListener('click', e => { if(e.target === document.getElementById('modal')) closeModal(); });
  
  // API helper
  async function api(method, path, data=null) {
    const opts = { method, headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+token } };
    if (data) opts.body = JSON.stringify(data);
    const res = await fetch('/api'+path, opts);
    return res.json();
  }
  async function del(path) {
    if (!confirm('Confirmer la suppression ?')) return;
    const r = await api('DELETE', path);
    if (r.success) { showToast('Supprimé avec succès'); setTimeout(() => location.reload(), 800); }
    else showToast(r.error||'Erreur', 'error');
  }
  async function toggle(path, data) {
    const r = await api('PUT', path, data);
    if (r.success) { showToast('Mis à jour'); setTimeout(() => location.reload(), 800); }
    else showToast(r.error||'Erreur', 'error');
  }
</script>
</body>
</html>`

// ── LOGIN ─────────────────────────────────────────────────────
admin.get('/login', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connexion Admin — BGFIBank Centrafrique</title>
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
</head>
<body style="background:var(--bgfi-light);display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="width:100%;max-width:420px;">
    <div style="text-align:center;margin-bottom:28px;">
      <div style="width:64px;height:64px;background:var(--bgfi-navy);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><span style="color:white;font-weight:700;font-size:20px;">BGFI</span></div>
      <h1 style="font-size:22px;font-weight:700;color:var(--bgfi-navy);">BGFIBank Centrafrique</h1>
      <p style="color:var(--bgfi-text-light);font-size:14px;">Accès Administrateur</p>
    </div>
    <div class="admin-card">
      <h2 style="font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;"><i class="fas fa-lock" style="color:var(--bgfi-sky);margin-right:8px;"></i>Connexion</h2>
      <form id="loginForm" onsubmit="login(event)">
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" id="password" placeholder="Votre mot de passe" required style="font-size:16px;">
        </div>
        <div id="loginError" style="color:var(--bgfi-p5);font-size:13px;margin-bottom:12px;display:none;"><i class="fas fa-exclamation-circle" style="margin-right:4px;"></i>Mot de passe incorrect</div>
        <button type="submit" class="btn btn-primary-sm btn-full" id="loginBtn"><i class="fas fa-sign-in-alt"></i> Se connecter</button>
      </form>
      <div style="margin-top:16px;padding:12px;background:var(--bgfi-light);border-radius:4px;font-size:12px;color:var(--bgfi-text-light);">
        <i class="fas fa-info-circle" style="color:var(--bgfi-sky);margin-right:4px;"></i>
        Mot de passe par défaut : <code>bgfi@admin2024</code>
      </div>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <a href="/" style="font-size:13px;color:var(--bgfi-text-light);text-decoration:none;"><i class="fas fa-arrow-left" style="margin-right:4px;"></i>Retour au site</a>
    </div>
  </div>
  <script>
    if (localStorage.getItem('bgfi_admin_token')) window.location.href = '/admin/dashboard';
    async function login(e) {
      e.preventDefault();
      const btn = document.getElementById('loginBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...'; btn.disabled = true;
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({password}) });
        const data = await res.json();
        if (data.success) { localStorage.setItem('bgfi_admin_token', data.token); window.location.href = '/admin/dashboard'; }
        else { document.getElementById('loginError').style.display='block'; btn.innerHTML='<i class="fas fa-sign-in-alt"></i> Se connecter'; btn.disabled=false; }
      } catch { btn.innerHTML='<i class="fas fa-sign-in-alt"></i> Se connecter'; btn.disabled=false; }
    }
  </script>
</body>
</html>`)
})

admin.get('/logout', (c) => {
  return c.html(`<script>localStorage.removeItem('bgfi_admin_token');window.location.href='/admin/login';</script>`)
})

// ── DASHBOARD ─────────────────────────────────────────────────
admin.get('/dashboard', (c) => {
  const content = `
  <div class="grid-4" style="margin-bottom:28px;">
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);"><i class="fas fa-newspaper"></i></div><div><div class="stat-value" id="stat-articles">—</div><div class="stat-label">Articles publiés</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p3);"><i class="fas fa-th-large"></i></div><div><div class="stat-value" id="stat-products">—</div><div class="stat-label">Produits actifs</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p4);"><i class="fas fa-map-marker-alt"></i></div><div><div class="stat-value" id="stat-agencies">—</div><div class="stat-label">Agences & GAB</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p6);"><i class="fas fa-bell"></i></div><div><div class="stat-value" id="stat-prereg">—</div><div class="stat-label">Pré-inscriptions</div></div></div>
  </div>
  <div class="grid-2">
    <div class="admin-card">
      <h2><i class="fas fa-newspaper"></i> Derniers articles</h2>
      <div id="recent-articles">Chargement...</div>
      <a href="/admin/articles" class="btn btn-outline" style="margin-top:16px;font-size:13px;"><i class="fas fa-eye"></i> Gérer les articles</a>
    </div>
    <div class="admin-card">
      <h2><i class="fas fa-bell"></i> Dernières pré-inscriptions</h2>
      <div id="recent-prereg">Chargement...</div>
      <a href="/admin/preregistrations" class="btn btn-outline" style="margin-top:16px;font-size:13px;"><i class="fas fa-eye"></i> Voir toutes</a>
    </div>
  </div>
  <div class="admin-card" style="margin-top:24px;">
    <h2><i class="fas fa-rocket"></i> Actions rapides</h2>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <a href="/admin/articles?new=1" class="btn btn-primary-sm"><i class="fas fa-plus"></i> Nouvel article</a>
      <a href="/admin/agencies?new=1" class="btn btn-primary-sm" style="background:var(--bgfi-p3);"><i class="fas fa-map-pin"></i> Nouvelle agence</a>
      <a href="/admin/jobs?new=1" class="btn btn-primary-sm" style="background:var(--bgfi-p6);"><i class="fas fa-briefcase"></i> Nouvelle offre d'emploi</a>
      <a href="/admin/settings" class="btn btn-outline"><i class="fas fa-cog"></i> Paramètres</a>
      <a href="/" target="_blank" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> Voir le site</a>
    </div>
  </div>
  <script>
    (async () => {
      const stats = await api('GET', '/stats');
      document.getElementById('stat-articles').textContent = stats.articles?.published || 0;
      document.getElementById('stat-products').textContent = stats.products?.available || 0;
      document.getElementById('stat-agencies').textContent = stats.agencies?.total || 0;
      document.getElementById('stat-prereg').textContent = stats.preRegistrations?.total || 0;
      
      const articles = await api('GET', '/articles?all=true');
      const recent = articles.slice(0,4);
      document.getElementById('recent-articles').innerHTML = recent.map(a => 
        '<div style="padding:10px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;">' +
        '<div><div style="font-weight:600;font-size:13px;color:var(--bgfi-navy);">'+a.title.substring(0,50)+'...</div>' +
        '<div style="font-size:12px;color:var(--bgfi-text-light);">'+a.category+' · '+a.date+'</div></div>' +
        '<span class="'+(a.published?'badge-published':'badge-draft')+'">'+(a.published?'Publié':'Brouillon')+'</span>' +
        '</div>').join('') || '<p style="color:var(--bgfi-text-light);font-size:13px;">Aucun article</p>';
      
      const prereg = await api('GET', '/pre-registrations');
      document.getElementById('recent-prereg').innerHTML = prereg.slice(0,5).map(p => 
        '<div style="padding:8px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;font-size:13px;">' +
        '<span style="color:var(--bgfi-navy);">'+p.email+'</span>' +
        '<span style="background:var(--bgfi-light);padding:2px 8px;border-radius:10px;font-size:11px;">'+p.service+'</span></div>'
      ).join('') || '<p style="color:var(--bgfi-text-light);font-size:13px;">Aucune pré-inscription</p>';
    })();
  </script>`
  return c.html(adminLayout(content, 'Tableau de bord', 'dashboard'))
})

// ── SETTINGS ──────────────────────────────────────────────────
admin.get('/settings', (c) => {
  const content = `
  <div class="admin-card">
    <h2><i class="fas fa-cog"></i> Paramètres généraux du site</h2>
    <form id="settingsForm" onsubmit="saveSettings(event)">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group"><label>Nom de la banque</label><input type="text" id="siteName" required></div>
        <div class="form-group"><label>Slogan</label><input type="text" id="slogan"></div>
        <div class="form-group"><label>Téléphone</label><input type="tel" id="phone"></div>
        <div class="form-group"><label>Email de contact</label><input type="email" id="email"></div>
        <div class="form-group" style="grid-column:1/-1;"><label>Adresse</label><input type="text" id="address"></div>
      </div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-home" style="color:var(--bgfi-sky);margin-right:8px;"></i>Page d'accueil (Hero)</h3>
      <div class="form-group"><label>Titre principal (Hero)</label><input type="text" id="heroTitle"></div>
      <div class="form-group"><label>Sous-titre (Hero)</label><textarea id="heroSubtitle" style="min-height:70px;"></textarea></div>
      <div class="form-group"><label>Bouton principal</label><input type="text" id="heroCta"></div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-chart-line" style="color:var(--bgfi-sky);margin-right:8px;"></i>Tableau de bord économique</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
        <div class="form-group"><label>Taux USD/FCFA</label><input type="text" id="exchangeUSD"></div>
        <div class="form-group"><label>Taux EUR/FCFA</label><input type="text" id="exchangeEUR"></div>
        <div class="form-group"><label>Taux BEAC (%)</label><input type="text" id="beacRate"></div>
      </div>
      <div class="form-group"><label>Conseil du jour</label><textarea id="economicTip" style="min-height:70px;"></textarea></div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fab fa-facebook" style="color:var(--bgfi-sky);margin-right:8px;"></i>Réseaux sociaux</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div class="form-group"><label>Facebook</label><input type="url" id="facebook"></div>
        <div class="form-group"><label>Twitter/X</label><input type="url" id="twitter"></div>
        <div class="form-group"><label>LinkedIn</label><input type="url" id="linkedin"></div>
        <div class="form-group"><label>YouTube</label><input type="url" id="youtube"></div>
      </div>
      <button type="submit" class="btn btn-primary-sm"><i class="fas fa-save"></i> Sauvegarder les paramètres</button>
    </form>
  </div>
  <script>
    (async () => {
      const s = await api('GET', '/settings');
      ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','exchangeUSD','exchangeEUR','beacRate','economicTip','facebook','twitter','linkedin','youtube'].forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = s[k] || '';
      });
    })();
    async function saveSettings(e) {
      e.preventDefault();
      const data = {};
      ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','exchangeUSD','exchangeEUR','beacRate','economicTip','facebook','twitter','linkedin','youtube'].forEach(k => {
        const el = document.getElementById(k);
        if (el) data[k] = el.value;
      });
      const r = await api('PUT', '/settings', data);
      if (r.success) showToast('Paramètres sauvegardés !');
      else showToast(r.error||'Erreur', 'error');
    }
  </script>`
  return c.html(adminLayout(content, 'Paramètres du site', 'settings'))
})

// ── ARTICLES ──────────────────────────────────────────────────
admin.get('/articles', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les articles et actualités publiés sur le site</p>
    <button class="btn btn-primary-sm" onclick="newArticle()"><i class="fas fa-plus"></i> Nouvel article</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div id="articles-container" style="padding:16px;">Chargement...</div>
  </div>
  <script>
    async function loadArticles() {
      const arts = await api('GET', '/articles?all=true');
      const cats = ['Vie de la banque','Espace PME','Économie RCA','Conseils financiers','Événements'];
      document.getElementById('articles-container').innerHTML = arts.length === 0 ? '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucun article. Créez votre premier article !</p>' : 
      '<table class="admin-table"><thead><tr><th>Titre</th><th>Catégorie</th><th>Auteur</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      arts.map(a => '<tr><td><div style="font-weight:600;color:var(--bgfi-navy);max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+a.title+'</div></td><td>'+a.category+'</td><td>'+a.author+'</td><td>'+a.date+'</td><td><span class="'+(a.published?'badge-published':'badge-draft')+'">'+(a.published?'Publié':'Brouillon')+'</span></td><td class="action-btns"><button class="btn-edit" onclick=\'editArticle('+JSON.stringify(a).replace(/'/g,"\\'")+')\'><i class="fas fa-edit"></i></button><button class="btn-toggle" onclick="toggle(\'/articles/'+a.id+"',{published:"+!a.published+'})"><i class="fas fa-'+(a.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/articles/'+a.id+"')\"><i class=\"fas fa-trash\"></i></button></td></tr>").join('') +
      '</tbody></table>';
    }
    
    const articleFormHTML = (a={}) => '<div class="form-group"><label>Titre *</label><input type="text" id="f-title" value="'+(a.title||'')+'" required></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div class="form-group"><label>Catégorie</label><select id="f-category"><option'+(a.category==="Vie de la banque"?" selected":"")+'> Vie de la banque</option><option'+(a.category==="Espace PME"?" selected":"")+'> Espace PME</option><option'+(a.category==="Économie RCA"?" selected":"")+'> Économie RCA</option><option'+(a.category==="Conseils financiers"?" selected":"")+'> Conseils financiers</option><option'+(a.category==="Événements"?" selected":"")+'> Événements</option></select></div><div class="form-group"><label>Auteur</label><input type="text" id="f-author" value="'+(a.author||'Direction Communication')+'"></div></div><div class="form-group"><label>Date</label><input type="date" id="f-date" value="'+(a.date||new Date().toISOString().split("T")[0])+'"></div><div class="form-group"><label>Image URL</label><input type="url" id="f-image" value="'+(a.image||'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80')+'"></div><div class="form-group"><label>Résumé *</label><textarea id="f-excerpt" style="min-height:70px;" required>'+(a.excerpt||'')+'</textarea></div><div class="form-group"><label>Contenu (HTML autorisé) *</label><textarea id="f-content" style="min-height:180px;" required>'+(a.content||'')+'</textarea></div><div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="f-published" '+(a.published!==false?'checked':'')+' style="width:auto;"> Publié (visible sur le site)</label></div>';
    
    function newArticle() {
      openModal('Nouvel article', articleFormHTML(), '<button class="btn btn-primary-sm" onclick="saveArticle()"><i class="fas fa-save"></i> Publier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
    }
    function editArticle(a) {
      openModal('Modifier l\\'article', articleFormHTML(a), '<button class="btn btn-primary-sm" onclick="saveArticle('+a.id+')"><i class="fas fa-save"></i> Sauvegarder</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
    }
    async function saveArticle(id) {
      const data = {
        title: document.getElementById('f-title').value,
        category: document.getElementById('f-category').value.trim(),
        author: document.getElementById('f-author').value,
        date: document.getElementById('f-date').value,
        image: document.getElementById('f-image').value,
        excerpt: document.getElementById('f-excerpt').value,
        content: document.getElementById('f-content').value,
        published: document.getElementById('f-published').checked,
        slug: document.getElementById('f-title').value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
      };
      const r = id ? await api('PUT', '/articles/'+id, data) : await api('POST', '/articles', data);
      if (r.success || r.article) { showToast(id ? 'Article modifié !' : 'Article créé !'); closeModal(); loadArticles(); }
      else showToast(r.error||'Erreur', 'error');
    }
    loadArticles();
  </script>`
  return c.html(adminLayout(content, 'Gestion des Actualités', 'articles'))
})

// ── PRODUCTS ──────────────────────────────────────────────────
admin.get('/products', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les produits et services affichés sur le site. Activez/désactivez le badge "Bientôt disponible".</p>
  </div>
  <div id="products-container">Chargement...</div>
  <script>
    async function loadProducts() {
      const prods = await api('GET', '/products');
      const segments = ['particuliers','professionnels','entreprises','banque-privee'];
      const segLabels = {particuliers:'Particuliers',professionnels:'Professionnels',entreprises:'Entreprises & Institutions','banque-privee':'Banque Privée'};
      let html = '';
      segments.forEach(seg => {
        const sp = prods.filter(p => p.segment === seg);
        if (!sp.length) return;
        html += '<div class="admin-card" style="margin-bottom:20px;"><h2><i class="fas fa-tag"></i> '+segLabels[seg]+'</h2>' +
        '<table class="admin-table"><thead><tr><th>Produit</th><th>Description</th><th>Disponibilité</th><th>Actions</th></tr></thead><tbody>' +
        sp.map(p => '<tr><td><div style="display:flex;align-items:center;gap:8px;"><i class="fas '+p.icon+'" style="color:var(--bgfi-sky);width:20px;"></i><div><div style="font-weight:600;color:var(--bgfi-navy);">'+p.title+'</div></div></div></td><td><div style="max-width:280px;font-size:13px;color:var(--bgfi-text-light);">'+p.description.substring(0,80)+'...</div></td><td><span class="'+(p.available?'badge-published':'badge-unavail')+'">'+(p.available?'Disponible':'Bientôt disponible')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/products/'+p.id+"',{available:"+!p.available+'})" title="'+(p.available?'Marquer Bientôt disponible':'Marquer Disponible')+'"><i class="fas fa-'+(p.available?'toggle-off':'toggle-on')+'"></i> '+(p.available?'Désactiver':'Activer')+'</button><button class="btn-edit" onclick=\'editProduct('+JSON.stringify(p).replace(/'/g,"\\'")+')\' ><i class="fas fa-edit"></i></button></td></tr>').join('') +
        '</tbody></table></div>';
      });
      document.getElementById('products-container').innerHTML = html;
    }
    
    function editProduct(p) {
      const body = '<div class="form-group"><label>Titre</label><input type="text" id="fp-title" value="'+p.title+'" required></div><div class="form-group"><label>Description</label><textarea id="fp-desc" style="min-height:80px;">'+p.description+'</textarea></div><div class="form-group"><label>Fonctionnalités (une par ligne)</label><textarea id="fp-features" style="min-height:100px;">'+p.features.join("\\n")+'</textarea></div><div class="form-group"><label>Texte du bouton CTA</label><input type="text" id="fp-cta" value="'+(p.cta||'En savoir plus')+'"></div><div class="form-group"><label>URL du CTA</label><input type="text" id="fp-ctaUrl" value="'+(p.ctaUrl||'#')+'"></div><div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fp-avail" '+(p.available?'checked':'')+' style="width:auto;"> Disponible (décocher = "Bientôt disponible")</label></div>';
      openModal('Modifier : '+p.title, body, '<button class="btn btn-primary-sm" onclick="saveProduct('+p.id+')"><i class="fas fa-save"></i> Sauvegarder</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
    }
    async function saveProduct(id) {
      const data = {
        title: document.getElementById('fp-title').value,
        description: document.getElementById('fp-desc').value,
        features: document.getElementById('fp-features').value.split('\\n').filter(f=>f.trim()),
        cta: document.getElementById('fp-cta').value,
        ctaUrl: document.getElementById('fp-ctaUrl').value,
        available: document.getElementById('fp-avail').checked
      };
      const r = await api('PUT', '/products/'+id, data);
      if (r.success) { showToast('Produit modifié !'); closeModal(); loadProducts(); }
      else showToast(r.error||'Erreur', 'error');
    }
    loadProducts();
  </script>`
  return c.html(adminLayout(content, 'Produits & Services', 'products'))
})

// ── AGENCIES ──────────────────────────────────────────────────
admin.get('/agencies', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les agences et GAB affichés sur la carte interactive</p>
    <button class="btn btn-primary-sm" onclick="newAgency()"><i class="fas fa-plus"></i> Nouvelle agence/GAB</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div id="agencies-container" style="padding:16px;">Chargement...</div>
  </div>
  <script>
    async function loadAgencies() {
      const ags = await api('GET', '/agencies');
      document.getElementById('agencies-container').innerHTML = ags.length === 0 ? '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucune agence configurée.</p>' : 
      '<table class="admin-table"><thead><tr><th>Nom</th><th>Type</th><th>Adresse</th><th>Téléphone</th><th>Horaires</th><th>Coordonnées GPS</th><th>Actions</th></tr></thead><tbody>' +
      ags.map(a => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+a.name+'</td><td><span class="agency-type '+(a.type==='gab'?'gab':'')+'">'+(a.type==='agence'?'Agence':'GAB')+'</span></td><td style="font-size:13px;">'+a.address+', '+a.city+'</td><td style="font-size:13px;">'+a.phone+'</td><td style="font-size:12px;">'+a.hours+'</td><td style="font-size:12px;font-family:monospace;">'+a.lat+', '+a.lng+'</td><td class="action-btns"><button class="btn-edit" onclick=\'editAgency('+JSON.stringify(a).replace(/'/g,"\\'")+')\'><i class="fas fa-edit"></i></button><button class="btn-delete" onclick="del(\'/agencies/'+a.id+"')\"><i class=\"fas fa-trash\"></i></button></td></tr>").join('') +
      '</tbody></table>';
    }
    
    const agencyForm = (a={}) => '<div class="form-group"><label>Nom *</label><input type="text" id="fa-name" value="'+(a.name||'')+'" required placeholder="Ex: BGFIBank — Agence Centre"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div class="form-group"><label>Type *</label><select id="fa-type"><option value="agence" '+(a.type==="agence"?"selected":"")+'>Agence bancaire</option><option value="gab" '+(a.type==="gab"?"selected":"")+'>GAB (Distributeur)</option></select></div><div class="form-group"><label>Ville</label><input type="text" id="fa-city" value="'+(a.city||'Bangui')+'"></div></div><div class="form-group"><label>Adresse</label><input type="text" id="fa-address" value="'+(a.address||'')+'" placeholder="Quartier, rue..."></div><div class="form-group"><label>Téléphone</label><input type="tel" id="fa-phone" value="'+(a.phone||'')+'"></div><div class="form-group"><label>Horaires</label><input type="text" id="fa-hours" value="'+(a.hours||'Lun-Ven : 8h00-17h00')+'" placeholder="Lun-Ven : 8h00-17h00"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div class="form-group"><label>Latitude GPS *</label><input type="number" id="fa-lat" value="'+(a.lat||4.361)+'" step="0.0001" required></div><div class="form-group"><label>Longitude GPS *</label><input type="number" id="fa-lng" value="'+(a.lng||18.555)+'" step="0.0001" required></div></div><div style="background:var(--bgfi-light);padding:12px;border-radius:4px;font-size:12px;color:var(--bgfi-text-light);"><i class="fas fa-info-circle" style="color:var(--bgfi-sky);margin-right:4px;"></i>Trouvez les coordonnées GPS sur <a href="https://www.google.com/maps" target="_blank" style="color:var(--bgfi-sky);">Google Maps</a> (clic droit sur le point)</div>';
    
    function newAgency() { openModal('Nouvelle agence / GAB', agencyForm(), '<button class="btn btn-primary-sm" onclick="saveAgency()"><i class="fas fa-save"></i> Ajouter</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'); }
    function editAgency(a) { openModal('Modifier : '+a.name, agencyForm(a), '<button class="btn btn-primary-sm" onclick="saveAgency('+a.id+')"><i class="fas fa-save"></i> Modifier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'); }
    async function saveAgency(id) {
      const data = { name: document.getElementById('fa-name').value, type: document.getElementById('fa-type').value, city: document.getElementById('fa-city').value, address: document.getElementById('fa-address').value, phone: document.getElementById('fa-phone').value, hours: document.getElementById('fa-hours').value, lat: parseFloat(document.getElementById('fa-lat').value), lng: parseFloat(document.getElementById('fa-lng').value) };
      const r = id ? await api('PUT', '/agencies/'+id, data) : await api('POST', '/agencies', data);
      if (r.success || r.agency) { showToast(id ? 'Agence modifiée !' : 'Agence ajoutée !'); closeModal(); loadAgencies(); }
      else showToast(r.error||'Erreur', 'error');
    }
    loadAgencies();
  </script>`
  return c.html(adminLayout(content, 'Agences & GAB', 'agencies'))
})

// ── JOBS ──────────────────────────────────────────────────────
admin.get('/jobs', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les offres d'emploi publiées dans la section Carrières</p>
    <button class="btn btn-primary-sm" onclick="newJob()"><i class="fas fa-plus"></i> Nouvelle offre</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div id="jobs-container" style="padding:16px;">Chargement...</div>
  </div>
  <script>
    async function loadJobs() {
      const jobs = await api('GET', '/jobs?all=true');
      document.getElementById('jobs-container').innerHTML = jobs.length === 0 ? '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucune offre d\\'emploi. Créez votre première offre !</p>' : 
      '<table class="admin-table"><thead><tr><th>Poste</th><th>Département</th><th>Type</th><th>Lieu</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      jobs.map(j => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+j.title+'</td><td>'+j.department+'</td><td><span style="background:var(--bgfi-sky);color:white;padding:2px 8px;border-radius:10px;font-size:11px;">'+j.type+'</span></td><td>'+j.location+'</td><td>'+j.date+'</td><td><span class="'+(j.published?'badge-published':'badge-draft')+'">'+(j.published?'Publié':'Archivé')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/jobs/'+j.id+"',{published:"+!j.published+'})"><i class="fas fa-'+(j.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/jobs/'+j.id+"')\"><i class=\"fas fa-trash\"></i></button></td></tr>").join('') +
      '</tbody></table>';
    }
    function newJob() {
      const body = '<div class="form-group"><label>Titre du poste *</label><input type="text" id="fj-title" required></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div class="form-group"><label>Département</label><input type="text" id="fj-dept" placeholder="Ex: Commerce & Relation Client"></div><div class="form-group"><label>Type de contrat</label><select id="fj-type"><option>CDI</option><option>CDD</option><option>Stage</option></select></div></div><div class="form-group"><label>Lieu</label><input type="text" id="fj-loc" value="Bangui"></div><div class="form-group"><label>Description *</label><textarea id="fj-desc" required style="min-height:100px;"></textarea></div><div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fj-pub" checked style="width:auto;"> Publier immédiatement</label></div>';
      openModal('Nouvelle offre d\\'emploi', body, '<button class="btn btn-primary-sm" onclick="saveJob()"><i class="fas fa-save"></i> Publier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
    }
    async function saveJob() {
      const data = { title: document.getElementById('fj-title').value, department: document.getElementById('fj-dept').value, type: document.getElementById('fj-type').value, location: document.getElementById('fj-loc').value, description: document.getElementById('fj-desc').value, published: document.getElementById('fj-pub').checked };
      const r = await api('POST', '/jobs', data);
      if (r.success || r.job) { showToast('Offre publiée !'); closeModal(); loadJobs(); }
      else showToast(r.error||'Erreur', 'error');
    }
    loadJobs();
  </script>`
  return c.html(adminLayout(content, 'Offres d\'emploi', 'jobs'))
})

// ── TESTIMONIALS ──────────────────────────────────────────────
admin.get('/testimonials', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les témoignages clients affichés sur la page d'accueil</p>
    <button class="btn btn-primary-sm" onclick="newTestimonial()"><i class="fas fa-plus"></i> Nouveau témoignage</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div id="testimonials-container" style="padding:16px;">Chargement...</div>
  </div>
  <script>
    async function loadTestimonials() {
      const items = await api('GET', '/testimonials?all=true');
      document.getElementById('testimonials-container').innerHTML = items.length === 0 ? '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucun témoignage</p>' :
      '<table class="admin-table"><thead><tr><th>Client</th><th>Rôle</th><th>Témoignage</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      items.map(t => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+t.name+'</td><td>'+t.role+'</td><td style="font-size:13px;max-width:300px;">'+t.content.substring(0,80)+'...</td><td><span class="'+(t.published?'badge-published':'badge-draft')+'">'+(t.published?'Publié':'Masqué')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/testimonials/'+t.id+"',{published:"+!t.published+'})"><i class="fas fa-'+(t.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/testimonials/'+t.id+"')\"><i class=\"fas fa-trash\"></i></button></td></tr>').join('') +
      '</tbody></table>';
    }
    function newTestimonial() {
      const body = '<div class="form-group"><label>Nom du client *</label><input type="text" id="ft-name" required></div><div class="form-group"><label>Rôle / Activité</label><input type="text" id="ft-role" placeholder="Ex: Entrepreneur, Bangui"></div><div class="form-group"><label>Initiales (avatar)</label><input type="text" id="ft-avatar" placeholder="Ex: JK" maxlength="3"></div><div class="form-group"><label>Témoignage *</label><textarea id="ft-content" required style="min-height:100px;"></textarea></div><div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="ft-pub" checked style="width:auto;"> Publier immédiatement</label></div>';
      openModal('Nouveau témoignage', body, '<button class="btn btn-primary-sm" onclick="saveTestimonial()"><i class="fas fa-save"></i> Ajouter</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
    }
    async function saveTestimonial() {
      const data = { name: document.getElementById('ft-name').value, role: document.getElementById('ft-role').value, avatar: document.getElementById('ft-avatar').value, content: document.getElementById('ft-content').value, published: document.getElementById('ft-pub').checked };
      const r = await api('POST', '/testimonials', data);
      if (r.success) { showToast('Témoignage ajouté !'); closeModal(); loadTestimonials(); }
      else showToast(r.error||'Erreur', 'error');
    }
    loadTestimonials();
  </script>`
  return c.html(adminLayout(content, 'Témoignages Clients', 'testimonials'))
})

// ── PRE-REGISTRATIONS ─────────────────────────────────────────
admin.get('/preregistrations', (c) => {
  const content = `
  <div style="margin-bottom:20px;"><p style="color:var(--bgfi-text-light);font-size:14px;">Liste des emails collectés via les formulaires "Bientôt disponible" et la newsletter</p></div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div id="prereg-container" style="padding:16px;">Chargement...</div>
  </div>
  <script>
    async function loadPreReg() {
      const items = await api('GET', '/pre-registrations');
      if (!items.length) { document.getElementById('prereg-container').innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucune pré-inscription pour le moment.</p>'; return; }
      const byService = {};
      items.forEach(i => { if(!byService[i.service]) byService[i.service]=[]; byService[i.service].push(i); });
      let html = '<div class="grid-4" style="margin-bottom:24px;">' +
        Object.entries(byService).map(([s,arr]) => '<div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);font-size:16px;"><i class="fas fa-bell"></i></div><div><div class="stat-value">'+arr.length+'</div><div class="stat-label">'+s+'</div></div></div>').join('') +
        '</div><table class="admin-table"><thead><tr><th>Email</th><th>Service</th><th>Date d\\'inscription</th></tr></thead><tbody>' +
        items.map(i => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+i.email+'</td><td><span style="background:var(--bgfi-light);padding:3px 10px;border-radius:10px;font-size:12px;">'+i.service+'</span></td><td style="font-size:13px;">'+new Date(i.date).toLocaleString("fr-FR")+'</td></tr>').join('') +
        '</tbody></table>';
      document.getElementById('prereg-container').innerHTML = html;
    }
    loadPreReg();
  </script>`
  return c.html(adminLayout(content, 'Pré-inscriptions', 'prereg'))
})

// ── SECURITY ─────────────────────────────────────────────────
admin.get('/security', (c) => {
  const content = `
  <div class="admin-card">
    <h2><i class="fas fa-shield-alt"></i> Changer le mot de passe administrateur</h2>
    <form onsubmit="changePassword(event)" style="max-width:400px;">
      <div class="form-group"><label>Mot de passe actuel *</label><input type="password" id="currentPwd" required></div>
      <div class="form-group"><label>Nouveau mot de passe *</label><input type="password" id="newPwd" required minlength="8"></div>
      <div class="form-group"><label>Confirmer le nouveau mot de passe *</label><input type="password" id="confirmPwd" required></div>
      <button type="submit" class="btn btn-primary-sm"><i class="fas fa-key"></i> Changer le mot de passe</button>
    </form>
  </div>
  <script>
    async function changePassword(e) {
      e.preventDefault();
      const current = document.getElementById('currentPwd').value;
      const newPwd = document.getElementById('newPwd').value;
      const confirm = document.getElementById('confirmPwd').value;
      if (newPwd !== confirm) { showToast('Les mots de passe ne correspondent pas', 'error'); return; }
      if (current !== token) { showToast('Mot de passe actuel incorrect', 'error'); return; }
      const r = await api('POST', '/change-password', { newPassword: newPwd });
      if (r.success) { localStorage.setItem('bgfi_admin_token', r.newToken); showToast('Mot de passe modifié avec succès !'); e.target.reset(); }
      else showToast(r.error||'Erreur', 'error');
    }
  </script>`
  return c.html(adminLayout(content, 'Sécurité', 'security'))
})

export default admin
