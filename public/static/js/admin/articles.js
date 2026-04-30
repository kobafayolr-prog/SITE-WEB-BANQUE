// ── ARTICLES ADMIN ──
(function() {
  document.getElementById('btnNewArticle').addEventListener('click', newArticle);
  loadArticles();
})();

async function loadArticles() {
  var arts = await api('GET', '/articles?all=true');
  var container = document.getElementById('articles-container');
  if (!Array.isArray(arts) || arts.length === 0) {
    container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucun article. Créez votre premier article !</p>';
    return;
  }
  var rows = arts.map(function(a) {
    var aJson = JSON.stringify(a).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    return '<tr>' +
      '<td><div style="font-weight:600;color:var(--bgfi-navy);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="' + a.title + '">' + a.title + '</div></td>' +
      '<td style="white-space:nowrap;">' + a.category + '</td>' +
      '<td style="white-space:nowrap;">' + a.author + '</td>' +
      '<td style="white-space:nowrap;">' + a.date + '</td>' +
      '<td><span class="' + (a.published ? 'badge-published' : 'badge-draft') + '">' + (a.published ? 'Publié' : 'Brouillon') + '</span></td>' +
      '<td class="action-btns">' +
        '<button class="btn-edit" data-article="' + aJson + '"><i class="fas fa-edit"></i></button>' +
        '<button class="btn-toggle" data-id="' + a.id + '" data-pub="' + a.published + '"><i class="fas fa-' + (a.published ? 'eye-slash' : 'eye') + '"></i></button>' +
        '<button class="btn-delete" data-id="' + a.id + '"><i class="fas fa-trash"></i></button>' +
      '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML = '<table class="admin-table"><thead><tr><th>Titre</th><th>Catégorie</th><th>Auteur</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' + rows + '</tbody></table>';

  container.querySelectorAll('.btn-edit[data-article]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var a = JSON.parse(this.getAttribute('data-article').replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      editArticle(a);
    });
  });
  container.querySelectorAll('.btn-toggle[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var pub = this.getAttribute('data-pub') === 'true';
      toggle('/articles/' + id, { published: !pub });
    });
  });
  container.querySelectorAll('.btn-delete[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      del('/articles/' + this.getAttribute('data-id'));
    });
  });
}

