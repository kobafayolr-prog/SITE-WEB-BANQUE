// ── AGENCIES ADMIN ──
(function() {
  document.getElementById('btnNewAgency').addEventListener('click', newAgency);
  loadAgencies();
})();

async function loadAgencies() {
  var ags = await api('GET', '/agencies');
  var container = document.getElementById('agencies-container');
  if (!Array.isArray(ags) || ags.length === 0) {
    container.innerHTML = '<p style="color:var(--bgfi-text-light);text-align:center;padding:40px;">Aucune agence configurée.</p>';
    return;
  }
  var rows = ags.map(function(a) {
    var aJson = JSON.stringify(a).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return '<tr>' +
      '<td style="font-weight:600;color:var(--bgfi-navy);white-space:nowrap;">' + a.name + '</td>' +
      '<td><span class="agency-type ' + (a.type === 'gab' ? 'gab' : '') + '">' + (a.type === 'agence' ? 'Agence' : 'GAB') + '</span></td>' +
      '<td style="font-size:12px;">' + a.address + ', ' + a.city + '</td>' +
      '<td style="font-size:12px;white-space:nowrap;">' + a.phone + '</td>' +
      '<td style="font-size:11px;white-space:nowrap;">' + a.hours + '</td>' +
      '<td style="font-size:11px;font-family:monospace;white-space:nowrap;">' + a.lat + ', ' + a.lng + '</td>' +
      '<td class="action-btns">' +
        '<button class="btn-edit" data-agency="' + aJson + '"><i class="fas fa-edit"></i></button>' +
        '<button class="btn-delete" data-id="' + a.id + '"><i class="fas fa-trash"></i></button>' +
      '</td>' +
    '</tr>';
  }).join('');
  container.innerHTML = '<table class="admin-table"><thead><tr><th>Nom</th><th>Type</th><th>Adresse</th><th>Tél.</th><th>Horaires</th><th>GPS</th><th>Actions</th></tr></thead><tbody>' + rows + '</tbody></table>';

  container.querySelectorAll('.btn-edit[data-agency]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var a = JSON.parse(this.getAttribute('data-agency').replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      openAgencyModal(a);
    });
  });
  container.querySelectorAll('.btn-delete[data-id]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      del('/agencies/' + this.getAttribute('data-id'));
    });
  });
}

function agencyFormHTML(a) {
  a = a || {};
  var nameVal = (a.name || '').replace(/"/g, '&quot;');
  var cityVal = (a.city || 'Bangui').replace(/"/g, '&quot;');
  var addrVal = (a.address || '').replace(/"/g, '&quot;');
  var phoneVal = (a.phone || '').replace(/"/g, '&quot;');
  var hoursVal = (a.hours || 'Lun-Ven : 8h00-17h00').replace(/"/g, '&quot;');
  var latVal = a.lat || 4.361;
  var lngVal = a.lng || 18.555;
  var selAgence = a.type === 'agence' ? ' selected' : '';
  var selGab = a.type === 'gab' ? ' selected' : '';

  return '<div class="form-group"><label>Nom *</label><input type="text" id="fa-name" value="' + nameVal + '" required placeholder="Ex: BGFIBank - Agence Centre"></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Type *</label><select id="fa-type"><option value="agence"' + selAgence + '>Agence bancaire</option><option value="gab"' + selGab + '>GAB (Distributeur)</option></select></div>' +
      '<div class="form-group"><label>Ville</label><input type="text" id="fa-city" value="' + cityVal + '"></div>' +
    '</div>' +
    '<div class="form-group"><label>Adresse</label><input type="text" id="fa-address" value="' + addrVal + '" placeholder="Quartier, rue..."></div>' +
    '<div class="form-group"><label>Telephone</label><input type="tel" id="fa-phone" value="' + phoneVal + '"></div>' +
    '<div class="form-group"><label>Horaires</label><input type="text" id="fa-hours" value="' + hoursVal + '"></div>' +
    '<div class="form-grid-2">' +
      '<div class="form-group"><label>Latitude GPS *</label><input type="number" id="fa-lat" value="' + latVal + '" step="0.0001" required></div>' +
      '<div class="form-group"><label>Longitude GPS *</label><input type="number" id="fa-lng" value="' + lngVal + '" step="0.0001" required></div>' +
    '</div>' +
    '<div style="background:var(--bgfi-light);padding:10px 12px;border-radius:4px;font-size:12px;color:var(--bgfi-text-light);"><i class="fas fa-info-circle" style="color:var(--bgfi-sky);margin-right:4px;"></i>Trouvez les coordonnees GPS sur <a href="https://maps.google.com" target="_blank" style="color:var(--bgfi-sky);">Google Maps</a> (clic droit)</div>';
}

function newAgency() {
  openModal('Nouvelle agence / GAB', agencyFormHTML(null),
    '<button class="btn btn-primary-sm" onclick="saveAgency()"><i class="fas fa-save"></i> Ajouter</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

function openAgencyModal(a) {
  openModal('Modifier : ' + a.name, agencyFormHTML(a),
    '<button class="btn btn-primary-sm" onclick="saveAgency(' + a.id + ')"><i class="fas fa-save"></i> Modifier</button>' +
    '<button class="btn btn-outline" onclick="closeModal()" style="margin-left:8px;">Annuler</button>'
  );
}

async function saveAgency(id) {
  var data = {
    name: document.getElementById('fa-name').value,
    type: document.getElementById('fa-type').value,
    city: document.getElementById('fa-city').value,
    address: document.getElementById('fa-address').value,
    phone: document.getElementById('fa-phone').value,
    hours: document.getElementById('fa-hours').value,
    lat: parseFloat(document.getElementById('fa-lat').value),
    lng: parseFloat(document.getElementById('fa-lng').value)
  };
  var r = id ? await api('PUT', '/agencies/' + id, data) : await api('POST', '/agencies', data);
  if (r.success || r.agency) {
    showToast(id ? 'Agence modifiée !' : 'Agence ajoutée !');
    closeModal();
    loadAgencies();
  } else {
    showToast(r.error || 'Erreur', 'error');
  }
}
