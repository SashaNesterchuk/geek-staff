import { Notification } from '../../components/notification/RNotification'
import { Actions, ReduceAction } from '../actionTypes'
export type NotificationState = {
  notifications: Array<Notification>
}
const initState: NotificationState = {
  notifications: []
}
const notifications = (
  state = initState,
  action: ReduceAction
): NotificationState => {
  switch (action.type) {
    case Actions.ADD_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: [...state.notifications, action.payload]
      })
    default:
      return state
  }
}
export default notifications
