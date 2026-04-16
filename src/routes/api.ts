// ============================================================
// API ROUTES — BGFIBank Centrafrique
// Toutes les routes de gestion de contenu (Admin)
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { store } from '../data/db'

const api = new Hono()
api.use('*', cors())

// ── AUTH MIDDLEWARE ──────────────────────────────────────────
const checkAdmin = async (c: any, next: any) => {
  const auth = c.req.header('Authorization')
  const token = auth?.replace('Bearer ', '')
  if (token !== store.adminPassword) {
    return c.json({ error: 'Non autorisé' }, 401)
  }
  await next()
}

// ── AUTH ─────────────────────────────────────────────────────
api.post('/auth/login', async (c) => {
  const { password } = await c.req.json()
  if (password === store.adminPassword) {
    return c.json({ success: true, token: store.adminPassword })
  }
  return c.json({ error: 'Mot de passe incorrect' }, 401)
})

// ── SETTINGS ─────────────────────────────────────────────────
api.get('/settings', (c) => c.json(store.settings))

api.put('/settings', checkAdmin, async (c) => {
  const data = await c.req.json()
  store.settings = { ...store.settings, ...data }
  return c.json({ success: true, settings: store.settings })
})

// ── ARTICLES ─────────────────────────────────────────────────
api.get('/articles', (c) => {
  const all = c.req.query('all') === 'true'
  const category = c.req.query('category')
  let articles = all ? store.articles : store.articles.filter(a => a.published)
  if (category) articles = articles.filter(a => a.category === category)
  return c.json(articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
})

api.get('/articles/:slug', (c) => {
  const article = store.articles.find(a => a.slug === c.req.param('slug'))
  if (!article) return c.json({ error: 'Article non trouvé' }, 404)
  return c.json(article)
})

api.post('/articles', checkAdmin, async (c) => {
  const data = await c.req.json()
  const article = { ...data, id: Date.now(), date: data.date || new Date().toISOString().split('T')[0] }
  store.articles.push(article)
  return c.json({ success: true, article })
})

api.put('/articles/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const idx = store.articles.findIndex(a => a.id === id)
  if (idx === -1) return c.json({ error: 'Non trouvé' }, 404)
  store.articles[idx] = { ...store.articles[idx], ...data }
  return c.json({ success: true, article: store.articles[idx] })
})

api.delete('/articles/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  store.articles = store.articles.filter(a => a.id !== id)
  return c.json({ success: true })
})

// ── PRODUCTS ─────────────────────────────────────────────────
api.get('/products', (c) => {
  const segment = c.req.query('segment')
  let products = store.products
  if (segment) products = products.filter(p => p.segment === segment)
  return c.json(products)
})

api.put('/products/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const idx = store.products.findIndex(p => p.id === id)
  if (idx === -1) return c.json({ error: 'Non trouvé' }, 404)
  store.products[idx] = { ...store.products[idx], ...data }
  return c.json({ success: true, product: store.products[idx] })
})

api.post('/products', checkAdmin, async (c) => {
  const data = await c.req.json()
  const product = { ...data, id: Date.now() }
  store.products.push(product)
  return c.json({ success: true, product })
})

api.delete('/products/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  store.products = store.products.filter(p => p.id !== id)
  return c.json({ success: true })
})

// ── AGENCIES ─────────────────────────────────────────────────
api.get('/agencies', (c) => c.json(store.agencies))

api.post('/agencies', checkAdmin, async (c) => {
  const data = await c.req.json()
  const agency = { ...data, id: Date.now() }
  store.agencies.push(agency)
  return c.json({ success: true, agency })
})

api.put('/agencies/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const idx = store.agencies.findIndex(a => a.id === id)
  if (idx === -1) return c.json({ error: 'Non trouvé' }, 404)
  store.agencies[idx] = { ...store.agencies[idx], ...data }
  return c.json({ success: true, agency: store.agencies[idx] })
})

api.delete('/agencies/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  store.agencies = store.agencies.filter(a => a.id !== id)
  return c.json({ success: true })
})

// ── TESTIMONIALS ─────────────────────────────────────────────
api.get('/testimonials', (c) => {
  const all = c.req.query('all') === 'true'
  return c.json(all ? store.testimonials : store.testimonials.filter(t => t.published))
})

