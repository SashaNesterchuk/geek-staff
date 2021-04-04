function startRoutes(app) {
  app.use('/api/auth', require('./auth.routes'))
  app.use('/api/catalog', require('./catalog.routes'))
}
module.exports = startRoutes
