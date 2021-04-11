import gql from 'graphql-tag'
import React, { useState } from 'react'
import { RModal } from '../parts/RModal'
import { useQuery } from '@apollo/client'
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
interface FetchUsersData {
  users: [User]
}
type Props = {
  close: () => void
  //   choose: (User[]) => void
}
export const CreateDirect: React.FC<Props> = ({ close }) => {
  const [choosesUsers, setChoosesUsers] = useState<Array<User>>([])
  const { loading, data } = useQuery<FetchUsersData>(Users)
  if (loading) return <RLoader />
  if (!data) return <div>Users doesn't exist</div>
  const addUser = (user: Array<User>): void => {
    setChoosesUsers(user)
  }
  const isChosen = (user: User): boolean => {
    return choosesUsers.some((item) => item._id === user._id)
  }
  const users = data.users.map((item) => (
    <li
      onClick={() => addUser([...choosesUsers, item])}
      className={isChosen(item) ? 'active mb-2' : 'mb-2'}
      key={item._id}
    >
      {item.name}
    </li>
  ))
  return (
    <div>
      <ul>
        <RModal close={close}>
          {users}
          <div className="mt-2">
            <RButton>Create</RButton>
          </div>
        </RModal>
      </ul>
    </div>
  )
}
