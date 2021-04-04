const express = require('express')
const cors = require('cors')
const config = require('config')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const app = express()
const startRoutes = require('./routes')
const schema = buildSchema(
  `
    type Query {
        hello: String
    }
    `
)
const root = {
  hello: () => {
    return 'Hello world!'
  }
}
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)

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
