// ── JOBS ADMIN ──
(function() {
  document.getElementById('btnNewJob').addEventListener('click', newJob);
  loadJobs();
})();

async function loadJobs() {
  var jobs = await api('GET', '/jobs?all=true');
  var container = document.getElementById('jobs-container');
  if (!Array.isArray(jobs) || jobs.length === 0) {
    container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;"><i class="fas fa-inbox" style="font-size:32px;display:block;margin-bottom:12px;"></i>Aucune offre d\'emploi.</p>';
    return;
  }
  var rows = jobs.map(function(j) {
    return '<tr>' +
      '<td style="font-weight:600;color:var(--bgfi-navy);">' + j.title + '</td>' +
      '<td style="font-size:13px;">' + j.department + '</td>' +
      '<td><span style="background:var(--bgfi-sky);color:white;padding:2px 8px;border-radius:10px;font-size:11px;white-space:nowrap;">' + j.type + '</span></td>' +
      '<td style="font-size:13px;">' + j.location + '</td>' +
      '<td><span class="' + (j.published ? 'badge-published' : 'badge-draft') + '">' + (j.published ? 'Publié' : 'Archivé') + '</span></td>' +
      '<td class="action-btns">' +
        '<button class="btn-toggle" data-id="' + j.id + '" data-pub="' + j.published + '"><i class="fas fa-' + (j.published ? 'eye-slash' : 'eye') + '"></i></button>' +
        '<button class="btn-delete" data-id="' + j.id + '"><i class="fas fa-trash"></i></button>' +
      '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML = '<table class="admin-table"><thead><tr><th>Poste</th><th>Département</th><th>Type</th><th>Lieu</th><th>Statut</th><th>Actions</th></tr></thead><tbody>' + rows + '</tbody></table>';

  container.querySelectorAll('.btn-toggle[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var pub = this.getAttribute('data-pub') === 'true';
      toggle('/jobs/' + id, { published: !pub });
    });
  });
  container.querySelectorAll('.btn-delete[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      del('/jobs/' + this.getAttribute('data-id'));
    });
  });
}

function newJob() {
  var body =
    '<div class="form-group"><label>Titre du poste *</label><input type="text" id="fj-title" required placeholder="Ex: Chargé de clientèle"></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Département</label><input type="text" id="fj-dept" placeholder="Commerce & Relation Client"></div>' +
      '<div class="form-group"><label>Type de contrat</label><select id="fj-type"><option>CDI</option><option>CDD</option><option>Stage</option></select></div>' +
    '</div>' +
    '<div class="form-group"><label>Lieu</label><input type="text" id="fj-loc" value="Bangui"></div>' +
    '<div class="form-group"><label>Description *</label><textarea id="fj-desc" required style="min-height:100px;" placeholder="Décrivez le poste, les missions, le profil requis..."></textarea></div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fj-pub" checked style="width:auto;margin:0;"> Publier immédiatement</label></div>';

  openModal("Nouvelle offre d'emploi", body,
    '<button class="btn btn-primary-sm" onclick="saveJob()"><i class="fas fa-save"></i> Publier</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

async function saveJob() {
  var title = document.getElementById('fj-title').value.trim();
  if (!title) { showToast('Le titre est obligatoire', 'error'); return; }
  var data = {
    title: title,
    department: document.getElementById('fj-dept').value,
    type: document.getElementById('fj-type').value,
    location: document.getElementById('fj-loc').value,
    description: document.getElementById('fj-desc').value,
    published: document.getElementById('fj-pub').checked
  };
  var r = await api('POST', '/jobs', data);
  if (r.success || r.job) { showToast('Offre publiée !'); closeModal(); loadJobs(); }
  else showToast(r.error || 'Erreur', 'error');
}
