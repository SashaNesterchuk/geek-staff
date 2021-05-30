import React from 'react'
import { RCard } from '../card/RCard'
import { RCardContent } from '../card/RCardContent'
export const DashboardItem: React.FC = () => {
  return (
    <RCard>
      <RCardContent>
        <span className="card-title activator grey-text text-darken-4">
          Card Title
        </span>
        <p>This is a link</p>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Card Title<i className="material-icons right">close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </RCardContent>
    </RCard>
  )
}
