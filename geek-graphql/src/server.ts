import http from 'http'
import axios from 'axios'
import express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express'
import schema from './schema'
import { PORT, AUTH_API_URL } from './configuration'

const app = express()

const pubsub = new PubSub()
const server = new ApolloServer({
  schema,
  playground: true,
  subscriptions: {
    onConnect: () => {
      console.log('Subscription is Connected')
    },
    path: '/graphql'
  },
  context: async (ctx) => {
    let token
    let user: any
    if (ctx?.req?.headers?.authorization) {
      token = ctx.req.headers.authorization
    } else if (ctx.connection?.context?.Authorization) {
      token = ctx.connection.context.Authorization
    }
    if (token) {
      const { data } = await axios.get(`${AUTH_API_URL}/token/${token}`, {
        params: { token }
      })
      user = data
    }
    return { ...ctx, pubsub, user }
  }
})
server.applyMiddleware({ app })
// server.start()
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)
server.applyMiddleware({ app, path: '/graphql' })
httpServer.listen({ port: PORT }, () => {
  console.log(`Server geek-graphql is working on port: ${PORT}`)
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  )
})
