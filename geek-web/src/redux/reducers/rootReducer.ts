import { combineReducers } from 'redux'
import { Catalog } from '../../types'
import catalogs from './catalogs'
import { CatalogState } from './catalogs'
const rootReducer = combineReducers({
  catalogs
})
export type RootState = {
  catalogs: CatalogState
}
export default rootReducer
