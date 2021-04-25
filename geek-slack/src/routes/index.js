function startRoutes(app) {
  app.use('/groups', require('./group.routes'))
  app.use('/messages', require('./message.routes'))
}
module.exports = startRoutes
