// ── DASHBOARD ADMIN ──
(async function() {
  try {
    var stats = await api('GET', '/stats');
    if (stats.articles) document.getElementById('stat-articles').textContent = stats.articles.published || 0;
    if (stats.products) document.getElementById('stat-products').textContent = stats.products.available || 0;
    if (stats.agencies) document.getElementById('stat-agencies').textContent = stats.agencies.total || 0;
    if (stats.preRegistrations) document.getElementById('stat-prereg').textContent = stats.preRegistrations.total || 0;

    var articles = await api('GET', '/articles?all=true');
    var recent = Array.isArray(articles) ? articles.slice(0, 4) : [];
    var recentEl = document.getElementById('recent-articles');
    if (recent.length === 0) {
      recentEl.innerHTML = '<p style="color:var(--bgfi-text-light);font-size:13px;text-align:center;padding:20px;">Aucun article</p>';
    } else {
      recentEl.innerHTML = recent.map(function(a) {
        return '<div style="padding:10px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-weight:600;font-size:13px;color:var(--bgfi-navy);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + a.title + '</div>' +
            '<div style="font-size:12px;color:var(--bgfi-text-light);">' + a.category + ' · ' + a.date + '</div>' +
          '</div>' +
          '<span class="' + (a.published ? 'badge-published' : 'badge-draft') + '">' + (a.published ? 'Publié' : 'Brouillon') + '</span>' +
        '</div>';
      }).join('');
    }

    var prereg = await api('GET', '/pre-registrations');
    var preregList = Array.isArray(prereg) ? prereg : [];
    var preregEl = document.getElementById('recent-prereg');
    if (preregList.length === 0) {
      preregEl.innerHTML = '<p style="color:var(--bgfi-text-light);font-size:13px;text-align:center;padding:20px;">Aucune pré-inscription</p>';
    } else {
      preregEl.innerHTML = preregList.slice(0, 5).map(function(p) {
        return '<div style="padding:8px 0;border-bottom:1px solid var(--bgfi-border);display:flex;justify-content:space-between;font-size:13px;gap:8px;">' +
          '<span style="color:var(--bgfi-navy);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + p.email + '</span>' +
          '<span style="background:var(--bgfi-light);padding:2px 8px;border-radius:10px;font-size:11px;white-space:nowrap;">' + p.service + '</span>' +
        '</div>';
      }).join('');
    }
  } catch(e) {
    console.error('Dashboard load error:', e);
  }
})();
