import { Catalog } from '../../types'
import { ReduceAction, Actions } from '../actionTypes'

export interface CatalogState {
  catalogs: Array<Catalog>
}
const initialState: CatalogState = {
  catalogs: []
}

const catalogs = (state = initialState, action: ReduceAction): CatalogState => {
  switch (action.type) {
    case Actions.ADD_CATALOG:
      return Object.assign({}, state, {
        catalogs: [...state.catalogs, action.payload]
      })
    case Actions.FETCH_CATALOGS:
      return { ...state, catalogs: action.payload }
    default:
      return state
  }
}

export default catalogs
