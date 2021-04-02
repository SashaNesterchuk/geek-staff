import React from 'react'
import { Message } from '../../../types'
import './ChatMessage.scss'
type Props = {
  message: Message
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isSelf = message.user.name === 'Sasha'
  return (
    <div className={isSelf ? 'message-block self' : 'message-block'}>
      <div className={isSelf ? 'message self' : 'message another'}>
        <div>{message.text}</div>
      </div>
    </div>
  )
}
