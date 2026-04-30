// ── PRE-REGISTRATIONS ADMIN ──
(async function() {
  var items = await api('GET', '/pre-registrations');
  var container = document.getElementById('prereg-container');
  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucune pré-inscription pour le moment.</p>';
    return;
  }
  var byService = {};
  items.forEach(function(i) {
    if (!byService[i.service]) byService[i.service] = [];
    byService[i.service].push(i);
  });
  var statCards = Object.keys(byService).map(function(s) {
    return '<div class="stat-card"><div class="stat-icon" style="background:var(--bgfi-sky);font-size:16px;"><i class="fas fa-bell"></i></div><div><div class="stat-value">' + byService[s].length + '</div><div class="stat-label">' + s + '</div></div></div>';
  }).join('');
  var rows = items.map(function(i) {
    return '<tr>' +
      '<td style="font-weight:600;color:var(--bgfi-navy);">' + i.email + '</td>' +
      '<td><span style="background:var(--bgfi-light);padding:3px 10px;border-radius:10px;font-size:12px;">' + i.service + '</span></td>' +
      '<td style="font-size:13px;white-space:nowrap;">' + new Date(i.date).toLocaleString('fr-FR') + '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML =
    '<div class="grid-4" style="margin-bottom:24px;">' + statCards + '</div>' +
    '<table class="admin-table"><thead><tr><th>Email</th><th>Service</th><th>Date</th></tr></thead><tbody>' + rows + '</tbody></table>';
})();
