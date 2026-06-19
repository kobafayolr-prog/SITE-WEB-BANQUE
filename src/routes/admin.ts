// ============================================================
// ADMIN ROUTES — BGFIBank Centrafrique
// Scripts inline remplacés par fichiers JS externes
// pour éviter les conflits de template literals
// ============================================================

import { Hono } from 'hono'

const admin = new Hono()

// ── LAYOUT COMMUN ─────────────────────────────────────────────
const adminLayout = (content: string, title = 'Dashboard', activePage = '', jsFile = '') => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Admin BGFIBank RCA</title>
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bgfi-light);font-family:'Source Sans 3',sans-serif;color:var(--bgfi-text);}
    #admin-layout{display:flex;min-height:100vh;}
    #admin-sidebar{width:240px;background:var(--bgfi-navy);color:white;display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;height:100vh;overflow-y:auto;z-index:200;transition:transform .3s;}
    .admin-logo{display:flex;align-items:center;gap:10px;padding:20px 16px;border-bottom:1px solid rgba(255,255,255,0.1);}
    .admin-logo span{font-weight:700;font-size:14px;color:white;}
    .admin-logo .badge{font-size:10px;background:var(--bgfi-sky);padding:1px 6px;border-radius:10px;color:white;font-weight:600;}
    #admin-nav{padding:12px 0;flex:1;}
    #admin-nav .nav-section{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.4);padding:14px 16px 6px;font-weight:700;}
    #admin-nav a{display:flex;align-items:center;gap:10px;padding:10px 16px;color:rgba(255,255,255,0.75);text-decoration:none;font-size:13px;transition:all .2s;}
    #admin-nav a:hover,#admin-nav a.active{background:rgba(255,255,255,0.1);color:white;}
    #admin-nav a.active{border-left:3px solid var(--bgfi-sky);}
    #admin-nav a i{width:18px;text-align:center;font-size:14px;}
    #admin-topbar{position:sticky;top:0;z-index:100;background:white;border-bottom:1px solid var(--bgfi-border);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
    #admin-topbar h1{font-size:18px;font-weight:700;color:var(--bgfi-navy);}
    .admin-user{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bgfi-text-light);}
    #menu-toggle{display:none;background:none;border:none;font-size:22px;color:var(--bgfi-navy);cursor:pointer;padding:4px 8px;}
    #sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:199;}
    #admin-content{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column;}
    .admin-main{padding:24px;flex:1;}
    .admin-card{background:white;border-radius:8px;padding:24px;border:1px solid var(--bgfi-border);margin-bottom:20px;}
    .admin-card h2{font-size:16px;font-weight:700;color:var(--bgfi-navy);margin-bottom:20px;display:flex;align-items:center;gap:8px;}
    .admin-card h2 i{color:var(--bgfi-sky);}
    .admin-table{width:100%;border-collapse:collapse;font-size:13px;}
    .admin-table thead tr{background:var(--bgfi-light);}
    .admin-table th{padding:10px 12px;text-align:left;font-weight:700;color:var(--bgfi-navy);font-size:12px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;}
    .admin-table td{padding:12px;border-bottom:1px solid var(--bgfi-border);vertical-align:middle;}
    .admin-table tr:last-child td{border-bottom:none;}
    .admin-table tr:hover td{background:#fafbfc;}
    .table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:8px;}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;}
    .stat-card{background:white;border-radius:8px;padding:16px;border:1px solid var(--bgfi-border);display:flex;align-items:center;gap:14px;}
    .stat-icon{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;flex-shrink:0;}
    .stat-value{font-size:24px;font-weight:700;color:var(--bgfi-navy);}
    .stat-label{font-size:12px;color:var(--bgfi-text-light);}
    .form-group{margin-bottom:16px;}
    .form-group label{display:block;font-size:12px;font-weight:700;color:var(--bgfi-navy);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
    .form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border:1px solid var(--bgfi-border);border-radius:6px;font-size:13px;color:var(--bgfi-text);background:white;font-family:inherit;transition:border-color .2s;}
    .form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--bgfi-sky);box-shadow:0 0 0 3px rgba(13,145,208,.1);}
    .form-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
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
    .badge-published{background:#dcfce7;color:#16a34a;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .badge-draft{background:#fef9c3;color:#ca8a04;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .badge-unavail{background:#fee2e2;color:#dc2626;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .agency-type{background:var(--bgfi-sky);color:white;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;}
    .agency-type.gab{background:var(--bgfi-p4);}
    .toast{position:fixed;bottom:24px;right:24px;background:var(--bgfi-navy);color:white;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;opacity:0;transform:translateY(20px);transition:all .3s;z-index:9999;max-width:320px;}
    .toast.show{opacity:1;transform:translateY(0);}
    .toast.success{background:#16a34a;}
    .toast.error{background:var(--bgfi-p5);}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:none;align-items:center;justify-content:center;padding:16px;}
    .modal-overlay.open{display:flex;}
    .modal{background:white;border-radius:12px;width:100%;max-width:620px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;}
    .modal-header{padding:20px 24px;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}
    .modal-header h3{font-size:16px;font-weight:700;color:var(--bgfi-navy);}
    .modal-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--bgfi-text-light);line-height:1;}
    .modal-body{padding:24px;overflow-y:auto;flex:1;}
    .modal-footer{padding:16px 24px;border-top:1px solid var(--bgfi-border);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0;}
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
    var token = localStorage.getItem('bgfi_admin_token');
    if (!token && window.location.pathname.indexOf('/admin/login') === -1) {
      window.location.href = '/admin/login';
    }
    function showToast(msg, type) {
      type = type || 'success';
      var t = document.getElementById('toast');
      if (!t) return;
      t.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + msg;
      t.className = 'toast show ' + type;
      setTimeout(function() { t.className = 'toast'; }, 3500);
    }
    function openModal(title, body, footer) {
      footer = footer || '';
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-body').innerHTML = body;
      document.getElementById('modal-footer').innerHTML = footer;
      document.getElementById('modal').classList.add('open');
    }
    function closeModal() {
      document.getElementById('modal').classList.remove('open');
    }
    async function api(method, path, data) {
      data = data || null;
      try {
        var opts = { method: method, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } };
        if (data) opts.body = JSON.stringify(data);
        var res = await fetch('/api' + path, opts);
        if (res.status === 401) { localStorage.removeItem('bgfi_admin_token'); window.location.href = '/admin/login'; return {}; }
        return await res.json();
      } catch(e) {
        console.error('API error', e);
        showToast('Erreur de connexion au serveur', 'error');
        return {};
      }
    }
    async function del(path) {
      if (!confirm('Confirmer la suppression ?')) return;
      var r = await api('DELETE', path);
      if (r.success) { showToast('Supprime avec succes'); setTimeout(function() { location.reload(); }, 800); }
      else showToast(r.error || 'Erreur', 'error');
    }
    async function toggle(path, data) {
      var r = await api('PUT', path, data);
      if (r.success) { showToast('Mis a jour'); setTimeout(function() { location.reload(); }, 800); }
      else showToast(r.error || 'Erreur', 'error');
    }
    function toggleSidebar() {
      document.getElementById('admin-sidebar').classList.toggle('open');
      document.getElementById('sidebar-overlay').classList.toggle('open');
    }
  </script>
