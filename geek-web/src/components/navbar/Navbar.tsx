import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import routes, { Middleware } from '../../routes'
import './Navbar.scss'

export const Navbar: React.FC = () => {
  const auth = useContext(AuthContext)
  const logoutHandler = () => {
    auth.logout()
  }
  const showRoutes = routes
    .filter((elem) => elem.middleware === Middleware.Auth)
    .map((elem) => (
      <li key={elem.name} className="mr-2 navbar-item">
        <NavLink to={elem.path}>{elem.name}</NavLink>
      </li>
    ))

  return (
    <nav className="navbar p-4">
      <div className="">
        <ul className="d-flex align-center">
          {showRoutes}
          <li>
            <button className="btn btn-primary ml-2" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
