import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navbar/Navbar'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { RLoader } from './components/parts/RLoader'
const USER_FETCH = gql`
  query user($input: UserInput) {
    user(input: $input) {
      _id
      name
      email
    }
  }
`
function App() {
  const { token, userId, login, logout } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const { data, loading } = useQuery(USER_FETCH, {
    variables: { input: { id: userId } }
  })
  if (loading) {
    return <RLoader />
  }
  console.log(data)
  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        token,
        userId,
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
