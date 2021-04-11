import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { CatalogPage } from '../pages/CatalogPage'
import { DashboardPage } from '../pages/DashboardPage'
import { SlackPage } from '../pages/SlackPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/catalog">
          <CatalogPage />
        </Route>
        <Route path="/slack">
          <SlackPage />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  )
}
