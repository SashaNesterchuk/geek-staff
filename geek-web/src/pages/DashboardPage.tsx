import React from 'react'
import { DashboardItem } from '../components/dashboard/DashboardItem'

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h2>DashboardPage</h2>
      <div className="row">
        <div className="col-3 m3">
          <DashboardItem />
        </div>
      </div>
    </div>
  )
}
