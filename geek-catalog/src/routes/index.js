function startRoutes(app) {
  app.use('/auth', require('./auth.routes'))
  app.use('/catalog', require('./catalog.routes'))
}
module.exports = startRoutes
