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
