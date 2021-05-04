import { IResolvers } from 'graphql-tools'
import { AUTH_API_URL, SLACK_API_URL } from './configuration'
import axios from 'axios'
import { GraphQLScalarType, Kind } from 'graphql'
import { withFilter } from 'apollo-server-express'
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  }
})
const resolvers: IResolvers = {
  Date: dateScalar,
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub, user }) => {
        console.log(user, 'SUBSCRIPTION')
        return pubsub.asyncIterator('NEW_MESSAGE')
      }
      // ({ newMessage }, _, { user }) => {
      // console.log(user, 'resolver')
      // return newMessage.from === user.name || newMessage.to === user.name
      // }
    }
  },
  Mutation: {
    groupCreate: async (_, { input }, test) => {
      try {
        const { data } = await axios.post(`${SLACK_API_URL}/groups`, input)
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    },
    groupDelete: async (_, { input }, test) => {
      try {
        await axios.delete(`${SLACK_API_URL}/groups/${input}`)
        return true
      } catch (e) {
        throw new Error(e.message)
      }
    },
    messageCreate: async (_, { input }, { pubsub }) => {
      try {
        const { data } = await axios.post(`${SLACK_API_URL}/messages`, input)
        pubsub.publish('NEW_MESSAGE', {
          newMessage: data
        })
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    }
  },
  Query: {
    auth: (_, __, { user }) => {
      return user
    },
    users: async (_, __, { user }) => {
      console.log(user, 'users')
      try {
        const { data } = await axios.get(`${AUTH_API_URL}/users`)
        return data.data
      } catch (e) {
        throw new Error(e.message)
      }
    },
    user: async (_, { input }) => {
      try {
        const { data } = await axios.get(`${AUTH_API_URL}/users/${input.id}`)
        return data
      } catch (e) {
        throw new Error(e)
      }
    },
    groups: async () => {
      try {
        const { data } = await axios.get(`${SLACK_API_URL}/groups`)
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    },
    messages: async (_, { input }) => {
      try {
        const { data } = await axios.get(`${SLACK_API_URL}/messages`, {
          params: {
            groupId: input.groupId
          }
        })
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
export default resolvers
