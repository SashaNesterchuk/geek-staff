import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

let httpLink = createHttpLink({
  uri: '/graphql/'
})

const userData = localStorage.getItem('userData')
const storage: { token: string } = userData ? JSON.parse(userData) : {}
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: storage.token ? `${storage.token}` : ''
    }
  }
})

httpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `ws://geekstaff.local/subscription`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: storage.token ? `${storage.token}` : ''
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
