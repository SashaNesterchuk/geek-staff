import React, { useState, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Group, Message, User } from '../../types'
import { ChatMessage } from './message/ChatMessage'
import { ChatTextearea } from './parts/ChatTextearea'
import './RChat.scss'
import { users } from '../../mock/Users'
import gql from 'graphql-tag'
import { RLoader } from '../parts/RLoader'
import { AuthContext } from '../../context/AuthContext'
type Props = {
  group: Group
}
const MESSAGES = gql`
  query messages($input: MessagesInput) {
    messages(input: $input) {
      messages {
        _id
        user
        message
        created
      }
    }
  }
`
const MESSAGE_CREATE = gql`
  mutation messageCreate($input: MessageInput) {
    messageCreate(input: $input) {
      _id
      user
      message
      created
    }
  }
`

export const RChat: React.FC<Props> = ({ group }) => {
  const auth: any = useContext(AuthContext)
  const user: User = auth.user
  const { data, loading } = useQuery(MESSAGES, {
    variables: { input: { groupId: group._id } }
  })
  const [messageCreate] = useMutation(MESSAGE_CREATE)

  if (loading) {
    return <RLoader></RLoader>
  }
  const addMessage = (message: string) => {
    messageCreate({
      variables: {
        input: {
          groupId: group._id,
          message,
          userId: user._id
        }
      },
      update(cache, { data: { messageCreate } }) {
        const data: any = cache.readQuery({
          query: MESSAGES,
          variables: { input: { groupId: group._id } }
        })
        cache.writeQuery({
          query: MESSAGES,
          variables: { input: { groupId: group._id } },
          data: {
            messages: { messages: data.messages.messages.concat(messageCreate) }
          }
        })
      }
    })
  }
  return (
    <div className="chat">
      {data.messages.messages.map((item: Message) => (
        <ChatMessage key={item._id} message={item} />
      ))}
      <ChatTextearea messageHandler={addMessage} />
    </div>
  )
}
