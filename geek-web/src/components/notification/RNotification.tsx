import React, { FC } from 'react'
import './RNotification.scss'
export enum EnumNotification {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING'
}
export type Notification = {
  text: string
  type: EnumNotification
}
export const RNotification: FC<Notification> = ({ text }) => {
  return <div className="r-notification">{text}</div>
}
