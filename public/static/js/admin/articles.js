// ── ARTICLES ADMIN ──
(function() {
  document.getElementById('btnNewArticle').addEventListener('click', newArticle);
  loadArticles();
})();

async function loadArticles() {
  const arts = await api('GET', '/articles?all=true');
  const container = document.getElementById('articles-container');
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
  var imageVal = (a.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80').replace(/"/g, '&quot;');
  var excerptVal = a.excerpt || '';
  var contentVal = a.content || '';
  var checkedAttr = a.published !== false ? ' checked' : '';

  return '<div class="form-group"><label>Titre *</label><input type="text" id="f-title" value="' + titleVal + '" required></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Categorie</label><select id="f-category">' + catOptions + '</select></div>' +
      '<div class="form-group"><label>Auteur</label><input type="text" id="f-author" value="' + authorVal + '"></div>' +
    '</div>' +
    '<div class="form-group"><label>Date</label><input type="date" id="f-date" value="' + dateVal + '"></div>' +
    '<div class="form-group"><label>Image URL</label><input type="url" id="f-image" value="' + imageVal + '"></div>' +
    '<div class="form-group"><label>Resume *</label><textarea id="f-excerpt" style="min-height:70px;" required>' + excerptVal + '</textarea></div>' +
    '<div class="form-group"><label>Contenu (HTML autorise) *</label><textarea id="f-content" style="min-height:160px;" required>' + contentVal + '</textarea></div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="f-published"' + checkedAttr + ' style="width:auto;margin:0;"> Publie (visible sur le site)</label></div>';
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
    showToast(id ? 'Article modifie !' : 'Article cree !');
    closeModal();
    loadArticles();
  } else {
    showToast(r.error || 'Erreur lors de la sauvegarde', 'error');
  }
}
