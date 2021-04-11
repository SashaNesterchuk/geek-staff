import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Group } from '../../types'
import { SlackSidebar } from '../sidebar/SlackSidebar'
import { RLoader } from '../parts/RLoader'
import { CreateDirect } from './CreateDirect'
export enum Slack {
  DIRECT = 'DIRECT',
  CHANNEL = 'CHANNEL'
}
const Groups = gql`
  query groups {
    groups {
      name
    }
  }
`
interface FetchUsersData {
  groups: Group[]
}
type Props = {
  updateActive: (group: Group) => void
}
export const Channels: React.FC<Props> = ({ updateActive }) => {
  const { data, loading } = useQuery<FetchUsersData>(Groups)
  const [activeGroup, setActiveGroup] = useState<Group | undefined>()
  const [createDirect, setCreateDirect] = useState<boolean>(false)

  if (loading || !data) return <RLoader />

  const getNameGroups = (type: Slack): string[] => {
    return data.groups
      .filter((item) => item.type === type)
      .map((item) => item.name)
  }
  const sidebarChannel: string[] = getNameGroups(Slack.CHANNEL)
  const sidebarDirect: string[] = getNameGroups(Slack.DIRECT)

  const onGroupChoose = (name: string) => {
    return () => {
      const group: Group | undefined = data.groups.find(
        (item) => item.name === name
      )
      if (!group) {
        throw new Error('Activated group that doesnt exist')
      }
      setActiveGroup(group)
      updateActive(group)
    }
  }
  const addDirectHandle = (state: boolean) => {
    setCreateDirect(state)
  }
  return (
    <div>
      <div>Channels:</div>
      <SlackSidebar
        items={sidebarChannel}
        active={activeGroup ? activeGroup.name : ''}
        chooseHandle={onGroupChoose}
      />
      <div>
        Direct messages: <span onClick={() => addDirectHandle(true)}>++</span>
      </div>
      <SlackSidebar
        items={sidebarDirect}
        active={activeGroup ? activeGroup.name : ''}
        chooseHandle={onGroupChoose}
      />
      {createDirect && <CreateDirect close={() => addDirectHandle(false)} />}
    </div>
  )
}