</head>
<body>
<div id="sidebar-overlay" onclick="toggleSidebar()"></div>
<div id="admin-layout">
  <aside id="admin-sidebar">
    <div class="admin-logo">
      <div style="width:36px;height:36px;background:var(--bgfi-sky);border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:white;flex-shrink:0;">BGFI</div>
      <div><span>BGFIBank RCA</span><div class="badge">Admin</div></div>
    </div>
    <nav id="admin-nav">
      <div class="nav-section">Principal</div>
      <a href="/admin/dashboard" class="${activePage==='dashboard'?'active':''}"><i class="fas fa-tachometer-alt"></i> Tableau de bord</a>
      <a href="/admin/settings" class="${activePage==='settings'?'active':''}"><i class="fas fa-cog"></i> Parametres</a>
      <div class="nav-section">Contenu</div>
      <a href="/admin/articles" class="${activePage==='articles'?'active':''}"><i class="fas fa-newspaper"></i> Actualites</a>
      <a href="/admin/products" class="${activePage==='products'?'active':''}"><i class="fas fa-th-large"></i> Produits &amp; Services</a>
      <a href="/admin/testimonials" class="${activePage==='testimonials'?'active':''}"><i class="fas fa-quote-left"></i> Temoignages</a>
      <div class="nav-section">Services</div>
      <a href="/admin/agencies" class="${activePage==='agencies'?'active':''}"><i class="fas fa-map-marker-alt"></i> Agences &amp; GAB</a>
      <a href="/admin/jobs" class="${activePage==='jobs'?'active':''}"><i class="fas fa-briefcase"></i> Offres d'emploi</a>
      <a href="/admin/preregistrations" class="${activePage==='prereg'?'active':''}"><i class="fas fa-bell"></i> Pre-inscriptions</a>
      <a href="/admin/messages" class="${activePage==='messages'?'active':''}"><i class="fas fa-envelope"></i> Messages recus</a>
      <div class="nav-section">Compte</div>
      <a href="/admin/security" class="${activePage==='security'?'active':''}"><i class="fas fa-shield-alt"></i> Securite</a>
      <a href="/" target="_blank"><i class="fas fa-external-link-alt"></i> Voir le site</a>
      <a href="/admin/logout" style="color:rgba(255,100,100,0.8);"><i class="fas fa-sign-out-alt"></i> Deconnexion</a>
    </nav>
  </aside>
  <div id="admin-content">
    <div id="admin-topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button id="menu-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
        <h1>${title}</h1>
      </div>
      <div class="admin-user">
        <div style="width:32px;height:32px;background:var(--bgfi-sky);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:12px;">A</div>
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
      <h3 id="modal-title"></h3>
      <button class="modal-close" onclick="closeModal()">&#x2715;</button>
    </div>
    <div class="modal-body" id="modal-body"></div>
    <div class="modal-footer" id="modal-footer"></div>
  </div>
