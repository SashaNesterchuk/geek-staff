import { useState, useCallback, useEffect } from 'react'
interface Auth {
  token: string
  userId: string
}
const storageName = 'userData'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken
      })
    )
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])
  useEffect(() => {
    const storage = localStorage.getItem(storageName)
    const data: Auth = storage ? JSON.parse(storage) : null
    if (data && data?.token) {
      login(data.token, data.userId)
    }
  }, [login])
  return { login, logout, token, userId }
}
