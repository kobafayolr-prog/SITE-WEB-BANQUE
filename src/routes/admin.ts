// ============================================================
// ADMIN ROUTES — BGFIBank Centrafrique
// Interface d'administration complète
// ============================================================

import { Hono } from 'hono'

const admin = new Hono()

// ── LAYOUT COMMUN ─────────────────────────────────────────────
const adminLayout = (content: string, title = 'Dashboard', activePage = '') => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Admin BGFIBank RCA</title>
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <style>
    /* ── ADMIN LAYOUT ── */
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bgfi-light);font-family:'Source Sans 3',sans-serif;color:var(--bgfi-text);}
    #admin-layout{display:flex;min-height:100vh;}

    /* SIDEBAR */
    #admin-sidebar{width:240px;background:var(--bgfi-navy);color:white;display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;height:100vh;overflow-y:auto;z-index:200;transition:transform .3s;}
    .admin-logo{display:flex;align-items:center;gap:10px;padding:20px 16px;border-bottom:1px solid rgba(255,255,255,0.1);}
    .admin-logo span{font-weight:700;font-size:14px;color:white;}
    .admin-logo .badge{font-size:10px;background:var(--bgfi-sky);padding:1px 6px;border-radius:10px;color:white;font-weight:600;}
    #admin-nav{padding:12px 0;flex:1;}
    #admin-nav .nav-section{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.4);padding:14px 16px 6px;font-weight:700;}
    #admin-nav a{display:flex;align-items:center;gap:10px;padding:10px 16px;color:rgba(255,255,255,0.75);text-decoration:none;font-size:13px;transition:all .2s;border-radius:0;}
    #admin-nav a:hover,#admin-nav a.active{background:rgba(255,255,255,0.1);color:white;}
    #admin-nav a.active{border-left:3px solid var(--bgfi-sky);}
    #admin-nav a i{width:18px;text-align:center;font-size:14px;}

    /* TOPBAR */
    #admin-topbar{position:sticky;top:0;z-index:100;background:white;border-bottom:1px solid var(--bgfi-border);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
    #admin-topbar h1{font-size:18px;font-weight:700;color:var(--bgfi-navy);}
    .admin-user{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bgfi-text-light);}

    /* HAMBURGER (mobile) */
    #menu-toggle{display:none;background:none;border:none;font-size:22px;color:var(--bgfi-navy);cursor:pointer;padding:4px 8px;}
    #sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:199;}

    /* MAIN CONTENT */
    #admin-content{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column;}
    .admin-main{padding:24px;flex:1;}

    /* CARDS & TABLES */
    .admin-card{background:white;border-radius:8px;padding:24px;border:1px solid var(--bgfi-border);margin-bottom:20px;}
    .admin-card h2{font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;display:flex;align-items:center;gap:8px;}
    .admin-card h2 i{color:var(--bgfi-sky);}

    .admin-table{width:100%;border-collapse:collapse;font-size:13px;}
    .admin-table thead tr{background:var(--bgfi-light);}
    .admin-table th{padding:10px 12px;text-align:left;font-weight:700;color:var(--bgfi-navy);font-size:12px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;}
    .admin-table td{padding:12px;border-bottom:1px solid var(--bgfi-border);vertical-align:middle;}
    .admin-table tr:last-child td{border-bottom:none;}
    .admin-table tr:hover td{background:#fafbfc;}

    /* Responsive table wrapper */
    .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:8px;}

    /* GRID */
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;}
    .stat-card{background:white;border-radius:8px;padding:16px;border:1px solid var(--bgfi-border);display:flex;align-items:center;gap:14px;}
    .stat-icon{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;flex-shrink:0;}
    .stat-value{font-size:24px;font-weight:700;color:var(--bgfi-navy);}
    .stat-label{font-size:12px;color:var(--bgfi-text-light);}

    /* FORMS */
    .form-group{margin-bottom:16px;}
    .form-group label{display:block;font-size:12px;font-weight:700;color:var(--bgfi-navy);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
    .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border:1px solid var(--bgfi-border);border-radius:6px;font-size:13px;color:var(--bgfi-text);background:white;font-family:inherit;transition:border-color .2s;}
    .form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--bgfi-sky);box-shadow:0 0 0 3px rgba(13,145,208,.1);}
    .form-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}

    /* BUTTONS */
    .btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;text-decoration:none;transition:all .2s;}
    .btn-primary-sm{background:var(--bgfi-sky);color:white;border:none;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .2s;}
    .btn-primary-sm:hover{background:var(--bgfi-navy);}
    .btn-outline{background:transparent;color:var(--bgfi-navy);border:1px solid var(--bgfi-border);padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .2s;text-decoration:none;}
    .btn-outline:hover{background:var(--bgfi-light);}
    .btn-full{width:100%;justify-content:center;}
    .action-btns{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
    .btn-edit,.btn-delete,.btn-toggle{padding:5px 10px;border:none;border-radius:4px;cursor:pointer;font-size:12px;display:inline-flex;align-items:center;gap:4px;}
    .btn-edit{background:var(--bgfi-sky);color:white;}
    .btn-delete{background:var(--bgfi-p5);color:white;}
    .btn-toggle{background:var(--bgfi-p3);color:white;}

    /* BADGES */
    .badge-published{background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .badge-draft{background:#fef9c3;color:#ca8a04;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .badge-unavail{background:#fee2e2;color:#dc2626;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .agency-type{background:var(--bgfi-sky);color:white;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .agency-type.gab{background:var(--bgfi-p4);}

    /* TOAST */
    .toast{position:fixed;bottom:24px;right:24px;background:var(--bgfi-navy);color:white;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;opacity:0;transform:translateY(20px);transition:all .3s;z-index:9999;max-width:320px;}
    .toast.show{opacity:1;transform:translateY(0);}
    .toast.success{background:#16a34a;}
    .toast.error{background:var(--bgfi-p5);}

    /* MODAL */
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:none;align-items:center;justify-content:center;padding:16px;}
    .modal-overlay.open{display:flex;}
    .modal{background:white;border-radius:12px;width:100%;max-width:620px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;}
    .modal-header{padding:20px 24px;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}
    .modal-header h3{font-size:16px;font-weight:700;color:var(--bgfi-navy);}
    .modal-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--bgfi-text-light);line-height:1;}
    .modal-body{padding:24px;overflow-y:auto;flex:1;}
    .modal-footer{padding:16px 24px;border-top:1px solid var(--bgfi-border);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0;}

    /* ── RESPONSIVE MOBILE ── */
    @media(max-width:768px){
      #admin-sidebar{transform:translateX(-100%);}
      #admin-sidebar.open{transform:translateX(0);}
      #sidebar-overlay.open{display:block;}
      #menu-toggle{display:block;}
      #admin-content{margin-left:0;}
      .admin-main{padding:16px;}
      .grid-2{grid-template-columns:1fr;}
      .grid-4{grid-template-columns:1fr 1fr;}
      .form-grid-2{grid-template-columns:1fr;}
      .form-grid-3{grid-template-columns:1fr;}
      .admin-card{padding:16px;}
      #admin-topbar{padding:0 16px;}
      #admin-topbar h1{font-size:15px;}
      .modal{max-height:95vh;margin:0;}
      .modal-body{padding:16px;}
      .modal-footer{flex-wrap:wrap;}
      .admin-table{font-size:12px;}
      .admin-table th,.admin-table td{padding:8px;}
    }
    @media(max-width:480px){
      .grid-4{grid-template-columns:1fr 1fr;}
      .stat-value{font-size:20px;}
      .stat-card{padding:12px;}
    }
  </style>
  <script>
    // ── AUTH (exécuté immédiatement) ──
    const token = localStorage.getItem('bgfi_admin_token');
    if (!token && !window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login';
    }

    // ── HELPERS ──
    function showToast(msg, type='success') {
      const t = document.getElementById('toast');
      if (!t) return;
      t.innerHTML = '<i class="fas fa-'+(type==='success'?'check-circle':'exclamation-circle')+'"></i> '+msg;
      t.className = 'toast show '+type;
      setTimeout(()=>{t.className='toast';},3500);
    }
    function openModal(title, body, footer='') {
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-body').innerHTML = body;
      document.getElementById('modal-footer').innerHTML = footer;
      document.getElementById('modal').classList.add('open');
    }
    function closeModal() {
      document.getElementById('modal').classList.remove('open');
    }
    async function api(method, path, data=null) {
      try {
        const opts = {
          method,
          headers: {'Content-Type':'application/json','Authorization':'Bearer '+token}
        };
        if (data) opts.body = JSON.stringify(data);
        const res = await fetch('/api'+path, opts);
        if (res.status === 401) { localStorage.removeItem('bgfi_admin_token'); window.location.href='/admin/login'; return {}; }
        return await res.json();
      } catch(e) {
        console.error('API error', e);
        showToast('Erreur de connexion au serveur','error');
        return {};
      }
    }
    async function del(path) {
      if (!confirm('Confirmer la suppression ?')) return;
      const r = await api('DELETE', path);
      if (r.success) { showToast('Supprimé avec succès'); setTimeout(()=>location.reload(),800); }
      else showToast(r.error||'Erreur','error');
    }
    async function toggle(path, data) {
      const r = await api('PUT', path, data);
      if (r.success) { showToast('Mis à jour'); setTimeout(()=>location.reload(),800); }
      else showToast(r.error||'Erreur','error');
    }
    // ── SIDEBAR MOBILE ──
    function toggleSidebar() {
      document.getElementById('admin-sidebar').classList.toggle('open');
      document.getElementById('sidebar-overlay').classList.toggle('open');
    }
  </script>
</head>
<body>
<div id="sidebar-overlay" onclick="toggleSidebar()"></div>
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
      <a href="/admin/settings" class="${activePage==='settings'?'active':''}"><i class="fas fa-cog"></i> Paramètres</a>

      <div class="nav-section">Contenu</div>
      <a href="/admin/articles" class="${activePage==='articles'?'active':''}"><i class="fas fa-newspaper"></i> Actualités</a>
      <a href="/admin/products" class="${activePage==='products'?'active':''}"><i class="fas fa-th-large"></i> Produits & Services</a>
      <a href="/admin/testimonials" class="${activePage==='testimonials'?'active':''}"><i class="fas fa-quote-left"></i> Témoignages</a>

      <div class="nav-section">Services</div>
      <a href="/admin/agencies" class="${activePage==='agencies'?'active':''}"><i class="fas fa-map-marker-alt"></i> Agences & GAB</a>
      <a href="/admin/jobs" class="${activePage==='jobs'?'active':''}"><i class="fas fa-briefcase"></i> Offres d'emploi</a>
      <a href="/admin/preregistrations" class="${activePage==='prereg'?'active':''}"><i class="fas fa-bell"></i> Pré-inscriptions</a>
      <a href="/admin/messages" class="${activePage==='messages'?'active':''}"><i class="fas fa-envelope"></i> Messages reçus</a>

      <div class="nav-section">Compte</div>
      <a href="/admin/security" class="${activePage==='security'?'active':''}"><i class="fas fa-shield-alt"></i> Sécurité</a>
      <a href="/" target="_blank"><i class="fas fa-external-link-alt"></i> Voir le site</a>
      <a href="/admin/logout" style="color:rgba(255,100,100,0.8);"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
    </nav>
  </aside>

  <!-- CONTENU PRINCIPAL -->
  <div id="admin-content">
    <div id="admin-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button id="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
        <h1>${title}</h1>
      </div>
      <div class="admin-user">
        <div style="width:32px;height:32px;background:var(--bgfi-sky);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;">A</div>
        <span style="display:none;font-size:13px;" class="hide-xs">Administrateur</span>
      </div>
    </div>
    <div class="admin-main">
      ${content}
    </div>
  </div>
</div>

<!-- TOAST & MODAL -->
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="modal">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modal-title"></h3>
      <button class="modal-close" onclick="closeModal()">&#x2715;</button>
    </div>
    <div class="modal-body" id="modal-body"></div>
    <div class="modal-footer" id="modal-footer"></div>
  </div>
</div>
<script>
  // Fermer modal en cliquant sur l'overlay
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
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
  <style>
    *{box-sizing:border-box;}
    body{background:var(--bgfi-light);display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px;}
    .login-card{background:white;border-radius:12px;padding:32px 28px;width:100%;max-width:400px;border:1px solid var(--bgfi-border);box-shadow:0 4px 24px rgba(0,0,0,.08);}
    .form-group{margin-bottom:16px;}
    .form-group label{display:block;font-size:12px;font-weight:700;color:var(--bgfi-navy);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
    .form-group input{width:100%;padding:10px 12px;border:1px solid var(--bgfi-border);border-radius:6px;font-size:14px;color:var(--bgfi-text);}
    .form-group input:focus{outline:none;border-color:var(--bgfi-sky);}
    .btn-login{width:100%;padding:12px;background:var(--bgfi-sky);color:white;border:none;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer;transition:background .2s;}
    .btn-login:hover{background:var(--bgfi-navy);}
  </style>
</head>
<body>
  <div style="width:100%;max-width:420px;">
    <div style="text-align:center;margin-bottom:28px;">
      <div style="width:64px;height:64px;background:var(--bgfi-navy);border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><span style="color:white;font-weight:700;font-size:20px;">BGFI</span></div>
      <h1 style="font-size:22px;font-weight:700;color:var(--bgfi-navy);">BGFIBank Centrafrique</h1>
      <p style="color:var(--bgfi-text-light);font-size:14px;margin-top:4px;">Accès Administrateur</p>
    </div>
    <div class="login-card">
      <form onsubmit="login(event)">
        <div class="form-group">
          <label><i class="fas fa-lock" style="margin-right:4px;"></i> Mot de passe</label>
          <input type="password" id="password" placeholder="••••••••••" autocomplete="current-password" required>
        </div>
        <div id="loginError" style="color:#dc2626;font-size:13px;margin-bottom:12px;display:none;padding:8px 12px;background:#fef2f2;border-radius:4px;"><i class="fas fa-exclamation-circle" style="margin-right:4px;"></i>Mot de passe incorrect</div>
        <button type="submit" class="btn-login" id="loginBtn"><i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter</button>
      </form>
      <div style="margin-top:16px;padding:10px 12px;background:var(--bgfi-light);border-radius:4px;font-size:12px;color:var(--bgfi-text-light);">
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
      document.getElementById('loginError').style.display = 'none';
      const password = document.getElementById('password').value;
      try {
        const res = await fetch('/api/auth/login', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({password})
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('bgfi_admin_token', data.token);
          window.location.href = '/admin/dashboard';
        } else {
          document.getElementById('loginError').style.display = 'block';
          btn.innerHTML = '<i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter';
          btn.disabled = false;
        }
      } catch {
        btn.innerHTML = '<i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter';
        btn.disabled = false;
      }
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
  <div class="grid-4">
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);"><i class="fas fa-newspaper"></i></div><div><div class="stat-value" id="stat-articles">—</div><div class="stat-label">Articles publiés</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#16a34a;"><i class="fas fa-th-large"></i></div><div><div class="stat-value" id="stat-products">—</div><div class="stat-label">Produits actifs</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p4);"><i class="fas fa-map-marker-alt"></i></div><div><div class="stat-value" id="stat-agencies">—</div><div class="stat-label">Agences & GAB</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p6);"><i class="fas fa-bell"></i></div><div><div class="stat-value" id="stat-prereg">—</div><div class="stat-label">Pré-inscriptions</div></div></div>
  </div>
  <div class="grid-2">
    <div class="admin-card">
      <h2><i class="fas fa-newspaper"></i> Derniers articles</h2>
      <div id="recent-articles"><div style="text-align:center;padding:20px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin"></i> Chargement...</div></div>
      <a href="/admin/articles" class="btn btn-outline" style="margin-top:16px;font-size:13px;"><i class="fas fa-eye"></i> Gérer les articles</a>
    </div>
    <div class="admin-card">
      <h2><i class="fas fa-bell"></i> Dernières pré-inscriptions</h2>
      <div id="recent-prereg"><div style="text-align:center;padding:20px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin"></i> Chargement...</div></div>
      <a href="/admin/preregistrations" class="btn btn-outline" style="margin-top:16px;font-size:13px;"><i class="fas fa-eye"></i> Voir toutes</a>
    </div>
  </div>
  <div class="admin-card">
    <h2><i class="fas fa-rocket"></i> Actions rapides</h2>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      <a href="/admin/articles" class="btn btn-primary-sm"><i class="fas fa-plus"></i> Nouvel article</a>
      <a href="/admin/agencies" class="btn btn-primary-sm" style="background:#16a34a;"><i class="fas fa-map-pin"></i> Nouvelle agence</a>
      <a href="/admin/jobs" class="btn btn-primary-sm" style="background:var(--bgfi-p6);"><i class="fas fa-briefcase"></i> Nouvelle offre</a>
      <a href="/admin/settings" class="btn btn-outline"><i class="fas fa-cog"></i> Paramètres</a>
      <a href="/" target="_blank" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> Voir le site</a>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', async function() {
    try {
      const stats = await api('GET', '/stats');
      if (stats.articles) document.getElementById('stat-articles').textContent = stats.articles.published || 0;
      if (stats.products) document.getElementById('stat-products').textContent = stats.products.available || 0;
      if (stats.agencies) document.getElementById('stat-agencies').textContent = stats.agencies.total || 0;
      if (stats.preRegistrations) document.getElementById('stat-prereg').textContent = stats.preRegistrations.total || 0;

      const articles = await api('GET', '/articles?all=true');
      const recent = Array.isArray(articles) ? articles.slice(0,4) : [];
      document.getElementById('recent-articles').innerHTML = recent.length === 0
        ? '<p style="color:var(--bgfi-text-light);font-size:13px;text-align:center;padding:20px;">Aucun article</p>'
        : recent.map(a => '<div style="padding:10px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;gap:8px;"><div style="flex:1;min-width:0;"><div style="font-weight:600;font-size:13px;color:var(--bgfi-navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+a.title+'</div><div style="font-size:12px;color:var(--bgfi-text-light);">'+a.category+' · '+a.date+'</div></div><span class="'+(a.published?'badge-published':'badge-draft')+'">'+(a.published?'Publié':'Brouillon')+'</span></div>').join('');

      const prereg = await api('GET', '/pre-registrations');
      const preregList = Array.isArray(prereg) ? prereg : [];
      document.getElementById('recent-prereg').innerHTML = preregList.length === 0
        ? '<p style="color:var(--bgfi-text-light);font-size:13px;text-align:center;padding:20px;">Aucune pré-inscription</p>'
        : preregList.slice(0,5).map(p => '<div style="padding:8px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;font-size:13px;gap:8px;"><span style="color:var(--bgfi-navy);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+p.email+'</span><span style="background:var(--bgfi-light);padding:2px 8px;border-radius:10px;font-size:11px;white-space:nowrap;">'+p.service+'</span></div>').join('');
    } catch(e) {
      console.error('Dashboard load error:', e);
    }
  });
  </script>`
  return c.html(adminLayout(content, 'Tableau de bord', 'dashboard'))
})

// ── SETTINGS ──────────────────────────────────────────────────
admin.get('/settings', (c) => {
  const content = `
  <div class="admin-card">
    <h2><i class="fas fa-cog"></i> Paramètres généraux du site</h2>
    <form id="settingsForm" onsubmit="saveSettings(event)">
      <div class="form-grid-2">
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
      <div class="form-group">
        <label>Image principale (Hero) — URL</label>
        <input type="text" id="heroImage" placeholder="/static/images/hero-bgfi-invest.jpg" style="font-size:12px;">
        <small style="color:var(--bgfi-text-light);font-size:11px;">URL externe (https://...) ou chemin (/static/images/...)</small>
        <div id="heroImagePreview" style="margin-top:10px;display:none;">
          <img id="heroImgTag" src="" alt="Aperçu" style="max-width:100%;max-height:200px;border-radius:8px;border:2px solid var(--bgfi-border);object-fit:cover;">
        </div>
      </div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-envelope-open-text" style="color:var(--bgfi-sky);margin-right:8px;"></i>Configuration Email (Resend)</h3>
      <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:8px;padding:14px;margin-bottom:16px;font-size:13px;color:#92400e;">
        <i class="fas fa-info-circle" style="margin-right:6px;"></i>
        Créez un compte gratuit sur <a href="https://resend.com" target="_blank" style="color:#0d91d0;font-weight:700;">resend.com</a> et copiez votre clé API (100 emails/jour gratuits).
      </div>
      <div class="form-group">
        <label>Clé API Resend <span style="color:var(--bgfi-text-light);font-weight:400;">— optionnel</span></label>
        <input type="password" id="resendApiKey" placeholder="re_xxxxxxxxxxxxxxxxxxxx" style="font-family:monospace;">
      </div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-chart-line" style="color:var(--bgfi-sky);margin-right:8px;"></i>Tableau de bord économique</h3>
      <div class="form-grid-3">
        <div class="form-group"><label>Taux USD/FCFA</label><input type="text" id="exchangeUSD"></div>
        <div class="form-group"><label>Taux EUR/FCFA</label><input type="text" id="exchangeEUR"></div>
        <div class="form-group"><label>Taux BEAC (%)</label><input type="text" id="beacRate"></div>
      </div>
      <div class="form-group"><label>Conseil du jour</label><textarea id="economicTip" style="min-height:70px;"></textarea></div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fab fa-facebook" style="color:var(--bgfi-sky);margin-right:8px;"></i>Réseaux sociaux</h3>
      <div class="form-grid-2">
        <div class="form-group"><label>Facebook</label><input type="url" id="facebook"></div>
        <div class="form-group"><label>Twitter/X</label><input type="url" id="twitter"></div>
        <div class="form-group"><label>LinkedIn</label><input type="url" id="linkedin"></div>
        <div class="form-group"><label>YouTube</label><input type="url" id="youtube"></div>
      </div>
      <button type="submit" class="btn btn-primary-sm"><i class="fas fa-save"></i> Sauvegarder les paramètres</button>
    </form>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', async function() {
    const s = await api('GET', '/settings');
    const fields = ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','heroImage','resendApiKey','exchangeUSD','exchangeEUR','beacRate','economicTip','facebook','twitter','linkedin','youtube'];
    fields.forEach(k => { const el = document.getElementById(k); if (el && s[k] !== undefined) el.value = s[k]; });
    const showPreview = (url) => {
      if (url) { document.getElementById('heroImgTag').src = url; document.getElementById('heroImagePreview').style.display = 'block'; }
      else { document.getElementById('heroImagePreview').style.display = 'none'; }
    };
    showPreview(s.heroImage);
    document.getElementById('heroImage').addEventListener('input', e => showPreview(e.target.value));
  });
  async function saveSettings(e) {
    e.preventDefault();
    const data = {};
    const fields = ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','heroImage','resendApiKey','exchangeUSD','exchangeEUR','beacRate','economicTip','facebook','twitter','linkedin','youtube'];
    fields.forEach(k => { const el = document.getElementById(k); if (el) data[k] = el.value; });
    const r = await api('PUT', '/settings', data);
    if (r.success) showToast('Paramètres sauvegardés !');
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Paramètres du site', 'settings'))
})