</div>
<script>
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === document.getElementById('modal')) closeModal();
  });
</script>
${jsFile ? '<script src="' + jsFile + '"></script>' : ''}
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
      <p style="color:var(--bgfi-text-light);font-size:14px;margin-top:4px;">Acces Administrateur</p>
    </div>
    <div class="login-card">
      <form onsubmit="login(event)">
        <div class="form-group">
          <label><i class="fas fa-lock" style="margin-right:4px;"></i> Mot de passe</label>
          <input type="password" id="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" autocomplete="current-password" required>
        </div>
        <div id="loginError" style="color:#dc2626;font-size:13px;margin-bottom:12px;display:none;padding:8px 12px;background:#fef2f2;border-radius:4px;"><i class="fas fa-exclamation-circle" style="margin-right:4px;"></i>Mot de passe incorrect</div>
        <button type="submit" class="btn-login" id="loginBtn"><i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter</button>
      </form>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <a href="/" style="font-size:13px;color:var(--bgfi-text-light);text-decoration:none;"><i class="fas fa-arrow-left" style="margin-right:4px;"></i>Retour au site</a>
    </div>
  </div>
  <script>
    if (localStorage.getItem('bgfi_admin_token')) window.location.href = '/admin/dashboard';
    async function login(e) {
      e.preventDefault();
      var btn = document.getElementById('loginBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
      btn.disabled = true;
      document.getElementById('loginError').style.display = 'none';
      var password = document.getElementById('password').value;
      try {
        var res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: password }) });
        var data = await res.json();
        if (data.success) {
          localStorage.setItem('bgfi_admin_token', data.token);
          window.location.href = '/admin/dashboard';
        } else {
          document.getElementById('loginError').style.display = 'block';
          btn.innerHTML = '<i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter';
          btn.disabled = false;
        }
      } catch(err) {
        btn.innerHTML = '<i class="fas fa-sign-in-alt" style="margin-right:6px;"></i>Se connecter';
        btn.disabled = false;
      }
    }
  </script>
