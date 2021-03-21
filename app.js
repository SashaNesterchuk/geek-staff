const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()
const startRoutes = require('./routes')
app.use(express.json({ extended: true }))
const PORT = config.get('port') || 5000
startRoutes(app)
async function start() {
  try {
    const MONGO_URI = config.get('mongoUri')
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()

app.listen(PORT, () => console.log(`App has been started`))