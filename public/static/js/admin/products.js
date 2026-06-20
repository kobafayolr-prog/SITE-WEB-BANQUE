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
      // Miniature image (si existante)
      var imgThumb = p.image
        ? '<img src="' + p.image + '" style="width:48px;height:36px;object-fit:cover;border-radius:4px;border:1px solid var(--bgfi-border);flex-shrink:0;" onerror="this.style.display=\'none\'">'
        : '<div style="width:48px;height:36px;background:var(--bgfi-light);border-radius:4px;border:1px dashed var(--bgfi-border);display:flex;align-items:center;justify-content:center;flex-shrink:0;" title="Aucune image"><i class="fas fa-image" style="color:var(--bgfi-border);font-size:14px;"></i></div>';
      return '<tr>' +
        '<td><div style="display:flex;align-items:center;gap:10px;">' +
          imgThumb +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:6px;"><i class="fas ' + p.icon + '" style="color:var(--bgfi-sky);font-size:13px;"></i><span style="font-weight:600;color:var(--bgfi-navy);">' + p.title + '</span></div>' +
          '</div>' +
        '</div></td>' +
        '<td><div style="max-width:200px;font-size:12px;color:var(--bgfi-text-light);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + p.description.substring(0, 60) + '...</div></td>' +
        '<td><span class="' + (p.available ? 'badge-published' : 'badge-unavail') + '">' + (p.available ? 'Disponible' : 'Bientôt dispo') + '</span></td>' +
        '<td class="action-btns">' +
          '<button class="btn-toggle" data-id="' + p.id + '" data-avail="' + p.available + '" title="' + (p.available ? 'Désactiver' : 'Activer') + '"><i class="fas fa-' + (p.available ? 'toggle-off' : 'toggle-on') + '"></i> ' + (p.available ? 'OFF' : 'ON') + '</button>' +
          '<button class="btn-edit" data-product="' + pJson + '"><i class="fas fa-edit"></i> Modifier</button>' +
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
  var titleVal    = (p.title || '').replace(/"/g, '&quot;');
  var descVal     = p.description || '';
  var featuresVal = (p.features || []).join('\n');
  var ctaVal      = (p.cta || 'En savoir plus').replace(/"/g, '&quot;');
  var ctaUrlVal   = (p.ctaUrl || '#').replace(/"/g, '&quot;');
  var imageVal    = (p.image || '').replace(/"/g, '&quot;');
  var badgeVal    = p.badge || '';
  var checkedAttr = p.available ? ' checked' : '';

  // Détermine si l'image courante est un upload local ou une URL externe
  var isUpload = imageVal && imageVal.indexOf('/api/file/') === 0;

  var body =
    '<div class="form-group"><label>Titre</label><input type="text" id="fp-title" value="' + titleVal + '" required></div>' +
    '<div class="form-group"><label>Description</label><textarea id="fp-desc" style="min-height:80px;">' + descVal + '</textarea></div>' +
    '<div class="form-group"><label>Fonctionnalités (une par ligne)</label><textarea id="fp-features" style="min-height:100px;">' + featuresVal + '</textarea></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Texte CTA</label><input type="text" id="fp-cta" value="' + ctaVal + '"></div>' +
      '<div class="form-group"><label>URL CTA</label><input type="text" id="fp-ctaUrl" value="' + ctaUrlVal + '"></div>' +
    '</div>' +

    // ── BLOC IMAGE ──────────────────────────────────────────────
    '<div class="form-group" style="border:1px solid var(--bgfi-border);border-radius:8px;padding:16px;background:#fafbfc;">' +
      '<label style="font-size:12px;font-weight:700;color:var(--bgfi-navy);text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">' +
        '<i class="fas fa-image" style="color:var(--bgfi-sky);"></i> Image de fond de la carte' +
      '</label>' +

      // Onglets sélecteur
      '<div style="display:flex;gap:0;margin:12px 0 14px;border:1px solid var(--bgfi-border);border-radius:6px;overflow:hidden;">' +
        '<button type="button" id="fp-tab-upload" onclick="fpSwitchTab(\'upload\')" style="flex:1;padding:8px;font-size:12px;font-weight:700;border:none;cursor:pointer;background:var(--bgfi-sky);color:white;transition:all .2s;">' +
          '<i class="fas fa-upload"></i> Depuis mon PC' +
        '</button>' +
        '<button type="button" id="fp-tab-url" onclick="fpSwitchTab(\'url\')" style="flex:1;padding:8px;font-size:12px;font-weight:700;border:none;cursor:pointer;background:white;color:var(--bgfi-text-light);transition:all .2s;">' +
          '<i class="fas fa-link"></i> Lien URL' +
        '</button>' +
      '</div>' +

      // Panneau UPLOAD
      '<div id="fp-panel-upload">' +
        // Zone de drop / clic
        '<div id="fp-dropzone" onclick="document.getElementById(\'fp-file-input\').click()" ' +
          'ondragover="fpDragOver(event)" ondragleave="fpDragLeave(event)" ondrop="fpDrop(event)" ' +
          'style="border:2px dashed var(--bgfi-border);border-radius:8px;padding:28px 16px;text-align:center;cursor:pointer;transition:all .2s;background:white;">' +
          '<i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--bgfi-sky);margin-bottom:10px;display:block;"></i>' +
          '<div style="font-weight:700;color:var(--bgfi-navy);font-size:14px;margin-bottom:4px;">Cliquer pour choisir une image</div>' +
          '<div style="color:var(--bgfi-text-light);font-size:12px;">ou glisser-déposer ici</div>' +
          '<div style="color:var(--bgfi-text-light);font-size:11px;margin-top:6px;">JPG, PNG, WebP — max 5 Mo</div>' +
        '</div>' +
        '<input type="file" id="fp-file-input" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none;" onchange="fpFileSelected(this)">' +

        // Barre de progression (cachée par défaut)
        '<div id="fp-progress-wrap" style="display:none;margin-top:10px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
            '<span id="fp-progress-name" style="font-size:12px;color:var(--bgfi-text);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:70%;"></span>' +
            '<span id="fp-progress-pct" style="font-size:12px;color:var(--bgfi-sky);font-weight:700;">0%</span>' +
          '</div>' +
          '<div style="background:var(--bgfi-border);border-radius:4px;height:6px;overflow:hidden;">' +
            '<div id="fp-progress-bar" style="height:100%;background:linear-gradient(90deg,var(--bgfi-sky),var(--bgfi-blue));width:0%;transition:width .3s;border-radius:4px;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Panneau URL (caché par défaut)
      '<div id="fp-panel-url" style="display:none;">' +
        '<input type="url" id="fp-image-url" value="' + (isUpload ? '' : imageVal) + '" placeholder="https://images.unsplash.com/photo-XXX?w=800&q=80" ' +
          'oninput="fpPreviewFromUrl(this.value)" ' +
          'style="width:100%;padding:10px 12px;border:1px solid var(--bgfi-border);border-radius:6px;font-size:13px;">' +
        '<p style="font-size:11px;color:var(--bgfi-text-light);margin-top:6px;">' +
          '<i class="fas fa-info-circle"></i> Conseil : Unsplash → https://images.unsplash.com/photo-ID?w=800&amp;q=80' +
        '</p>' +
      '</div>' +

      // Champ caché qui stocke la valeur finale (URL ou /api/file/...)
      '<input type="hidden" id="fp-image" value="' + imageVal + '">' +

      // Aperçu image (affiché si image existante)
      '<div id="fp-img-preview" style="margin-top:12px;' + (imageVal ? '' : 'display:none;') + '">' +
        '<div style="position:relative;">' +
          '<img id="fp-img-thumb" src="' + imageVal + '" ' +
            'style="width:100%;height:140px;object-fit:cover;border-radius:8px;border:1px solid var(--bgfi-border);" ' +
            'onerror="this.parentElement.parentElement.style.display=\'none\'">' +
          '<div style="position:absolute;top:8px;right:8px;">' +
            '<button type="button" onclick="fpClearImage()" ' +
              'style="background:rgba(0,0,0,0.6);border:none;color:white;width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:12px;" ' +
              'title="Supprimer l\'image"><i class="fas fa-times"></i></button>' +
          '</div>' +
          '<div id="fp-img-source-badge" style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,0.65);color:white;font-size:10px;padding:3px 8px;border-radius:10px;font-weight:700;">' +
            (isUpload ? '<i class="fas fa-upload"></i> Fichier local' : '<i class="fas fa-link"></i> URL externe') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // ── FIN BLOC IMAGE ───────────────────────────────────────────

    // Badge + Disponible
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Badge</label>' +
        '<select id="fp-badge">' +
          '<option value=""'      + (badgeVal===''       ?' selected':'') + '>Aucun</option>' +
          '<option value="new"'   + (badgeVal==='new'    ?' selected':'') + '>Nouveau</option>' +
          '<option value="popular"'+(badgeVal==='popular'?' selected':'') + '>Populaire</option>' +
          '<option value="promo"' + (badgeVal==='promo'  ?' selected':'') + '>Promo</option>' +
        '</select>' +
      '</div>' +
      '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-top:22px;"><input type="checkbox" id="fp-avail"' + checkedAttr + ' style="width:auto;margin:0;"> Disponible</label></div>' +
    '</div>';

  openModal('Modifier : ' + p.title, body,
    '<button class="btn btn-primary-sm" onclick="saveProduct(' + p.id + ')"><i class="fas fa-save"></i> Sauvegarder</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );

  // Initialise l'onglet correct selon l'image existante
  fpSwitchTab(isUpload ? 'upload' : 'url');
  // Si image existante, mettre l'onglet URL sur la valeur courante
  if (imageVal && !isUpload) fpSwitchTab('url');
}

// ── Bascule entre les deux onglets ──────────────────────────────
function fpSwitchTab(tab) {
  var tabUpload  = document.getElementById('fp-tab-upload');
  var tabUrl     = document.getElementById('fp-tab-url');
  var panelUp    = document.getElementById('fp-panel-upload');
  var panelUrl   = document.getElementById('fp-panel-url');
  if (!tabUpload) return;

  var active   = 'background:var(--bgfi-sky);color:white;';
  var inactive = 'background:white;color:var(--bgfi-text-light);';

  if (tab === 'upload') {
    tabUpload.style.cssText += active;
    tabUrl.style.cssText    += inactive;
    panelUp.style.display   = 'block';
    panelUrl.style.display  = 'none';
  } else {
    tabUrl.style.cssText    += active;
    tabUpload.style.cssText += inactive;
    panelUrl.style.display  = 'block';
    panelUp.style.display   = 'none';
  }
}

// ── Drag & drop ──────────────────────────────────────────────────
function fpDragOver(e) {
  e.preventDefault();
  document.getElementById('fp-dropzone').style.borderColor = 'var(--bgfi-sky)';
  document.getElementById('fp-dropzone').style.background  = '#f0f8ff';
}
function fpDragLeave(e) {
  document.getElementById('fp-dropzone').style.borderColor = 'var(--bgfi-border)';
  document.getElementById('fp-dropzone').style.background  = 'white';
}
function fpDrop(e) {
  e.preventDefault();
  fpDragLeave(e);
  var files = e.dataTransfer.files;
  if (files && files[0]) fpUploadFile(files[0]);
}

// ── Sélection via input[file] ────────────────────────────────────
function fpFileSelected(input) {
  if (input.files && input.files[0]) fpUploadFile(input.files[0]);
}

// ── Upload réel vers /api/upload ─────────────────────────────────
async function fpUploadFile(file) {
  // Validation côté client
  var allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.type)) {
    showToast('Format non supporté. Utilisez JPG, PNG ou WebP.', 'error');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    showToast('Image trop lourde (max 5 Mo).', 'error');
    return;
  }

  // Affiche la barre de progression
  var progressWrap = document.getElementById('fp-progress-wrap');
  var progressBar  = document.getElementById('fp-progress-bar');
  var progressPct  = document.getElementById('fp-progress-pct');
  var progressName = document.getElementById('fp-progress-name');
  progressName.textContent = file.name;
  progressWrap.style.display = 'block';
  progressBar.style.width    = '0%';
  progressPct.textContent    = '0%';

  // Désactive la dropzone pendant l'upload
  var dz = document.getElementById('fp-dropzone');
  dz.style.pointerEvents = 'none';
  dz.style.opacity = '0.6';

  try {
    // Simule la progression via XHR (fetch ne supporte pas le progress upload)
    var formData = new FormData();
    formData.append('file', file);

    await new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
          var pct = Math.round((e.loaded / e.total) * 90); // jusqu'à 90% pendant l'envoi
          progressBar.style.width  = pct + '%';
          progressPct.textContent  = pct + '%';
        }
      });

      xhr.addEventListener('load', function() {
        progressBar.style.width = '100%';
        progressPct.textContent = '100%';
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch(e) { reject(new Error('Réponse invalide')); }
        } else {
          try {
            var err = JSON.parse(xhr.responseText);
            reject(new Error(err.error || 'Erreur serveur'));
          } catch(e) { reject(new Error('Erreur ' + xhr.status)); }
        }
      });

      xhr.addEventListener('error', function() { reject(new Error('Erreur réseau')); });

      var tok = localStorage.getItem('bgfi_admin_token');
      xhr.open('POST', '/api/upload');
      xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
      xhr.send(formData);
    }).then(function(result) {
      // Succès : met à jour le champ caché + preview
      document.getElementById('fp-image').value = result.url;
      fpShowPreview(result.url, true);
      showToast('Image uploadée avec succès !', 'success');
    });

  } catch(err) {
    showToast(err.message || 'Erreur lors de l\'upload', 'error');
    progressBar.style.width   = '0%';
    progressPct.textContent   = '';
    progressWrap.style.display = 'none';
  } finally {
    dz.style.pointerEvents = '';
    dz.style.opacity       = '';
  }
}

