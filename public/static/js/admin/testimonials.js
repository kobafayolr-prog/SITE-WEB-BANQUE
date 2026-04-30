// ── TESTIMONIALS ADMIN ──
(function() {
  document.getElementById('btnNewTestimonial').addEventListener('click', newTestimonial);
  loadTestimonials();
})();

async function loadTestimonials() {
  var items = await api('GET', '/testimonials?all=true');
  var container = document.getElementById('testimonials-container');
  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucun témoignage</p>';
    return;
  }
  var rows = items.map(function(t) {
    return '<tr>' +
      '<td style="font-weight:600;color:var(--bgfi-navy);white-space:nowrap;">' + t.name + '</td>' +
      '<td style="font-size:13px;">' + t.role + '</td>' +
      '<td style="font-size:13px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + t.content.substring(0, 70) + '...</td>' +
      '<td><span class="' + (t.published ? 'badge-published' : 'badge-draft') + '">' + (t.published ? 'Publié' : 'Masqué') + '</span></td>' +
      '<td class="action-btns">' +
        '<button class="btn-toggle" data-id="' + t.id + '" data-pub="' + t.published + '"><i class="fas fa-' + (t.published ? 'eye-slash' : 'eye') + '"></i></button>' +
        '<button class="btn-delete" data-id="' + t.id + '"><i class="fas fa-trash"></i></button>' +
      '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML = '<table class="admin-table"><thead><tr><th>Client</th><th>Rôle</th><th>Témoignage</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' + rows + '</tbody></table>';

  container.querySelectorAll('.btn-toggle[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var pub = this.getAttribute('data-pub') === 'true';
      toggle('/testimonials/' + id, { published: !pub });
    });
  });
  container.querySelectorAll('.btn-delete[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      del('/testimonials/' + this.getAttribute('data-id'));
    });
  });
}

function newTestimonial() {
  var body =
    '<div class="form-group"><label>Nom du client *</label><input type="text" id="ft-name" required placeholder="Ex: Jean Kouassi"></div>' +
    '<div class="form-group"><label>Rôle / Activité</label><input type="text" id="ft-role" placeholder="Ex: Entrepreneur, Bangui"></div>' +
    '<div class="form-group"><label>Initiales (avatar, max 3 lettres)</label><input type="text" id="ft-avatar" placeholder="Ex: JK" maxlength="3"></div>' +
    '<div class="form-group"><label>Témoignage *</label><textarea id="ft-content" required style="min-height:100px;" placeholder="Votre expérience avec BGFIBank..."></textarea></div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="ft-pub" checked style="width:auto;margin:0;"> Publier immédiatement</label></div>';

  openModal('Nouveau témoignage', body,
    '<button class="btn btn-primary-sm" onclick="saveTestimonial()"><i class="fas fa-save"></i> Ajouter</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

async function saveTestimonial() {
  var name = document.getElementById('ft-name').value.trim();
  if (!name) { showToast('Le nom est obligatoire', 'error'); return; }
  var data = {
    name: name,
    role: document.getElementById('ft-role').value,
    avatar: document.getElementById('ft-avatar').value,
    content: document.getElementById('ft-content').value,
    published: document.getElementById('ft-pub').checked
  };
  var r = await api('POST', '/testimonials', data);
  if (r.success) { showToast('Témoignage ajouté !'); closeModal(); loadTestimonials(); }
  else showToast(r.error || 'Erreur', 'error');
}
