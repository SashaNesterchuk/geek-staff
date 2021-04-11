function startRoutes(app) {
  app.use('/groups', require('./group.routes'))
}
module.exports = startRoutes
