export enum Actions {
  ADD_CATALOG = 'ADD_CATALOG',
  FETCH_CATALOGS = 'FETCH_CATALOGS',
  DELETE_CATALOG = 'DELETE_CATALOG'
}
export type ReduceAction = {
  type: Actions
  payload?: any
}
