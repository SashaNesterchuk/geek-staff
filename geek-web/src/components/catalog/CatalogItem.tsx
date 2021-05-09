import React from 'react'
import { useDispatch } from 'react-redux'
import { Catalog } from '../../types/'
import { RChip } from '../parts/RChip'
import { useHttp } from '../../hooks/http.hook'
import { deleteCatalog } from '../../redux/actions/catalog'
import { RCard } from '../card/RCard'
import { RCardTitle } from '../card/RCardTitle'
import { RCardContent } from '../card/RCardContent'
import { RCardAction } from '../card/RCardAction'
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
    <RCard>
      <RCardTitle>
        <span>{catalog.name}</span>
        <span onClick={onDelete}>delete</span>
      </RCardTitle>
      <RCardContent>
        <p>{catalog.description}</p>
        <div>
          <div className="mb-1">Tags:</div>
          <div>{chips}</div>
        </div>
      </RCardContent>
      <RCardAction>
        <a href={catalog.link} rel="noreferrer" target="_blank">
          link
        </a>
      </RCardAction>
    </RCard>
  )
}
