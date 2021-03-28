import React from 'react'
import { AuthPage } from '../pages/AuthPage'
import { CatalogPage } from '../pages/CatalogPage'
import { DashboardPage } from '../pages/DashboardPage'
import { SlackPage } from '../pages/SlackPage'
export enum Middleware {
  Auth,
  Guest
}
interface Route {
  name: string
  path: string
  component: any
  middleware?: Middleware
}
const routes: ReadonlyArray<Route> = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: DashboardPage,
    middleware: Middleware.Auth
  },
  {
    name: 'Catalog',
    path: '/catalog',
    component: CatalogPage,
    middleware: Middleware.Auth
  },
  {
    name: 'Slack',
    path: '/slack',
    component: SlackPage,
    middleware: Middleware.Auth
  },
  {
    name: 'Login',
    path: '/login',
    component: AuthPage,
    middleware: Middleware.Guest
  }
]
export default routes