function articleFormHTML(a) {
  a = a || {};
  var cats = ['Vie de la banque', 'Espace PME', 'Economie RCA', 'Conseils financiers', 'Evenements'];
  var catOptions = cats.map(function(cat) {
    return '<option' + (a.category === cat ? ' selected' : '') + '>' + cat + '</option>';
  }).join('');
  var titleVal = (a.title || '').replace(/"/g, '&quot;');
  var authorVal = (a.author || 'Direction Communication').replace(/"/g, '&quot;');
  var dateVal = a.date || new Date().toISOString().split('T')[0];
  var imageVal = (a.image || '').replace(/"/g, '&quot;');
  var excerptVal = (a.excerpt || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var contentVal = (a.content || '').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var checkedAttr = a.published !== false ? ' checked' : '';

  var imagePreview = imageVal
    ? '<div id="img-preview-wrap" style="margin-top:8px;"><img id="img-preview" src="' + imageVal + '" style="max-width:100%;max-height:160px;border-radius:6px;border:1px solid var(--bgfi-border);object-fit:cover;" onerror="this.style.display=\'none\'"></div>'
    : '<div id="img-preview-wrap" style="margin-top:8px;display:none;"><img id="img-preview" src="" style="max-width:100%;max-height:160px;border-radius:6px;border:1px solid var(--bgfi-border);object-fit:cover;"></div>';

  return '<div class="form-group"><label>Titre *</label><input type="text" id="f-title" value="' + titleVal + '" required></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Catégorie</label><select id="f-category">' + catOptions + '</select></div>' +
      '<div class="form-group"><label>Auteur</label><input type="text" id="f-author" value="' + authorVal + '"></div>' +
    '</div>' +
    '<div class="form-group"><label>Date</label><input type="date" id="f-date" value="' + dateVal + '"></div>' +
    '<div class="form-group">' +
      '<label>Image de couverture</label>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">' +
        '<label class="btn btn-outline" style="cursor:pointer;margin:0;padding:8px 14px;font-size:12px;" for="f-image-file"><i class="fas fa-upload" style="margin-right:6px;"></i>Choisir une image</label>' +
        '<input type="file" id="f-image-file" accept="image/*" style="display:none;" onchange="handleArticleImageUpload(this)">' +
        '<span style="color:var(--bgfi-text-light);font-size:12px;">ou</span>' +
        '<input type="url" id="f-image" placeholder="https://... (URL directe)" value="' + imageVal + '" style="flex:1;min-width:180px;padding:8px 12px;border:1px solid var(--bgfi-border);border-radius:6px;font-size:13px;" oninput="previewImageFromUrl(this.value)">' +
      '</div>' +
      '<div id="upload-progress" style="display:none;margin-top:8px;font-size:12px;color:var(--bgfi-sky);"><i class="fas fa-spinner fa-spin"></i> Téléchargement en cours...</div>' +
      imagePreview +
    '</div>' +
    '<div class="form-group"><label>Résumé *</label><textarea id="f-excerpt" style="min-height:70px;" required>' + excerptVal + '</textarea></div>' +
    '<div class="form-group"><label>Contenu (HTML autorisé) *</label><textarea id="f-content" style="min-height:160px;" required>' + contentVal + '</textarea></div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="f-published"' + checkedAttr + ' style="width:auto;margin:0;"> Publié (visible sur le site)</label></div>';
}

function previewImageFromUrl(url) {
  var wrap = document.getElementById('img-preview-wrap');
  var img = document.getElementById('img-preview');
  if (url && wrap && img) {
    img.src = url;
    wrap.style.display = 'block';
  } else if (wrap) {
    wrap.style.display = 'none';
  }
}

async function handleArticleImageUpload(input) {
  var file = input.files && input.files[0];
  if (!file) return;

  var progress = document.getElementById('upload-progress');
  if (progress) progress.style.display = 'block';

  var token = localStorage.getItem('bgfi_admin_token');
  var formData = new FormData();
  formData.append('file', file);

  try {
    var resp = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      body: formData
    });
    var result = await resp.json();
    if (result.success && result.url) {
      document.getElementById('f-image').value = result.url;
      previewImageFromUrl(result.url);
      showToast('Image téléchargée !', 'success');
    } else {
      showToast(result.error || 'Erreur upload', 'error');
    }
  } catch (e) {
    showToast('Erreur lors du téléchargement', 'error');
  } finally {
    if (progress) progress.style.display = 'none';
  }
}

function newArticle() {
  openModal('Nouvel article', articleFormHTML(null),
    '<button class="btn btn-primary-sm" onclick="saveArticle()"><i class="fas fa-save"></i> Publier</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

function editArticle(a) {
  openModal("Modifier l'article", articleFormHTML(a),
    '<button class="btn btn-primary-sm" onclick="saveArticle(' + a.id + ')"><i class="fas fa-save"></i> Sauvegarder</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

async function saveArticle(id) {
  var title = document.getElementById('f-title').value.trim();
  if (!title) { showToast('Le titre est obligatoire', 'error'); return; }
  var data = {
    title: title,
    category: document.getElementById('f-category').value,
    author: document.getElementById('f-author').value,
    date: document.getElementById('f-date').value,
    image: document.getElementById('f-image').value,
    excerpt: document.getElementById('f-excerpt').value,
    content: document.getElementById('f-content').value,
    published: document.getElementById('f-published').checked,
    slug: title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '')
  };
  var r = id ? await api('PUT', '/articles/' + id, data) : await api('POST', '/articles', data);
  if (r.success || r.article) {
    showToast(id ? 'Article modifié !' : 'Article créé !');
    closeModal();
    loadArticles();
  } else {
    showToast(r.error || 'Erreur lors de la sauvegarde', 'error');
  }
}
