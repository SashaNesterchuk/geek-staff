import gql from 'graphql-tag'
import React, { useState } from 'react'
import { RModal } from '../parts/RModal'
import { useMutation, useQuery } from '@apollo/client'
import { User } from '../../types'
import { RLoader } from '../parts/RLoader'
import { RButton } from '../parts/RButton'
import './CreateDirect.scss'
const Users = gql`
  query users {
    users {
      _id
      name
    }
  }
`
const GROUP_CREATE = gql`
  mutation groupCreate($input: GroupInput) {
    groupCreate(input: $input) {
      _id
      name
    }
  }
`

interface FetchUsersData {
  users: [User]
}
type Props = {}
export const CreateDirect: React.FC<Props> = () => {
  const [choosesUsers, setChoosesUsers] = useState<Array<User>>([])
  const [showDirect, setShowDirect] = useState<boolean>(false)
  const [variablesGroupCreate] = useMutation(GROUP_CREATE)
  const { loading, data: fetchUsers } = useQuery<FetchUsersData>(Users)

  if (loading) return <RLoader />
  if (!fetchUsers) return <div>Users doesn't exist</div>

  const addUser = (user: User): void => {
    const findIndex = choosesUsers.findIndex((item) => item._id === user._id)
    if (findIndex !== -1) {
      setChoosesUsers(choosesUsers.filter((_, index) => index !== findIndex))
      return
    }
    setChoosesUsers([...choosesUsers, user])
  }
  const isChosen = (user: User): boolean => {
    return choosesUsers.some((item) => item._id === user._id)
  }
  const users = fetchUsers.users.map((item) => (
    <li
      onClick={() => addUser(item)}
      className={isChosen(item) ? 'active mb-2' : 'mb-2'}
      key={item._id}
    >
      {item.name}
    </li>
  ))
  const showHandle = (state: boolean) => {
    setShowDirect(state)
  }
  const createGroup = () => {
    const users = choosesUsers.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        email: item.email
      }
    })
    variablesGroupCreate({
      variables: {
        input: {
          name: choosesUsers.map((item) => item.name).join(', '),
          users: users,
          type: 'DIRECT'
        }
      }
    })
    showHandle(false)
  }

  return (
    <div>
      Direct messages: <span onClick={() => showHandle(true)}>++</span>
      <ul>
        {showDirect && (
          <RModal close={() => showHandle(false)}>
            {users}
            <div className="mt-2">
              <RButton click={createGroup} disabled={choosesUsers.length === 0}>
                Create
              </RButton>
            </div>
          </RModal>
        )}
      </ul>
    </div>
  )
}
