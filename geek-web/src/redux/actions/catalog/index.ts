import { Actions, ReduceAction } from '../../actionTypes'
import { Catalog } from '../../../types'
export const addCatalog = (catalog: Catalog): ReduceAction => {
  const actionCatalog: ReduceAction = {
    type: Actions.ADD_CATALOG,
    payload: catalog
  }
  return actionCatalog
}
export const fetchCatalogs = (catalogs: Array<Catalog>): ReduceAction => {
  const actionCatalog: ReduceAction = {
    type: Actions.FETCH_CATALOGS,
    payload: catalogs
  }
  return actionCatalog
}
export const deleteCatalog = (catalog: Catalog): ReduceAction => {
  const actionCatalog: ReduceAction = {
    type: Actions.DELETE_CATALOG,
    payload: catalog
  }
  return actionCatalog
}