// ── Preview depuis URL ────────────────────────────────────────────
function fpPreviewFromUrl(url) {
  document.getElementById('fp-image').value = url;
  if (!url) {
    document.getElementById('fp-img-preview').style.display = 'none';
    return;
  }
  fpShowPreview(url, false);
}

// ── Affiche le preview ────────────────────────────────────────────
function fpShowPreview(url, isLocalUpload) {
  var wrap  = document.getElementById('fp-img-preview');
  var thumb = document.getElementById('fp-img-thumb');
  var badge = document.getElementById('fp-img-source-badge');
  wrap.style.display  = 'block';
  thumb.style.display = 'block';
  thumb.src = url;
  if (badge) {
    badge.innerHTML = isLocalUpload
      ? '<i class="fas fa-upload"></i> Fichier local'
      : '<i class="fas fa-link"></i> URL externe';
  }
}

// ── Supprime l'image ──────────────────────────────────────────────
function fpClearImage() {
  document.getElementById('fp-image').value          = '';
  document.getElementById('fp-image-url').value      = '';
  document.getElementById('fp-img-preview').style.display = 'none';
  document.getElementById('fp-progress-wrap').style.display = 'none';
  // Réinitialise le file input
  var fi = document.getElementById('fp-file-input');
  if (fi) fi.value = '';
}

async function saveProduct(id) {
  var data = {
    title:       document.getElementById('fp-title').value,
    description: document.getElementById('fp-desc').value,
    features:    document.getElementById('fp-features').value.split('\n').filter(function(f) { return f.trim(); }),
    cta:         document.getElementById('fp-cta').value,
    ctaUrl:      document.getElementById('fp-ctaUrl').value,
    available:   document.getElementById('fp-avail').checked,
    image:       document.getElementById('fp-image').value.trim() || undefined,
    badge:       document.getElementById('fp-badge').value || undefined
  };
  var r = await api('PUT', '/products/' + id, data);
  if (r.success) { showToast('Produit modifié !'); closeModal(); loadProducts(); }
  else showToast(r.error || 'Erreur', 'error');
}