</body>
</html>`)
})

admin.get('/logout', (c) => {
  return c.html('<script>localStorage.removeItem(\'bgfi_admin_token\');window.location.href=\'/admin/login\';</script>')
})

// ── DASHBOARD ─────────────────────────────────────────────────
admin.get('/dashboard', (c) => {
  const content = `
  <div class="grid-4">
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);"><i class="fas fa-newspaper"></i></div><div><div class="stat-value" id="stat-articles">&#8212;</div><div class="stat-label">Articles publiés</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#16a34a;"><i class="fas fa-th-large"></i></div><div><div class="stat-value" id="stat-products">&#8212;</div><div class="stat-label">Produits actifs</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p4);"><i class="fas fa-map-marker-alt"></i></div><div><div class="stat-value" id="stat-agencies">&#8212;</div><div class="stat-label">Agences &amp; GAB</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-p6);"><i class="fas fa-bell"></i></div><div><div class="stat-value" id="stat-prereg">&#8212;</div><div class="stat-label">Pré-inscriptions</div></div></div>
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
  </div>`
  return c.html(adminLayout(content, 'Tableau de bord', 'dashboard', '/static/js/admin/dashboard.js'))
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
        <input type="text" id="heroImage" placeholder="/static/images/hero-bgfi.jpg" style="font-size:12px;">
        <small style="color:var(--bgfi-text-light);font-size:11px;">URL externe (https://...) ou chemin (/static/images/...)</small>
        <div id="heroImagePreview" style="margin-top:10px;display:none;">
          <img id="heroImgTag" src="" alt="Apercu" style="max-width:100%;max-height:200px;border-radius:8px;border:2px solid var(--bgfi-border);object-fit:cover;">
        </div>
      </div>
      <hr style="border:none;border-top:1px solid var(--bgfi-border);margin:20px 0;">
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-envelope-open-text" style="color:var(--bgfi-sky);margin-right:8px;"></i>Configuration Email (Resend)</h3>
      <div style="background:#fffbeb;border:1px solid #f59e0b;border-radius:8px;padding:14px;margin-bottom:16px;font-size:13px;color:#92400e;">
        <i class="fas fa-info-circle" style="margin-right:6px;"></i>
        Créez un compte gratuit sur <a href="https://resend.com" target="_blank" style="color:#0d91d0;font-weight:700;">resend.com</a> (100 emails/jour gratuits).
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
      <h3 style="font-size:14px;font-weight:700;color:var(--bgfi-navy);margin-bottom:16px;"><i class="fas fa-chart-bar" style="color:var(--bgfi-sky);margin-right:8px;"></i>Chiffres clés (bandeau page d'accueil)</h3>
      <p style="font-size:12px;color:var(--bgfi-text-light);margin-bottom:16px;"><i class="fas fa-info-circle" style="margin-right:4px;"></i>Ces 4 statistiques apparaissent sur le hero de la page d'accueil. Vous pouvez les modifier à tout moment.</p>
      <div class="form-grid-2">
        <div class="form-group"><label>Stat 1 — Valeur <span style="color:var(--bgfi-text-light);font-weight:400;">(ex: 5+)</span></label><input type="text" id="stat1Value" placeholder="5+"></div>
        <div class="form-group"><label>Stat 1 — Libellé</label><input type="text" id="stat1Label" placeholder="Ans d'expérience"></div>
        <div class="form-group"><label>Stat 2 — Valeur <span style="color:var(--bgfi-text-light);font-weight:400;">(ex: 12)</span></label><input type="text" id="stat2Value" placeholder="12"></div>
        <div class="form-group"><label>Stat 2 — Libellé</label><input type="text" id="stat2Label" placeholder="Pays africains"></div>
        <div class="form-group"><label>Stat 3 — Valeur <span style="color:var(--bgfi-text-light);font-weight:400;">(ex: 10K+)</span></label><input type="text" id="stat3Value" placeholder="10K+"></div>
        <div class="form-group"><label>Stat 3 — Libellé</label><input type="text" id="stat3Label" placeholder="Clients actifs"></div>
        <div class="form-group"><label>Stat 4 — Valeur <span style="color:var(--bgfi-text-light);font-weight:400;">(ex: 24h)</span></label><input type="text" id="stat4Value" placeholder="24h"></div>
        <div class="form-group"><label>Stat 4 — Libellé</label><input type="text" id="stat4Label" placeholder="Service en ligne"></div>
      </div>
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
  </div>`
  return c.html(adminLayout(content, 'Paramètres du site', 'settings', '/static/js/admin/settings.js'))
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
      <div id="articles-container" style="padding:16px;">
        <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
          <p style="margin-top:12px;">Chargement des articles...</p>
        </div>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Gestion des Actualités', 'articles', '/static/js/admin/articles.js'))
})

