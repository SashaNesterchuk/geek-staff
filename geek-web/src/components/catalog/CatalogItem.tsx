import React from 'react'
import { Catalog } from '../../types/'
type Props = {
  catalog: Catalog
}
export const CatalogItem: React.FC<Props> = ({ catalog }) => {
  return (
    <div className="col m3">
      <div className="card">
        <div className="card-content">
          <span className="card-title">{catalog.name}</span>
          <p>{catalog.description}</p>
        </div>
        <div className="card-action">
          <a href={catalog.link} target="_blank">
            link
          </a>
        </div>
      </div>
    </div>
  )
}
