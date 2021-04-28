import React from 'react'
import { useDispatch } from 'react-redux'
import { Catalog } from '../../types/'
import { RChip } from '../parts/RChip'
import { useHttp } from '../../hooks/http.hook'
import { deleteCatalog } from '../../redux/actions/catalog'
type Props = {
  catalog: Catalog
}
export const CatalogItem: React.FC<Props> = ({ catalog }) => {
  const { request } = useHttp()
  const dispatch = useDispatch()
  const chips = catalog.tags
    ? catalog.tags.map((item) => <RChip key={item.name} text={item.name} />)
    : ''
  const onDelete = () => {
    request('/api/catalog/delete', 'DELETE', {
      id: catalog._id
    }).then(() => {
      dispatch(deleteCatalog(catalog))
    })
  }
  return (
    <div className="col m3">
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <span>{catalog.name}</span>
            <span onClick={onDelete}>delete</span>
          </div>
          <p>{catalog.description}</p>
          <div>
            Tags:
            <div>{chips}</div>
          </div>
        </div>
        <div className="card-action">
          <a href={catalog.link} rel="noreferrer" target="_blank">
            link
          </a>
        </div>
      </div>
    </div>
  )
}