// ── ARTICLES ──────────────────────────────────────────────────
admin.get('/articles', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les articles et actualités publiés sur le site</p>
    <button class="btn btn-primary-sm" id="btnNewArticle"><i class="fas fa-plus"></i> Nouvel article</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="articles-container" style="padding:16px;"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement des articles...</p></div></div>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnNewArticle').addEventListener('click', newArticle);
    loadArticles();
  });

  async function loadArticles() {
    const arts = await api('GET', '/articles?all=true');
    const container = document.getElementById('articles-container');
    if (!Array.isArray(arts) || arts.length === 0) {
      container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucun article. Créez votre premier article !</p>';
      return;
    }
    container.innerHTML = '<table class="admin-table"><thead><tr><th>Titre</th><th>Catégorie</th><th>Auteur</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      arts.map(a => {
        const aJson = JSON.stringify(a).replace(/\\\\/g,'\\\\\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;');
        return '<tr><td><div style="font-weight:600;color:var(--bgfi-navy);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="'+a.title+'">'+a.title+'</div></td><td style="white-space:nowrap;">'+a.category+'</td><td style="white-space:nowrap;">'+a.author+'</td><td style="white-space:nowrap;">'+a.date+'</td><td><span class="'+(a.published?'badge-published':'badge-draft')+'">'+(a.published?'Publié':'Brouillon')+'</span></td><td class="action-btns"><button class="btn-edit" onclick="editArticle(this)" data-article="'+aJson+'"><i class="fas fa-edit"></i></button><button class="btn-toggle" onclick="toggle(\'/articles/'+a.id+"',{published:"+!a.published+'})"><i class="fas fa-'+(a.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/articles/'+a.id+"')\"><i class='fas fa-trash'></i></button></td></tr>";
      }).join('') + '</tbody></table>';

    // Re-attacher les listeners edit
    document.querySelectorAll('.btn-edit[data-article]').forEach(btn => {
      btn.addEventListener('click', function() {
        const a = JSON.parse(this.getAttribute('data-article').replace(/&quot;/g,'"'));
        editArticle(a);
      });
    });
  }

  const articleFormHTML = (a) => {
    a = a || {};
    const cats = ['Vie de la banque','Espace PME','Économie RCA','Conseils financiers','Événements'];
    return \`<div class="form-group"><label>Titre *</label><input type="text" id="f-title" value="\${(a.title||'').replace(/"/g,'&quot;')}" required></div>
    <div class="form-grid-2">
      <div class="form-group"><label>Catégorie</label><select id="f-category">\${cats.map(cat=>'<option'+(a.category===cat?' selected':'')+'>'+cat+'</option>').join('')}</select></div>
      <div class="form-group"><label>Auteur</label><input type="text" id="f-author" value="\${(a.author||'Direction Communication').replace(/"/g,'&quot;')}"></div>
    </div>
    <div class="form-group"><label>Date</label><input type="date" id="f-date" value="\${a.date||new Date().toISOString().split('T')[0]}"></div>
    <div class="form-group"><label>Image URL</label><input type="url" id="f-image" value="\${(a.image||'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80').replace(/"/g,'&quot;')}"></div>
    <div class="form-group"><label>Résumé *</label><textarea id="f-excerpt" style="min-height:70px;" required>\${a.excerpt||''}</textarea></div>
    <div class="form-group"><label>Contenu (HTML autorisé) *</label><textarea id="f-content" style="min-height:160px;" required>\${a.content||''}</textarea></div>
    <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="f-published" \${a.published!==false?'checked':''} style="width:auto;margin:0;"> Publié (visible sur le site)</label></div>\`;
  };

  function newArticle() {
    openModal('Nouvel article', articleFormHTML(), \`<button class="btn btn-primary-sm" onclick="saveArticle()"><i class="fas fa-save"></i> Publier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>\`);
  }
  function editArticle(a) {
    openModal('Modifier l\\'article', articleFormHTML(a), \`<button class="btn btn-primary-sm" onclick="saveArticle(\${a.id})"><i class="fas fa-save"></i> Sauvegarder</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>\`);
  }
  async function saveArticle(id) {
    const title = document.getElementById('f-title').value.trim();
    if (!title) { showToast('Le titre est obligatoire','error'); return; }
    const data = {
      title,
      category: document.getElementById('f-category').value,
      author: document.getElementById('f-author').value,
      date: document.getElementById('f-date').value,
      image: document.getElementById('f-image').value,
      excerpt: document.getElementById('f-excerpt').value,
      content: document.getElementById('f-content').value,
      published: document.getElementById('f-published').checked,
      slug: title.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
    };
    const r = id ? await api('PUT', '/articles/'+id, data) : await api('POST', '/articles', data);
    if (r.success || r.article) { showToast(id ? 'Article modifié !' : 'Article créé !'); closeModal(); loadArticles(); }
    else showToast(r.error||'Erreur lors de la sauvegarde','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Gestion des Actualités', 'articles'))
})

// ── PRODUCTS ──────────────────────────────────────────────────
admin.get('/products', (c) => {
  const content = `
  <div style="margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les produits et services. Activez/désactivez le badge "Bientôt disponible".</p>
  </div>
  <div id="products-container"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement des produits...</p></div></div>
  <script>
  document.addEventListener('DOMContentLoaded', function() { loadProducts(); });

  async function loadProducts() {
    const prods = await api('GET', '/products');
    const container = document.getElementById('products-container');
    if (!Array.isArray(prods) || prods.length === 0) {
      container.innerHTML = '<div class="admin-card"><p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucun produit trouvé.</p></div>';
      return;
    }
    const segments = ['particuliers','professionnels','entreprises','banque-privee'];
    const segLabels = {particuliers:'Particuliers',professionnels:'Professionnels',entreprises:'Entreprises & Institutions','banque-privee':'Banque Privée'};
    let html = '';
    segments.forEach(seg => {
      const sp = prods.filter(p => p.segment === seg);
      if (!sp.length) return;
      html += '<div class="admin-card" style="margin-bottom:20px;"><h2><i class="fas fa-tag"></i>'+segLabels[seg]+'</h2><div class="table-wrap"><table class="admin-table"><thead><tr><th>Produit</th><th>Description</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      sp.map(p => {
        const pJson = JSON.stringify(p).replace(/"/g,'&quot;');
        return '<tr><td><div style="display:flex;align-items:center;gap:8px;"><i class="fas '+p.icon+'" style="color:var(--bgfi-sky);width:20px;flex-shrink:0;"></i><div style="font-weight:600;color:var(--bgfi-navy);">'+p.title+'</div></div></td><td><div style="max-width:200px;font-size:12px;color:var(--bgfi-text-light);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+p.description.substring(0,60)+'...</div></td><td><span class="'+(p.available?'badge-published':'badge-unavail')+'">'+(p.available?'Disponible':'Bientôt dispo')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/products/'+p.id+"',{available:"+!p.available+'})" title="'+(p.available?'Désactiver':'Activer')+'"><i class="fas fa-'+(p.available?'toggle-off':'toggle-on')+'"></i> '+(p.available?'OFF':'ON')+'</button><button class="btn-edit" data-product="'+pJson+'" onclick="editProduct(this)"><i class="fas fa-edit"></i></button></td></tr>';
      }).join('') + '</tbody></table></div></div>';
    });
    container.innerHTML = html;
    document.querySelectorAll('.btn-edit[data-product]').forEach(btn => {
      btn.addEventListener('click', function() {
        const p = JSON.parse(this.getAttribute('data-product').replace(/&quot;/g,'"'));
        editProductModal(p);
      });
    });
  }

  function editProduct(btn) {
    const p = JSON.parse(btn.getAttribute('data-product').replace(/&quot;/g,'"'));
    editProductModal(p);
  }
  function editProductModal(p) {
    const body = \`<div class="form-group"><label>Titre</label><input type="text" id="fp-title" value="\${(p.title||'').replace(/"/g,'&quot;')}" required></div>
    <div class="form-group"><label>Description</label><textarea id="fp-desc" style="min-height:80px;">\${p.description||''}</textarea></div>
    <div class="form-group"><label>Fonctionnalités (une par ligne)</label><textarea id="fp-features" style="min-height:100px;">\${(p.features||[]).join('\\n')}</textarea></div>
    <div class="form-grid-2">
      <div class="form-group"><label>Texte CTA</label><input type="text" id="fp-cta" value="\${(p.cta||'En savoir plus').replace(/"/g,'&quot;')}"></div>
      <div class="form-group"><label>URL CTA</label><input type="text" id="fp-ctaUrl" value="\${(p.ctaUrl||'#').replace(/"/g,'&quot;')}"></div>
    </div>
    <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fp-avail" \${p.available?'checked':''} style="width:auto;margin:0;"> Disponible</label></div>\`;
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
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Produits & Services', 'products'))
})

// ── AGENCIES ──────────────────────────────────────────────────
admin.get('/agencies', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les agences et GAB affichés sur la carte interactive</p>
    <button class="btn btn-primary-sm" id="btnNewAgency"><i class="fas fa-plus"></i> Nouvelle agence/GAB</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="agencies-container" style="padding:16px;"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement...</p></div></div>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnNewAgency').addEventListener('click', newAgency);
    loadAgencies();
  });
  async function loadAgencies() {
    const ags = await api('GET', '/agencies');
    const container = document.getElementById('agencies-container');
    if (!Array.isArray(ags) || ags.length === 0) {
      container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucune agence configurée.</p>';
      return;
    }
    container.innerHTML = '<table class="admin-table"><thead><tr><th>Nom</th><th>Type</th><th>Adresse</th><th>Tél.</th><th>Horaires</th><th>GPS</th><th>Actions</th></tr></thead><tbody>' +
      ags.map(a => {
        const aJson = JSON.stringify(a).replace(/"/g,'&quot;');
        return '<tr><td style="font-weight:600;color:var(--bgfi-navy);white-space:nowrap;">'+a.name+'</td><td><span class="agency-type '+(a.type==='gab'?'gab':'')+'">'+(a.type==='agence'?'Agence':'GAB')+'</span></td><td style="font-size:12px;">'+a.address+', '+a.city+'</td><td style="font-size:12px;white-space:nowrap;">'+a.phone+'</td><td style="font-size:11px;white-space:nowrap;">'+a.hours+'</td><td style="font-size:11px;font-family:monospace;white-space:nowrap;">'+a.lat+', '+a.lng+'</td><td class="action-btns"><button class="btn-edit" data-agency="'+aJson+'" onclick="editAgency(this)"><i class="fas fa-edit"></i></button><button class="btn-delete" onclick="del(\'/agencies/'+a.id+"')\"><i class='fas fa-trash'></i></button></td></tr>";
      }).join('') + '</tbody></table>';
  }
  const agencyForm = (a) => {
    a = a || {};
    return \`<div class="form-group"><label>Nom *</label><input type="text" id="fa-name" value="\${(a.name||'').replace(/"/g,'&quot;')}" required placeholder="Ex: BGFIBank — Agence Centre"></div>
    <div class="form-grid-2">
      <div class="form-group"><label>Type *</label><select id="fa-type"><option value="agence" \${a.type==='agence'?'selected':''}>Agence bancaire</option><option value="gab" \${a.type==='gab'?'selected':''}>GAB (Distributeur)</option></select></div>
      <div class="form-group"><label>Ville</label><input type="text" id="fa-city" value="\${(a.city||'Bangui').replace(/"/g,'&quot;')}"></div>
    </div>
    <div class="form-group"><label>Adresse</label><input type="text" id="fa-address" value="\${(a.address||'').replace(/"/g,'&quot;')}" placeholder="Quartier, rue..."></div>
    <div class="form-group"><label>Téléphone</label><input type="tel" id="fa-phone" value="\${(a.phone||'').replace(/"/g,'&quot;')}"></div>
    <div class="form-group"><label>Horaires</label><input type="text" id="fa-hours" value="\${(a.hours||'Lun-Ven : 8h00-17h00').replace(/"/g,'&quot;')}"></div>
    <div class="form-grid-2">
      <div class="form-group"><label>Latitude GPS *</label><input type="number" id="fa-lat" value="\${a.lat||4.361}" step="0.0001" required></div>
      <div class="form-group"><label>Longitude GPS *</label><input type="number" id="fa-lng" value="\${a.lng||18.555}" step="0.0001" required></div>
    </div>
    <div style="background:var(--bgfi-light);padding:10px 12px;border-radius:4px;font-size:12px;color:var(--bgfi-text-light);"><i class="fas fa-info-circle" style="color:var(--bgfi-sky);margin-right:4px;"></i>Trouvez les coordonnées GPS sur <a href="https://maps.google.com" target="_blank" style="color:var(--bgfi-sky);">Google Maps</a> (clic droit)</div>\`;
  };
  function newAgency() { openModal('Nouvelle agence / GAB', agencyForm(), '<button class="btn btn-primary-sm" onclick="saveAgency()"><i class="fas fa-save"></i> Ajouter</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'); }
  function editAgency(btn) {
    const a = JSON.parse(btn.getAttribute('data-agency').replace(/&quot;/g,'"'));
    openModal('Modifier : '+a.name, agencyForm(a), '<button class="btn btn-primary-sm" onclick="saveAgency('+a.id+')"><i class="fas fa-save"></i> Modifier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
  }
  async function saveAgency(id) {
    const data = { name: document.getElementById('fa-name').value, type: document.getElementById('fa-type').value, city: document.getElementById('fa-city').value, address: document.getElementById('fa-address').value, phone: document.getElementById('fa-phone').value, hours: document.getElementById('fa-hours').value, lat: parseFloat(document.getElementById('fa-lat').value), lng: parseFloat(document.getElementById('fa-lng').value) };
    const r = id ? await api('PUT', '/agencies/'+id, data) : await api('POST', '/agencies', data);
    if (r.success || r.agency) { showToast(id ? 'Agence modifiée !' : 'Agence ajoutée !'); closeModal(); loadAgencies(); }
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Agences & GAB', 'agencies'))
})

// ── JOBS ──────────────────────────────────────────────────────
admin.get('/jobs', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les offres d'emploi publiées dans la section Carrières</p>
    <button class="btn btn-primary-sm" id="btnNewJob"><i class="fas fa-plus"></i> Nouvelle offre</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="jobs-container" style="padding:16px;"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement...</p></div></div>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnNewJob').addEventListener('click', newJob);
    loadJobs();
  });
  async function loadJobs() {
    const jobs = await api('GET', '/jobs?all=true');
    const container = document.getElementById('jobs-container');
    if (!Array.isArray(jobs) || jobs.length === 0) {
      container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucune offre d\\'emploi.</p>';
      return;
    }
    container.innerHTML = '<table class="admin-table"><thead><tr><th>Poste</th><th>Département</th><th>Type</th><th>Lieu</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      jobs.map(j => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+j.title+'</td><td style="font-size:13px;">'+j.department+'</td><td><span style="background:var(--bgfi-sky);color:white;padding:2px 8px;border-radius:10px;font-size:11px;white-space:nowrap;">'+j.type+'</span></td><td style="font-size:13px;">'+j.location+'</td><td><span class="'+(j.published?'badge-published':'badge-draft')+'">'+(j.published?'Publié':'Archivé')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/jobs/'+j.id+"',{published:"+!j.published+'})"><i class="fas fa-'+(j.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/jobs/'+j.id+"')\"><i class='fas fa-trash'></i></button></td></tr>").join('') +
      '</tbody></table>';
  }
  function newJob() {
    const body = \`<div class="form-group"><label>Titre du poste *</label><input type="text" id="fj-title" required placeholder="Ex: Chargé de clientèle"></div>
    <div class="form-grid-2">
      <div class="form-group"><label>Département</label><input type="text" id="fj-dept" placeholder="Commerce & Relation Client"></div>
      <div class="form-group"><label>Type de contrat</label><select id="fj-type"><option>CDI</option><option>CDD</option><option>Stage</option></select></div>
    </div>
    <div class="form-group"><label>Lieu</label><input type="text" id="fj-loc" value="Bangui"></div>
    <div class="form-group"><label>Description *</label><textarea id="fj-desc" required style="min-height:100px;" placeholder="Décrivez le poste, les missions, le profil requis..."></textarea></div>
    <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fj-pub" checked style="width:auto;margin:0;"> Publier immédiatement</label></div>\`;
    openModal('Nouvelle offre d\\'emploi', body, '<button class="btn btn-primary-sm" onclick="saveJob()"><i class="fas fa-save"></i> Publier</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
  }
  async function saveJob() {
    const title = document.getElementById('fj-title').value.trim();
    if (!title) { showToast('Le titre est obligatoire','error'); return; }
    const data = { title, department: document.getElementById('fj-dept').value, type: document.getElementById('fj-type').value, location: document.getElementById('fj-loc').value, description: document.getElementById('fj-desc').value, published: document.getElementById('fj-pub').checked };
    const r = await api('POST', '/jobs', data);
    if (r.success || r.job) { showToast('Offre publiée !'); closeModal(); loadJobs(); }
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, "Offres d'emploi", 'jobs'))
})

// ── TESTIMONIALS ──────────────────────────────────────────────
admin.get('/testimonials', (c) => {
  const content = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les témoignages clients affichés sur la page d'accueil</p>
    <button class="btn btn-primary-sm" id="btnNewTestimonial"><i class="fas fa-plus"></i> Nouveau témoignage</button>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="testimonials-container" style="padding:16px;"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement...</p></div></div>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnNewTestimonial').addEventListener('click', newTestimonial);
    loadTestimonials();
  });
  async function loadTestimonials() {
    const items = await api('GET', '/testimonials?all=true');
    const container = document.getElementById('testimonials-container');
    if (!Array.isArray(items) || items.length === 0) {
      container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucun témoignage</p>';
      return;
    }
    container.innerHTML = '<table class="admin-table"><thead><tr><th>Client</th><th>Rôle</th><th>Témoignage</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' +
      items.map(t => '<tr><td style="font-weight:600;color:var(--bgfi-navy);white-space:nowrap;">'+t.name+'</td><td style="font-size:13px;">'+t.role+'</td><td style="font-size:13px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+t.content.substring(0,70)+'...</td><td><span class="'+(t.published?'badge-published':'badge-draft')+'">'+(t.published?'Publié':'Masqué')+'</span></td><td class="action-btns"><button class="btn-toggle" onclick="toggle(\'/testimonials/'+t.id+"',{published:"+!t.published+'})"><i class="fas fa-'+(t.published?'eye-slash':'eye')+'"></i></button><button class="btn-delete" onclick="del(\'/testimonials/'+t.id+"')\"><i class='fas fa-trash'></i></button></td></tr>').join('') +
      '</tbody></table>';
  }
  function newTestimonial() {
    const body = \`<div class="form-group"><label>Nom du client *</label><input type="text" id="ft-name" required placeholder="Ex: Jean Kouassi"></div>
    <div class="form-group"><label>Rôle / Activité</label><input type="text" id="ft-role" placeholder="Ex: Entrepreneur, Bangui"></div>
    <div class="form-group"><label>Initiales (avatar, max 3 lettres)</label><input type="text" id="ft-avatar" placeholder="Ex: JK" maxlength="3"></div>
    <div class="form-group"><label>Témoignage *</label><textarea id="ft-content" required style="min-height:100px;" placeholder="Votre expérience avec BGFIBank..."></textarea></div>
    <div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="ft-pub" checked style="width:auto;margin:0;"> Publier immédiatement</label></div>\`;
    openModal('Nouveau témoignage', body, '<button class="btn btn-primary-sm" onclick="saveTestimonial()"><i class="fas fa-save"></i> Ajouter</button><button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>');
  }
  async function saveTestimonial() {
    const name = document.getElementById('ft-name').value.trim();
    if (!name) { showToast('Le nom est obligatoire','error'); return; }
    const data = { name, role: document.getElementById('ft-role').value, avatar: document.getElementById('ft-avatar').value, content: document.getElementById('ft-content').value, published: document.getElementById('ft-pub').checked };
    const r = await api('POST', '/testimonials', data);
    if (r.success) { showToast('Témoignage ajouté !'); closeModal(); loadTestimonials(); }
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Témoignages Clients', 'testimonials'))
})

// ── PRE-REGISTRATIONS ─────────────────────────────────────────
admin.get('/preregistrations', (c) => {
  const content = `
  <div style="margin-bottom:20px;"><p style="color:var(--bgfi-text-light);font-size:14px;">Emails collectés via les formulaires "Bientôt disponible" et la newsletter</p></div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="prereg-container" style="padding:16px;"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement...</p></div></div>
    </div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', async function() {
    const items = await api('GET', '/pre-registrations');
    const container = document.getElementById('prereg-container');
    if (!Array.isArray(items) || items.length === 0) {
      container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucune pré-inscription pour le moment.</p>';
      return;
    }
    const byService = {};
    items.forEach(i => { if(!byService[i.service]) byService[i.service]=[]; byService[i.service].push(i); });
    let html = '<div class="grid-4" style="margin-bottom:24px;">' +
      Object.entries(byService).map(([s,arr]) => '<div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);font-size:16px;"><i class="fas fa-bell"></i></div><div><div class="stat-value">'+arr.length+'</div><div class="stat-label">'+s+'</div></div></div>').join('') +
      '</div><table class="admin-table"><thead><tr><th>Email</th><th>Service</th><th>Date</th></tr></thead><tbody>' +
      items.map(i => '<tr><td style="font-weight:600;color:var(--bgfi-navy);">'+i.email+'</td><td><span style="background:var(--bgfi-light);padding:3px 10px;border-radius:10px;font-size:12px;">'+i.service+'</span></td><td style="font-size:13px;white-space:nowrap;">'+new Date(i.date).toLocaleString("fr-FR")+'</td></tr>').join('') +
      '</tbody></table>';
    container.innerHTML = html;
  });
  </script>`
  return c.html(adminLayout(content, 'Pré-inscriptions', 'prereg'))
})

// ── MESSAGES REÇUS ───────────────────────────────────────────
admin.get('/messages', (c) => {
  const content = `
  <div class="admin-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <h2 style="margin:0;"><i class="fas fa-envelope"></i> Messages du formulaire de contact</h2>
      <span id="msgCount" style="background:var(--bgfi-sky);color:white;padding:4px 14px;border-radius:20px;font-size:13px;font-weight:600;"></span>
    </div>
    <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#92400e;">
      <i class="fas fa-info-circle" style="margin-right:6px;"></i>
      Pour recevoir ces messages par email, configurez votre clé Resend dans <a href="/admin/settings" style="color:#0d91d0;font-weight:700;">Paramètres</a>.
    </div>
    <div id="msgList"><div style="text-align:center;padding:40px;color:var(--bgfi-text-light);"><i class="fas fa-spinner fa-spin" style="font-size:24px;"></i><p style="margin-top:12px;">Chargement...</p></div></div>
  </div>
  <script>
  document.addEventListener('DOMContentLoaded', async function() {
    const messages = await api('GET', '/contact-messages');
    const list = document.getElementById('msgList');
    const count = document.getElementById('msgCount');
    if (!Array.isArray(messages) || messages.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:60px;"><i class="fas fa-inbox" style="font-size:48px;color:var(--bgfi-border);display:block;margin-bottom:16px;"></i><p style="color:var(--bgfi-text-light);">Aucun message reçu pour le moment.</p></div>';
      count.textContent = '0 message';
      return;
    }
    const unread = messages.filter(m => !m.read).length;
    count.textContent = messages.length + ' message' + (messages.length>1?'s':'') + (unread>0?' · '+unread+' non lu'+(unread>1?'s':''):'');
    list.innerHTML = messages.map(m => \`
      <div id="msg-\${m.id}" style="border:1px solid \${m.read?'var(--bgfi-border)':'var(--bgfi-sky)'};background:\${m.read?'white':'#f0f9ff'};border-radius:8px;padding:16px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
          <div style="flex:1;min-width:0;">
            \${!m.read?'<span style="background:var(--bgfi-sky);color:white;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;text-transform:uppercase;margin-right:8px;">Nouveau</span>':''}
            <strong style="color:var(--bgfi-navy);font-size:15px;">\${m.name}</strong>
            <div style="color:var(--bgfi-text-light);font-size:12px;margin-top:2px;">\${m.email}\${m.phone?' · '+m.phone:''}</div>
          </div>
          <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;flex-wrap:wrap;">
            <span style="font-size:11px;color:var(--bgfi-text-light);white-space:nowrap;">\${new Date(m.date).toLocaleString('fr-FR')}</span>
            <button onclick="markRead(\${m.id})" style="background:var(--bgfi-p3);color:white;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;">\${m.read?'✓ Lu':'Marquer lu'}</button>
            <a href="mailto:\${m.email}?subject=Re: \${encodeURIComponent(m.subject||'Votre message')}&body=Bonjour \${encodeURIComponent(m.name)}," style="background:var(--bgfi-sky);color:white;padding:4px 10px;border-radius:4px;font-size:11px;text-decoration:none;"><i class="fas fa-reply"></i> Répondre</a>
          </div>
        </div>
        <div style="margin-bottom:8px;"><span style="background:var(--bgfi-light);color:var(--bgfi-navy);font-size:12px;font-weight:600;padding:3px 10px;border-radius:10px;">\${m.subject||'Sans sujet'}</span></div>
        <div style="padding:12px;background:rgba(0,0,0,.03);border-radius:6px;font-size:13px;color:var(--bgfi-text);line-height:1.7;border-left:3px solid var(--bgfi-sky);">\${m.message.replace(/\\n/g,'<br>')}</div>
      </div>\`).join('');
  });
  async function markRead(id) {
    await api('PUT', '/contact-messages/'+id+'/read', {});
    const el = document.getElementById('msg-'+id);
    if (el) { el.style.border='1px solid var(--bgfi-border)'; el.style.background='white'; }
    showToast('Marqué comme lu');
  }
  </script>`
  return c.html(adminLayout(content, 'Messages reçus', 'messages'))
})

// ── SECURITY ─────────────────────────────────────────────────
admin.get('/security', (c) => {
  const content = `
  <div class="admin-card" style="max-width:480px;">
    <h2><i class="fas fa-shield-alt"></i> Changer le mot de passe administrateur</h2>
    <form onsubmit="changePassword(event)">
      <div class="form-group"><label>Mot de passe actuel *</label><input type="password" id="currentPwd" required autocomplete="current-password"></div>
      <div class="form-group"><label>Nouveau mot de passe *</label><input type="password" id="newPwd" required minlength="8" autocomplete="new-password"></div>
      <div class="form-group"><label>Confirmer le nouveau mot de passe *</label><input type="password" id="confirmPwd" required autocomplete="new-password"></div>
      <button type="submit" class="btn btn-primary-sm"><i class="fas fa-key"></i> Changer le mot de passe</button>
    </form>
  </div>
  <script>
  async function changePassword(e) {
    e.preventDefault();
    const current = document.getElementById('currentPwd').value;
    const newPwd = document.getElementById('newPwd').value;
    const confirm = document.getElementById('confirmPwd').value;
    if (newPwd !== confirm) { showToast('Les mots de passe ne correspondent pas','error'); return; }
    if (current !== token) { showToast('Mot de passe actuel incorrect','error'); return; }
    const r = await api('POST', '/change-password', { newPassword: newPwd });
    if (r.success) { localStorage.setItem('bgfi_admin_token', r.newToken); showToast('Mot de passe modifié avec succès !'); e.target.reset(); }
    else showToast(r.error||'Erreur','error');
  }
  </script>`
  return c.html(adminLayout(content, 'Sécurité', 'security'))
})

export default admin
