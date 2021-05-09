import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navbar/Navbar'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { RLoader } from './components/parts/RLoader'
import { RootState } from './redux/reducers/rootReducer'
import { Notification } from './components/notification/RNotification'
import {
  RNotification,
  EnumNotification
} from './components/notification/RNotification'

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
  const notifications: Array<Notification> = useSelector(
    (state: RootState) => state.notifications.notifications
  )
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const { data, loading } = useQuery(USER_AUTH)
  if (loading) {
    return <RLoader />
  }
  const notificationComponents = notifications.map((elem) => (
    <RNotification key={elem.text} text={elem.text} type={elem.type} />
  ))
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
        <div className="container">
          {notificationComponents}
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
