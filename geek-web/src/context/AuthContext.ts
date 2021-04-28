import { createContext } from 'react'

export const AuthContext = createContext({
  token: null,
  user: undefined,
  isAuthenticated: false,
  login: (jwtToken: string, id: string) => {},
  logout: () => {}
})
