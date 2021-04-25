import { createContext } from 'react'
import { User } from '../types'

export const AuthContext = createContext({
  token: null,
  userId: null,
  user: undefined,
  isAuthenticated: false,
  login: (jwtToken: string, id: string) => {},
  logout: () => {}
})
