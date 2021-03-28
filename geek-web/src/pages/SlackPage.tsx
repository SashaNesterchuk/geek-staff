import React, { useState } from 'react'
import { RChat } from '../components/chat/RChat'
import { SlackSidebar } from '../components/sidebar/SlackSidebar'
import { User, Group } from '../types'
import './SlackPage.scss'
import { users } from '../mock/Users'
export const SlackPage = () => {
  const [activeUser, setActiveUser] = useState<User | undefined>()
  const onUserChoose = (name: string) => {
    return () => {
      setActiveUser(users.find((item) => item.name === name))
    }
  }
  const sidebar: string[] = users.map((item) => item.name)
  return (
    <div className="row flex">
      <div className="col-3 sidebar">
        <SlackSidebar
          items={sidebar}
          active={activeUser ? activeUser.name : ''}
          chooseHandle={onUserChoose}
        />
      </div>
      {!!activeUser && (
        <div className="col-9">
          <RChat user={activeUser} />
        </div>
      )}
    </div>
  )
}
