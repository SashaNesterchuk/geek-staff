import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const { token, userId, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider
      value={{ token, userId, isAuthenticated, login, logout }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
