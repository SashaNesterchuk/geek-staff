import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Message, User } from '../../../types'
import './ChatMessage.scss'
type Props = {
  message: Message
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const auth: any = useContext(AuthContext)
  const user: User = auth.user
  const isCurrentUserMessage = message.user === user._id
  return (
    <div
      className={isCurrentUserMessage ? 'message-block self' : 'message-block'}
    >
      <div
        className={isCurrentUserMessage ? 'message self' : 'message another'}
      >
        <div>{message.message}</div>
      </div>
    </div>
  )
}
