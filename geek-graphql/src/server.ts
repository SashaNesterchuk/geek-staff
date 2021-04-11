import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import schema from './schema'
import { PORT } from './configuration'

const app = express()

const server = new ApolloServer({
  schema,
  playground: true
})

server.applyMiddleware({ app, path: '/graphql' })
app.listen({ port: PORT }, () => {
  console.log(`Server geek-graphql is working on port: ${PORT}`)
})