api.post('/testimonials', checkAdmin, async (c) => {
  const data = await c.req.json()
  const t = { ...data, id: Date.now() }
  store.testimonials.push(t)
  return c.json({ success: true, testimonial: t })
})

api.put('/testimonials/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const idx = store.testimonials.findIndex(t => t.id === id)
  if (idx === -1) return c.json({ error: 'Non trouvé' }, 404)
  store.testimonials[idx] = { ...store.testimonials[idx], ...data }
  return c.json({ success: true })
})

api.delete('/testimonials/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  store.testimonials = store.testimonials.filter(t => t.id !== id)
  return c.json({ success: true })
})

// ── JOBS ─────────────────────────────────────────────────────
api.get('/jobs', (c) => {
  const all = c.req.query('all') === 'true'
  return c.json(all ? store.jobs : store.jobs.filter(j => j.published))
})

api.post('/jobs', checkAdmin, async (c) => {
  const data = await c.req.json()
  const job = { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] }
  store.jobs.push(job)
  return c.json({ success: true, job })
})

api.put('/jobs/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  const data = await c.req.json()
  const idx = store.jobs.findIndex(j => j.id === id)
  if (idx === -1) return c.json({ error: 'Non trouvé' }, 404)
  store.jobs[idx] = { ...store.jobs[idx], ...data }
  return c.json({ success: true })
})

api.delete('/jobs/:id', checkAdmin, async (c) => {
  const id = parseInt(c.req.param('id'))
  store.jobs = store.jobs.filter(j => j.id !== id)
  return c.json({ success: true })
})

