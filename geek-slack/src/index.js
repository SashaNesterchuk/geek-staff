const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const { connectDb } = require('./helpers/db')
const { port } = require('./configuration')

const app = express()

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server graphql started working on port:${port}`)
  })
}

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
app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
)

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
