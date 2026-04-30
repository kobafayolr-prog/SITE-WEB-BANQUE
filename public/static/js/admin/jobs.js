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
    var fileBtn = j.fileUrl
      ? '<a href="' + j.fileUrl + '" target="_blank" class="btn-edit" style="text-decoration:none;padding:5px 10px;font-size:12px;" title="Voir le fichier joint"><i class="fas fa-paperclip"></i></a>'
      : '';
    return '<tr>' +
      '<td style="font-weight:600;color:var(--bgfi-navy);">' + j.title + '</td>' +
      '<td style="font-size:13px;">' + (j.department || '') + '</td>' +
      '<td><span style="background:var(--bgfi-sky);color:white;padding:2px 8px;border-radius:10px;font-size:11px;white-space:nowrap;">' + j.type + '</span></td>' +
      '<td style="font-size:13px;">' + (j.location || '') + '</td>' +
      '<td><span class="' + (j.published ? 'badge-published' : 'badge-draft') + '">' + (j.published ? 'Publié' : 'Archivé') + '</span></td>' +
      '<td class="action-btns">' +
        fileBtn +
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
      '<div class="form-group"><label>Département</label><input type="text" id="fj-dept" placeholder="Commerce &amp; Relation Client"></div>' +
      '<div class="form-group"><label>Type de contrat</label><select id="fj-type"><option>CDI</option><option>CDD</option><option>Stage</option></select></div>' +
    '</div>' +
    '<div class="form-group"><label>Lieu</label><input type="text" id="fj-loc" value="Bangui"></div>' +
    '<div class="form-group"><label>Description *</label><textarea id="fj-desc" required style="min-height:100px;" placeholder="Décrivez le poste, les missions, le profil requis..."></textarea></div>' +
    '<div class="form-group">' +
      '<label>Fichier joint (PDF ou image) — optionnel</label>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">' +
        '<label class="btn btn-outline" style="cursor:pointer;margin:0;padding:8px 14px;font-size:12px;" for="fj-file">' +
          '<i class="fas fa-paperclip" style="margin-right:6px;"></i>Choisir un fichier' +
        '</label>' +
        '<input type="file" id="fj-file" accept="image/*,application/pdf" style="display:none;" onchange="handleJobFileSelect(this)">' +
        '<span id="fj-file-name" style="font-size:12px;color:var(--bgfi-text-light);">Aucun fichier sélectionné</span>' +
      '</div>' +
      '<div id="fj-upload-progress" style="display:none;margin-top:8px;font-size:12px;color:var(--bgfi-sky);"><i class="fas fa-spinner fa-spin"></i> Téléchargement en cours...</div>' +
      '<input type="hidden" id="fj-file-url">' +
    '</div>' +
    '<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="fj-pub" checked style="width:auto;margin:0;"> Publier immédiatement</label></div>';

  openModal("Nouvelle offre d'emploi", body,
    '<button class="btn btn-primary-sm" onclick="saveJob()"><i class="fas fa-save"></i> Publier</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

function handleJobFileSelect(input) {
  var file = input.files && input.files[0];
  var nameSpan = document.getElementById('fj-file-name');
  if (file && nameSpan) {
    nameSpan.textContent = file.name + ' (' + (file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' Mo' : Math.round(file.size/1024)+' Ko') + ')';
    nameSpan.style.color = 'var(--bgfi-sky)';
  }
}

async function saveJob() {
  var title = document.getElementById('fj-title').value.trim();
  if (!title) { showToast('Le titre est obligatoire', 'error'); return; }

  // Upload du fichier si présent
  var fileInput = document.getElementById('fj-file');
  var fileUrl = '';
  if (fileInput && fileInput.files && fileInput.files[0]) {
    var progress = document.getElementById('fj-upload-progress');
    if (progress) progress.style.display = 'block';

    var token = localStorage.getItem('bgfi_admin_token');
    var formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      var resp = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData
      });
      var result = await resp.json();
      if (result.success && result.url) {
        fileUrl = result.url;
        showToast('Fichier téléchargé !', 'success');
      } else {
        showToast(result.error || 'Erreur upload fichier', 'error');
        if (progress) progress.style.display = 'none';
        return;
      }
    } catch (e) {
      showToast('Erreur lors du téléchargement du fichier', 'error');
      if (progress) progress.style.display = 'none';
      return;
    } finally {
      if (progress) progress.style.display = 'none';
    }
  }

  var data = {
    title: title,
    department: document.getElementById('fj-dept').value,
    type: document.getElementById('fj-type').value,
    location: document.getElementById('fj-loc').value,
    description: document.getElementById('fj-desc').value,
    published: document.getElementById('fj-pub').checked,
    fileUrl: fileUrl || undefined
  };

  var r = await api('POST', '/jobs', data);
  if (r.success || r.job) {
    showToast('Offre publiée !');
    closeModal();
    loadJobs();
  } else {
    showToast(r.error || 'Erreur', 'error');
  }
}
