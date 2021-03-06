import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CatalogItem } from '../components/catalog/CatalogItem'
import { CatalogPlus } from '../components/catalog/CatalogPlus'
import { useHttp } from '../hooks/http.hook'
import { fetchCatalogs } from '../redux/actions/catalog'
import { RootState } from '../redux/reducers/rootReducer'
import { Catalog } from '../types'

export const CatalogPage: React.FC = () => {
  const { request } = useHttp()
  const dispatch = useDispatch()
  const catalogs: Array<Catalog> = useSelector(
    (state: RootState) => state.catalogs.catalogs
  )
  useEffect(() => {
    const fetch = async () => {
      const data: Array<Catalog> = await request('/api/catalog/all', 'GET')
      dispatch(fetchCatalogs(data))
    }
    fetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const renderCatalogs = catalogs.map((elem) => (
    <div key={elem._id} className="col-2 m-2">
      <CatalogItem catalog={elem} />
    </div>
  ))
  return (
    <div>
      <h2>Catalog Page</h2>
      <div className="row">
        {renderCatalogs}
        <div className="col-2 m-2">
          <CatalogPlus />
        </div>
      </div>
    </div>
  )
}
