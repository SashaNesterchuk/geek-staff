import { useState, useCallback, useEffect } from 'react'
interface Auth {
  token: string
}
const storageName = 'userData'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const login = useCallback((jwtToken) => {
    setToken(jwtToken)
    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken
      })
    )
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem(storageName)
  }, [])
  useEffect(() => {
    const storage = localStorage.getItem(storageName)
    const data: Auth = storage ? JSON.parse(storage) : null
    if (data && data?.token) {
      login(data.token)
    }
  }, [login])
  return { login, logout, token }
}
