import React from 'react'
import { DashboardItem } from '../components/dashboard/DashboardItem'
export const DashboardPage = () => {
  return (
    <div>
      <h2>DashboardPage</h2>
      <div className="row">
        <div className="col m3">
          <DashboardItem />
        </div>
      </div>
    </div>
  )
}
