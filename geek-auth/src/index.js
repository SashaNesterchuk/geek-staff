const express = require('express')
const axios = require('axios')
const startRoutes = require('./routes')
const { connectDb } = require('./helpers/db')
const { port, slackApiUrl } = require('./configuration')
const app = express()
app.use(express.json({ extended: true }))
startRoutes(app)

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server node started working on port:${port}`)
  })
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
