function startRoutes(app) {
  app.use('', require('./auth.routes'))
  app.use('', require('./user.routes'))
}
module.exports = startRoutes
