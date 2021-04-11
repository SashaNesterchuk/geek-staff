import React, { useState } from 'react'
import { Group, Message, User } from '../../types'
import { ChatMessage } from './message/ChatMessage'
import { ChatTextearea } from './parts/ChatTextearea'
import './RChat.scss'
import { users } from '../../mock/Users'
type Props = {
  group: Group
}
export const RChat: React.FC<Props> = ({ group }) => {
  const [messages, setMessages] = useState<Array<Message>>([
    { text: 'Hi!', user: users[0] },
    { text: 'Hey!', user: users[1] },
    { text: 'How are you?', user: users[0] },
    { text: 'Ok, How about you?', user: users[1] }
  ])
  const addMessage = (message: string) => {
    const user: User | undefined = group.users[0]
    const me: Message = { user, text: message }
    setMessages([...messages, me])
  }
  return (
    <div className="chat">
      {messages.map((item) => (
        <ChatMessage key={item.text} message={item} />
      ))}
      <ChatTextearea messageHandler={addMessage} />
    </div>
  )
}
