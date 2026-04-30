const { chromium } = require('playwright');

const BASE = 'https://3000-i08wynxlbo82i3uulio9o-5185f4aa.sandbox.novita.ai';
const PASSWORD = 'bgfi@admin2024';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Collecter TOUTES les erreurs console
  const allLogs = [];
  page.on('console', msg => allLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`));
  page.on('pageerror', err => allLogs.push(`[PAGE-ERROR] ${err.message}`));
  page.on('requestfailed', req => allLogs.push(`[NET-FAIL] ${req.url()} → ${req.failure()?.errorText}`));

  // ── LOGIN ──
  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle' });
  await page.fill('#password', PASSWORD);
  await page.click('#loginBtn');
  await page.waitForTimeout(2000);
  console.log('URL après login:', page.url());
  console.log('Token localStorage:', await page.evaluate(() => localStorage.getItem('bgfi_admin_token')));

  // ── TESTER CHAQUE ONGLET ──
  const tabs = [
    { name: 'Dashboard',       path: '/admin/dashboard',        waitFor: '#stat-articles',         checkFilled: async (p) => await p.$eval('#stat-articles', el => el.textContent) },
    { name: 'Articles',        path: '/admin/articles',          waitFor: '#articles-container table', checkFilled: async (p) => { const t = await p.$('#articles-container table'); return t ? 'TABLE OK' : 'PAS DE TABLE'; } },
    { name: 'Produits',        path: '/admin/products',          waitFor: '#products-container table', checkFilled: async (p) => { const t = await p.$('#products-container table'); return t ? 'TABLE OK' : 'PAS DE TABLE'; } },
    { name: 'Témoignages',     path: '/admin/testimonials',      waitFor: '#testimonials-container table', checkFilled: async (p) => { const t = await p.$('#testimonials-container table'); return t ? 'TABLE OK' : 'PAS DE TABLE'; } },
    { name: 'Agences',         path: '/admin/agencies',          waitFor: '#agencies-container table', checkFilled: async (p) => { const t = await p.$('#agencies-container table'); return t ? 'TABLE OK' : 'PAS DE TABLE'; } },
    { name: 'Emplois',         path: '/admin/jobs',              waitFor: '#jobs-container table',     checkFilled: async (p) => { const t = await p.$('#jobs-container table'); return t ? 'TABLE OK' : 'PAS DE TABLE'; } },
    { name: 'Pré-inscriptions',path: '/admin/preregistrations',  waitFor: '#prereg-container',         checkFilled: async (p) => { const t = await p.$('#prereg-container'); return t ? (await t.innerText()).substring(0,80) : 'VIDE'; } },
    { name: 'Messages',        path: '/admin/messages',          waitFor: '#msgList',                  checkFilled: async (p) => { const t = await p.$('#msgList'); return t ? (await t.innerText()).substring(0,80) : 'VIDE'; } },
    { name: 'Paramètres',      path: '/admin/settings',          waitFor: '#siteName',                 checkFilled: async (p) => await p.$eval('#siteName', el => el.value) },
  ];

  console.log('\n══════════════════════════════════════════');
  console.log('RÉSULTATS PAR ONGLET');
  console.log('══════════════════════════════════════════');

  for (const tab of tabs) {
    allLogs.length = 0; // reset logs pour cet onglet
    try {
      await page.goto(BASE + tab.path, { waitUntil: 'domcontentloaded' });
      // Attendre que le spinner disparaisse OU que le contenu apparaisse
      try {
        await page.waitForSelector(tab.waitFor, { timeout: 5000 });
        const val = await tab.checkFilled(page);
        console.log(`✅ ${tab.name}: ${val}`);
      } catch(e) {
        // Spinner toujours là ? Capturer le HTML du container
        const spinnerStillThere = await page.$('.fa-spinner');
        const containerHTML = await page.evaluate(() => {
          const c = document.querySelector('[id$="-container"], #msgList, #stat-articles, #siteName');
          return c ? c.innerHTML.substring(0, 150) : 'ELEMENT NON TROUVÉ';
        });
        console.log(`❌ ${tab.name}: CHARGEMENT BLOQUÉ`);
        console.log(`   Container HTML: ${containerHTML}`);
        if (allLogs.length > 0) {
          console.log(`   Erreurs JS:`);
          allLogs.forEach(l => console.log(`     ${l}`));
        }
      }
    } catch(e) {
      console.log(`💥 ${tab.name}: EXCEPTION: ${e.message}`);
    }
  }

  // ── TEST BOUTON "NOUVEL ARTICLE" ──
  console.log('\n══════════════════════════════════════════');
  console.log('TEST BOUTON NOUVEL ARTICLE');
  console.log('══════════════════════════════════════════');
  allLogs.length = 0;
  await page.goto(BASE + '/admin/articles', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  try {
    await page.click('#btnNewArticle');
    await page.waitForTimeout(500);
    const modalOpen = await page.$('#modal.open');
    console.log(modalOpen ? '✅ Modal ouvert après clic' : '❌ Modal PAS ouvert');
    if (allLogs.length > 0) allLogs.forEach(l => console.log(`  ${l}`));
  } catch(e) {
    console.log('❌ Bouton introuvable ou erreur:', e.message);
  }

  await browser.close();
}

run().catch(console.error);
