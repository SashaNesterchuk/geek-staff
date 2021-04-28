import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navbar/Navbar'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { RLoader } from './components/parts/RLoader'
const USER_AUTH = gql`
  query auth {
    auth {
      _id
      name
      email
    }
  }
`
function App() {
  const { token, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const { data, loading } = useQuery(USER_AUTH)
  if (loading) {
    return <RLoader />
  }
  return (
    <AuthContext.Provider
      value={{
        user: data?.auth,
        token,
        isAuthenticated,
        login,
        logout
      }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
