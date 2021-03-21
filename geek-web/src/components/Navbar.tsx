import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import routes, { Middleware } from '../routes'
export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = () => {
    auth.logout()
    //history.push('/')
  }
  const showRoutes = routes
    .filter((elem) => elem.middleware === Middleware.Auth)
    .map((elem) => (
      <li key={elem.name}>
        <NavLink to={elem.path}>{elem.name}</NavLink>
      </li>
    ))

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {showRoutes}
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