// ── CONTACT FORM — envoi email via Resend API ────────────────
api.post('/contact', async (c) => {
  const { name, email, phone, subject, message } = await c.req.json()
  if (!name || !email || !message) {
    return c.json({ error: 'Nom, email et message sont obligatoires' }, 400)
  }

  // Email de destination configuré dans les settings
  const destEmail = store.settings.email || 'f.koba@bgfi.com'

  // Clé Resend (à configurer via admin settings ou variable d'env)
  const resendKey = (c.env as any)?.RESEND_API_KEY || store.settings.resendApiKey || ''

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f4f6f9;padding:24px;border-radius:8px;">
      <div style="background:#003a74;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:white;margin:0;font-size:20px;">📩 Nouveau message — BGFIBank Centrafrique</h2>
      </div>
      <div style="background:white;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e0e4ea;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px 0;font-weight:700;color:#003a74;width:130px;">Nom</td><td style="padding:10px 0;color:#2c3e50;">${name}</td></tr>
          <tr style="background:#f8f9fa;"><td style="padding:10px 8px;font-weight:700;color:#003a74;">Email</td><td style="padding:10px 8px;"><a href="mailto:${email}" style="color:#0d91d0;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;font-weight:700;color:#003a74;">Téléphone</td><td style="padding:10px 0;color:#2c3e50;">${phone || 'Non renseigné'}</td></tr>
          <tr style="background:#f8f9fa;"><td style="padding:10px 8px;font-weight:700;color:#003a74;">Sujet</td><td style="padding:10px 8px;color:#2c3e50;">${subject || 'Non précisé'}</td></tr>
          <tr><td colspan="2" style="padding:16px 0 8px;font-weight:700;color:#003a74;">Message</td></tr>
          <tr><td colspan="2" style="padding:12px;background:#f4f6f9;border-radius:6px;color:#2c3e50;line-height:1.7;border-left:4px solid #0d91d0;">${message.replace(/\n/g, '<br>')}</td></tr>
        </table>
        <div style="margin-top:20px;padding:12px;background:#e8f5e9;border-radius:6px;font-size:12px;color:#6b7280;">
          Message reçu le ${new Date().toLocaleString('fr-FR', {timeZone:'Africa/Bangui'})} — BGFIBank Centrafrique
        </div>
      </div>
    </div>`

  // Si clé Resend disponible → envoi réel
  if (resendKey) {
    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'BGFIBank Centrafrique <noreply@bgfibank-rca.com>',
          to: [destEmail],
          reply_to: email,
          subject: `[Contact Site] ${subject || 'Nouveau message'} — ${name}`,
          html: htmlBody,
        }),
      })
      const result = await resp.json() as any
      if (resp.ok) {
        // Sauvegarder aussi en base locale
        store.contactMessages = store.contactMessages || []
        store.contactMessages.push({ id: Date.now(), name, email, phone, subject, message, date: new Date().toISOString(), read: false })
        return c.json({ success: true, message: 'Message envoyé avec succès' })
      } else {
        console.error('Resend error:', result)
        // Fallback : sauvegarder quand même
        store.contactMessages = store.contactMessages || []
        store.contactMessages.push({ id: Date.now(), name, email, phone, subject, message, date: new Date().toISOString(), read: false })
        return c.json({ success: true, message: 'Message reçu et enregistré' })
      }
    } catch (err) {
      console.error('Email send error:', err)
    }
  }

  // Sans clé Resend : sauvegarder le message en base locale (visible dans admin)
  store.contactMessages = store.contactMessages || []
  store.contactMessages.push({ id: Date.now(), name, email, phone, subject, message, date: new Date().toISOString(), read: false })
  return c.json({ success: true, message: 'Message reçu. Configurez une clé Resend pour l\'envoi par email.' })
})

// ── MESSAGES CONTACT (admin) ─────────────────────────────────
api.get('/contact-messages', checkAdmin, (c) => {
  return c.json((store.contactMessages || []).sort((a: any, b: any) => b.id - a.id))
})

api.put('/contact-messages/:id/read', checkAdmin, (c) => {
  const id = parseInt(c.req.param('id'))
  const msg = (store.contactMessages || []).find((m: any) => m.id === id)
  if (msg) msg.read = true
  return c.json({ success: true })
})

// ── PRE-REGISTRATIONS ────────────────────────────────────────
api.post('/pre-register', async (c) => {
  const { email, service } = await c.req.json()
  if (!email || !service) return c.json({ error: 'Email et service requis' }, 400)
  const existing = store.preRegistrations.find(p => p.email === email && p.service === service)
  if (existing) return c.json({ success: true, message: 'Déjà inscrit' })
  const reg = { id: Date.now(), email, service, date: new Date().toISOString() }
  store.preRegistrations.push(reg)
  return c.json({ success: true, message: 'Inscription confirmée' })
})

api.get('/pre-registrations', checkAdmin, (c) => c.json(store.preRegistrations))

// ── NEWSLETTER ───────────────────────────────────────────────
api.post('/newsletter', async (c) => {
  const { email } = await c.req.json()
  if (!email) return c.json({ error: 'Email requis' }, 400)
  const reg = { id: Date.now(), email, service: 'newsletter', date: new Date().toISOString() }
  const existing = store.preRegistrations.find(p => p.email === email && p.service === 'newsletter')
  if (!existing) store.preRegistrations.push(reg)
  return c.json({ success: true, message: 'Inscription à la newsletter confirmée' })
})

// ── CHANGE PASSWORD ──────────────────────────────────────────
api.post('/change-password', checkAdmin, async (c) => {
  const { newPassword } = await c.req.json()
  if (!newPassword || newPassword.length < 8) return c.json({ error: 'Mot de passe trop court (min 8 caractères)' }, 400)
  store.adminPassword = newPassword
  return c.json({ success: true, message: 'Mot de passe modifié', newToken: newPassword })
})

// ── STATS DASHBOARD ──────────────────────────────────────────
api.get('/stats', checkAdmin, (c) => {
  return c.json({
    articles: { total: store.articles.length, published: store.articles.filter(a => a.published).length },
    products: { total: store.products.length, available: store.products.filter(p => p.available).length },
    agencies: { total: store.agencies.length, agences: store.agencies.filter(a => a.type === 'agence').length, gab: store.agencies.filter(a => a.type === 'gab').length },
    testimonials: { total: store.testimonials.length, published: store.testimonials.filter(t => t.published).length },
    jobs: { total: store.jobs.length, published: store.jobs.filter(j => j.published).length },
    preRegistrations: { total: store.preRegistrations.length, byService: store.preRegistrations.reduce((acc: any, p) => { acc[p.service] = (acc[p.service] || 0) + 1; return acc }, {}) },
  })
})

export default api
