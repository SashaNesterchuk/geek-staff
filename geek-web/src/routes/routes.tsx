import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { CatalogPage } from '../pages/CatalogPage'
import { DashboardPage } from '../pages/DashboardPage'

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>
        <Route path="/catalog" exact>
          <CatalogPage />
        </Route>
        <Redirect to="/dashboard" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/login" exact>
        <AuthPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  )
}
