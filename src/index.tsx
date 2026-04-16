// ============================================================
// BGFIBank Centrafrique — Application principale
// Conforme à la Charte d'Harmonisation Digitale V1.0
// ============================================================

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import api from './routes/api'
import pages from './routes/pages'
import admin from './routes/admin'

const app = new Hono()

// ── STATIC FILES ─────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }))

// ── FAVICON ──────────────────────────────────────────────────
app.get('/favicon.ico', (c) => c.body('', 204))
app.get('/favicon.svg', (c) => c.body('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#003666"/><text x="16" y="22" font-family="Arial" font-size="13" font-weight="bold" fill="white" text-anchor="middle">BG</text></svg>', 200, {'Content-Type': 'image/svg+xml'}))

// ── API ROUTES ────────────────────────────────────────────────
app.route('/api', api)

// ── ADMIN ROUTES ─────────────────────────────────────────────
app.route('/admin', admin)

// ── PUBLIC PAGES ─────────────────────────────────────────────
app.route('/', pages)

// ── 404 ───────────────────────────────────────────────────────
app.notFound((c) => {
  return c.html(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page non trouvée — BGFIBank Centrafrique</title>
  <link rel="stylesheet" href="/static/css/bgfi.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
</head>
<body style="background:var(--bgfi-light);display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;padding:40px;">
    <div style="font-size:80px;color:var(--bgfi-border);margin-bottom:20px;"><i class="fas fa-map-marker-times"></i>404</div>
    <h1 style="font-size:24px;font-weight:700;color:var(--bgfi-navy);margin-bottom:12px;">Page non trouvée</h1>
    <p style="color:var(--bgfi-text-light);margin-bottom:24px;">La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <a href="/" style="background:var(--bgfi-sky);color:white;padding:12px 28px;border-radius:4px;text-decoration:none;font-weight:600;"><i class="fas fa-home" style="margin-right:8px;"></i>Retour à l'accueil</a>
  </div>
</body>
</html>`, 404)
})

export default app
