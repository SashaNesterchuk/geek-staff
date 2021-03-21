export enum Actions {
  ADD_CATALOG = 'ADD_CATALOG',
  FETCH_CATALOGS = 'FETCH_CATALOGS'
}
export type ReduceAction = {
  type: Actions
  payload?: any
}
