import React, { useState } from 'react'
import { RChat } from '../components/chat/RChat'
import './SlackPage.scss'
import { Group } from '../types'
import { Channels } from '../components/slack/Channels'
import { AuthContext } from '../context/AuthContext'

export const SlackPage = () => {
  const [activeGroup, setActiveGroup] = useState<Group | undefined>()
  const activateHandle = (group: Group) => {
    setActiveGroup(group)
  }
  return (
    <div className="row flex">
      <div className="col-3 sidebar">
        <Channels updateActive={activateHandle} />
      </div>
      {!!activeGroup && (
        <div className="col-9">
          <RChat group={activeGroup} />
        </div>
      )}
    </div>
  )
}
