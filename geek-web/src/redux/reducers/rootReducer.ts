import { combineReducers } from 'redux'
import catalogs, { CatalogState } from './catalogs'
import notifications, { NotificationState } from './notifications'
const rootReducer = combineReducers({
  catalogs,
  notifications
})
export type RootState = {
  catalogs: CatalogState
  notifications: NotificationState
}
export default rootReducer
