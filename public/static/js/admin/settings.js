// ── SETTINGS ADMIN ──
(async function() {
  var s = await api('GET', '/settings');
  var fields = ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','heroImage','resendApiKey','exchangeUSD','exchangeEUR','beacRate','economicTip','stat1Value','stat1Label','stat2Value','stat2Label','stat3Value','stat3Label','stat4Value','stat4Label','facebook','twitter','linkedin','youtube'];
  fields.forEach(function(k) {
    var el = document.getElementById(k);
    if (el && s[k] !== undefined) el.value = s[k];
  });
  var showPreview = function(url) {
    if (url) {
      document.getElementById('heroImgTag').src = url;
      document.getElementById('heroImagePreview').style.display = 'block';
    } else {
      document.getElementById('heroImagePreview').style.display = 'none';
    }
  };
  showPreview(s.heroImage);
  document.getElementById('heroImage').addEventListener('input', function(e) {
    showPreview(e.target.value);
  });
})();

async function saveSettings(e) {
  e.preventDefault();
  var data = {};
  var fields = ['siteName','slogan','phone','email','address','heroTitle','heroSubtitle','heroCta','heroImage','resendApiKey','exchangeUSD','exchangeEUR','beacRate','economicTip','stat1Value','stat1Label','stat2Value','stat2Label','stat3Value','stat3Label','stat4Value','stat4Label','facebook','twitter','linkedin','youtube'];
  fields.forEach(function(k) {
    var el = document.getElementById(k);
    if (el) data[k] = el.value;
  });
  var r = await api('PUT', '/settings', data);
  if (r.success) showToast('Paramètres sauvegardés !');
  else showToast(r.error || 'Erreur', 'error');
}
