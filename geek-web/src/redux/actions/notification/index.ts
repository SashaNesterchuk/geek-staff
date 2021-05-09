import { Actions, ReduceAction } from '../../actionTypes'
import { Notification } from '../../../components/notification/RNotification'
export const addNotification = (notifiaction: Notification): ReduceAction => {
  const actionNotification = {
    type: Actions.ADD_NOTIFICATION,
    payload: notifiaction
  }
  return actionNotification
}
