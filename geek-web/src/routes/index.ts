// import { LoginPage } from '../pages/auth/LoginPage'
// import { RegisterPage } from '../pages/auth/RegisterPage'
// import { CatalogPage } from '../pages/CatalogPage'
// import { DashboardPage } from '../pages/DashboardPage'
// import { SlackPage } from '../pages/SlackPage'
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
    component: `DashboardPage`,
    middleware: Middleware.Auth
  },
  {
    name: 'Catalog',
    path: '/catalog',
    component: `CatalogPage`,
    middleware: Middleware.Auth
  },
  {
    name: 'Slack',
    path: '/slack',
    component: `SlackPage`,
    middleware: Middleware.Auth
  },
  {
    name: 'Login',
    path: '/login',
    component: `LoginPage`,
    middleware: Middleware.Guest
  },
  {
    name: 'Register',
    path: '/regiser',
    component: `RegisterPage`,
    middleware: Middleware.Guest
  }
]
export default routes
export const navigation = (auth: boolean) => {
  return auth
    ? routes.filter((item) => item.middleware === Middleware.Auth)
    : routes.filter((item) => item.middleware === Middleware.Guest)
}
