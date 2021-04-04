const express = require('express')
const axios = require('axios')
const { connectDb } = require('./helpers/db')
const { port, slackApiUrl } = require('./configuration')
const app = express()
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server node started working on port:${port}`)
  })
}
app.get('/test', (req, res) => {
  res.send('Catalog svc response')
  console.log('Test is working')
})
app.get('/slack', (req, res) => {
  axios.get(slackApiUrl + '/test').then(({ data }) => res.json({ test: data }))
})
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
