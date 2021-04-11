import { IResolvers } from 'graphql-tools'
import { AUTH_API_URL, SLACK_API_URL } from './configuration'
import axios from 'axios'
const resolvers: IResolvers = {
  Mutation: {
    groupCreate: async (_, { input }, test) => {
      try {
        const { data } = await axios.post(`${SLACK_API_URL}/groups`, input)
        return data.data
      } catch (e) {
        throw new Error(e.message)
      }
    }
  },
  Query: {
    users: async () => {
      try {
        const { data } = await axios.get(`${AUTH_API_URL}/users`)
        return data.data
      } catch (e) {
        throw new Error(e.message)
      }
    },
    groups: async () => {
      try {
        const { data } = await axios.get(`${SLACK_API_URL}/groups`)
        return data
      } catch (e) {
        throw new Error(e.message)
      }
    }
    // group: async (input) => {
    // console.log(input)
    // try {
    // const { data } = await axios.get(`${SLACK_API_URL}/${input}`)
    // return data.data
    // } catch (e) {
    // throw new Error(e.message)
    // }
    // }
  }
}
export default resolvers
