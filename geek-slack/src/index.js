const express = require('express')
const { connectDb } = require('./helpers/db')
const { port } = require('./configuration')
const app = express()
const startServer = () => {
  app.listen(port, () => {
    console.log(`Server graphql started working on port:${port}`)
  })
}
app.get('/test', (req, res) => {
  res.send('GraphQl svs responce')
  console.log('Test is working')
})
app.post('/', (req, res) => {
  res.json({ message: 'ha' })
})
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
