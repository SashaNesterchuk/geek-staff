function startRoutes(app) {
  app.use('/catalog', require('./catalog.routes'))
}
module.exports = startRoutes
