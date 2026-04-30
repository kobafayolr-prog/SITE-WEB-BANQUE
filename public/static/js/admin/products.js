// ── PRODUCTS ADMIN ──
(function() {
  loadProducts();
})();

async function loadProducts() {
  var prods = await api('GET', '/products');
  var container = document.getElementById('products-container');
  if (!Array.isArray(prods) || prods.length === 0) {
    container.innerHTML = '<div class="admin-card"><p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucun produit trouvé.</p></div>';
    return;
  }
  var segments = ['particuliers', 'professionnels', 'entreprises', 'banque-privee'];
  var segLabels = { particuliers: 'Particuliers', professionnels: 'Professionnels', entreprises: 'Entreprises & Institutions', 'banque-privee': 'Banque Privée' };
  var html = '';
  segments.forEach(function(seg) {
    var sp = prods.filter(function(p) { return p.segment === seg; });
    if (!sp.length) return;
    var rows = sp.map(function(p) {
      var pJson = JSON.stringify(p).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      return '<tr>' +
        '<td><div style="display:flex;align-items:center;gap:8px;"><i class="fas ' + p.icon + '" style="color:var(--bgfi-sky);width:20px;flex-shrink:0;"></i><div style="font-weight:600;color:var(--bgfi-navy);">' + p.title + '</div></div></td>' +
        '<td><div style="max-width:200px;font-size:12px;color:var(--bgfi-text-light);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + p.description.substring(0, 60) + '...</div></td>' +
        '<td><span class="' + (p.available ? 'badge-published' : 'badge-unavail') + '">' + (p.available ? 'Disponible' : 'Bientôt dispo') + '</span></td>' +
        '<td class="action-btns">' +
          '<button class="btn-toggle" data-id="' + p.id + '" data-avail="' + p.available + '" title="' + (p.available ? 'Désactiver' : 'Activer') + '"><i class="fas fa-' + (p.available ? 'toggle-off' : 'toggle-on') + '"></i> ' + (p.available ? 'OFF' : 'ON') + '</button>' +
          '<button class="btn-edit" data-product="' + pJson + '"><i class="fas fa-edit"></i></button>' +
        '</td>' +
      '</tr>';
    }).join('');
    html += '<div class="admin-card" style="margin-bottom:20px;"><h2><i class="fas fa-tag"></i>' + segLabels[seg] + '</h2>' +
      '<div class="table-wrap"><table class="admin-table"><thead><tr><th>Produit</th><th>Description</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  });
  container.innerHTML = html;

  container.querySelectorAll('.btn-toggle[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var avail = this.getAttribute('data-avail') === 'true';
      toggle('/products/' + id, { available: !avail });
    });
  });
  container.querySelectorAll('.btn-edit[data-product]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var p = JSON.parse(this.getAttribute('data-product').replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      editProductModal(p);
    });
  });
}

function editProductModal(p) {
  var titleVal = (p.title || '').replace(/"/g, '&quot;');
  var descVal = p.description || '';
  var featuresVal = (p.features || []).join('\n');
  var ctaVal = (p.cta || 'En savoir plus').replace(/"/g, '&quot;');
  var ctaUrlVal = (p.ctaUrl || '#').replace(/"/g, '&quot;');
  var checkedAttr = p.available ? ' checked' : '';

  var body =
    '<div class="form-group"><label>Titre</label><input type="text" id="fp-title" value="' + titleVal + '" required></div>' +
    '<div class="form-group"><label>Description</label><textarea id="fp-desc" style="min-height:80px;">' + descVal + '</textarea></div>' +
    '<div class="form-group"><label>Fonctionnalités (une par ligne)</label><textarea id="fp-features" style="min-height:100px;">' + featuresVal + '</textarea></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Texte CTA</label><input type="text" id="fp-cta" value="' + ctaVal + '"></div>' +
      '<div class="form-group"><label>URL CTA</label><input type="text" id="fp-ctaUrl" value="' + ctaUrlVal + '"></div>' +
    '</div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fp-avail"' + checkedAttr + ' style="width:auto;margin:0;"> Disponible</label></div>';

  openModal('Modifier : ' + p.title, body,
    '<button class="btn btn-primary-sm" onclick="saveProduct(' + p.id + ')"><i class="fas fa-save"></i> Sauvegarder</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

async function saveProduct(id) {
  var data = {
    title: document.getElementById('fp-title').value,
    description: document.getElementById('fp-desc').value,
    features: document.getElementById('fp-features').value.split('\n').filter(function(f) { return f.trim(); }),
    cta: document.getElementById('fp-cta').value,
    ctaUrl: document.getElementById('fp-ctaUrl').value,
    available: document.getElementById('fp-avail').checked
  };
  var r = await api('PUT', '/products/' + id, data);
  if (r.success) { showToast('Produit modifié !'); closeModal(); loadProducts(); }
  else showToast(r.error || 'Erreur', 'error');
}
