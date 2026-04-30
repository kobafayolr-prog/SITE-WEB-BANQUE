// ── MESSAGES ADMIN ──
(async function() {
  var messages = await api('GET', '/contact-messages');
  var list = document.getElementById('msgList');
  var count = document.getElementById('msgCount');
  if (!Array.isArray(messages) || messages.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:60px;"><i class="fas fa-inbox" style="font-size:48px;color:var(--bgfi-border);display:block;margin-bottom:16px;"></i><p style="color:var(--bgfi-text-light);">Aucun message reçu pour le moment.</p></div>';
    count.textContent = '0 message';
    return;
  }
  var unread = messages.filter(function(m) { return !m.read; }).length;
  count.textContent = messages.length + ' message' + (messages.length > 1 ? 's' : '') + (unread > 0 ? ' · ' + unread + ' non lu' + (unread > 1 ? 's' : '') : '');

  list.innerHTML = messages.map(function(m) {
    var borderColor = m.read ? 'var(--bgfi-border)' : 'var(--bgfi-sky)';
    var bgColor = m.read ? 'white' : '#f0f9ff';
    var newBadge = !m.read ? '<span style="background:var(--bgfi-sky);color:white;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;text-transform:uppercase;margin-right:8px;">Nouveau</span>' : '';
    var phone = m.phone ? ' · ' + m.phone : '';
    var subject = m.subject || 'Sans sujet';
    var msgBody = m.message.replace(/\n/g, '<br>');
    var readLabel = m.read ? '&#10003; Lu' : 'Marquer lu';
    var replySubject = encodeURIComponent(m.subject || 'Votre message');
    var replyName = encodeURIComponent(m.name);
    var dateStr = new Date(m.date).toLocaleString('fr-FR');

    return '<div id="msg-' + m.id + '" style="border:1px solid ' + borderColor + ';background:' + bgColor + ';border-radius:8px;padding:16px;margin-bottom:12px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:8px;">' +
        '<div style="flex:1;min-width:0;">' +
          newBadge +
          '<strong style="color:var(--bgfi-navy);font-size:15px;">' + m.name + '</strong>' +
          '<div style="color:var(--bgfi-text-light);font-size:12px;margin-top:2px;">' + m.email + phone + '</div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;align-items:center;flex-shrink:0;flex-wrap:wrap;">' +
          '<span style="font-size:11px;color:var(--bgfi-text-light);white-space:nowrap;">' + dateStr + '</span>' +
          '<button onclick="markRead(' + m.id + ')" style="background:var(--bgfi-p3);color:white;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:11px;">' + readLabel + '</button>' +
          '<a href="mailto:' + m.email + '?subject=Re: ' + replySubject + '&body=Bonjour ' + replyName + '," style="background:var(--bgfi-sky);color:white;padding:4px 10px;border-radius:4px;font-size:11px;text-decoration:none;"><i class="fas fa-reply"></i> Répondre</a>' +
        '</div>' +
      '</div>' +
      '<div style="margin-bottom:8px;"><span style="background:var(--bgfi-light);color:var(--bgfi-navy);font-size:12px;font-weight:600;padding:3px 10px;border-radius:10px;">' + subject + '</span></div>' +
      '<div style="padding:12px;background:rgba(0,0,0,.03);border-radius:6px;font-size:13px;color:var(--bgfi-text);line-height:1.7;border-left:3px solid var(--bgfi-sky);">' + msgBody + '</div>' +
    '</div>';
  }).join('');
})();

async function markRead(id) {
  await api('PUT', '/contact-messages/' + id + '/read', {});
  var el = document.getElementById('msg-' + id);
  if (el) {
    el.style.border = '1px solid var(--bgfi-border)';
    el.style.background = 'white';
    var btn = el.querySelector('button');
    if (btn) btn.textContent = '✓ Lu';
  }
  showToast('Marqué comme lu');
}