// ── PRODUCTS ──────────────────────────────────────────────────
admin.get('/products', (c) => {
  const content = `
  <div style="margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Gérez les produits et services. Activez/désactivez le badge "Bientôt disponible".</p>
  </div>
  <div id="products-container">
    <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
      <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
      <p style="margin-top:12px;">Chargement des produits...</p>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Produits & Services', 'products', '/static/js/admin/products.js'))
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
      <div id="agencies-container" style="padding:16px;">
        <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
          <p style="margin-top:12px;">Chargement...</p>
        </div>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Agences & GAB', 'agencies', '/static/js/admin/agencies.js'))
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
      <div id="jobs-container" style="padding:16px;">
        <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
          <p style="margin-top:12px;">Chargement...</p>
        </div>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, "Offres d'emploi", 'jobs', '/static/js/admin/jobs.js'))
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
      <div id="testimonials-container" style="padding:16px;">
        <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
          <p style="margin-top:12px;">Chargement...</p>
        </div>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Témoignages Clients', 'testimonials', '/static/js/admin/testimonials.js'))
})

// ── PRE-REGISTRATIONS ─────────────────────────────────────────
admin.get('/preregistrations', (c) => {
  const content = `
  <div style="margin-bottom:20px;">
    <p style="color:var(--bgfi-text-light);font-size:14px;">Emails collectés via les formulaires "Bientôt disponible" et la newsletter</p>
  </div>
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div class="table-wrap">
      <div id="prereg-container" style="padding:16px;">
        <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
          <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
          <p style="margin-top:12px;">Chargement...</p>
        </div>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Pré-inscriptions', 'prereg', '/static/js/admin/preregistrations.js'))
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
    <div id="msgList">
      <div style="text-align:center;padding:40px;color:var(--bgfi-text-light);">
        <i class="fas fa-spinner fa-spin" style="font-size:24px;"></i>
        <p style="margin-top:12px;">Chargement...</p>
      </div>
    </div>
  </div>`
  return c.html(adminLayout(content, 'Messages reçus', 'messages', '/static/js/admin/messages.js'))
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
    var current = document.getElementById('currentPwd').value;
    var newPwd = document.getElementById('newPwd').value;
    var confirm = document.getElementById('confirmPwd').value;
    if (newPwd !== confirm) { showToast('Les mots de passe ne correspondent pas', 'error'); return; }
    if (current !== token) { showToast('Mot de passe actuel incorrect', 'error'); return; }
    var r = await api('POST', '/change-password', { newPassword: newPwd });
    if (r.success) { localStorage.setItem('bgfi_admin_token', r.newToken); showToast('Mot de passe modifie avec succes !'); e.target.reset(); }
    else showToast(r.error || 'Erreur', 'error');
  }
  </script>`
  return c.html(adminLayout(content, 'Sécurité', 'security'))
})

export default admin
