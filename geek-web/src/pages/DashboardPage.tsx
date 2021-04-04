import React from 'react'
import { DashboardItem } from '../components/dashboard/DashboardItem'
import { useQuery, gql } from '@apollo/client'
const TEST = gql`
  query {
    hello
  }
`
export const DashboardPage: React.FC = () => {
  // fetch('/graphql', {
  // method: 'POST',
  // headers: {
  // 'Content-Type': 'application/json',
  // Accept: 'application/json'
  // },
  // body: JSON.stringify({ query: '{ hello }' })
  // })
  // .then((r) => r.json())
  // .then((data) => console.log('data returned:', data))
  const { loading, error, data } = useQuery(TEST)
  console.log(data)
  return (
    <div>
      <h2>DashboardPage</h2>
      <div className="row">
        <div className="col-1 m3">
          <DashboardItem />
        </div>
      </div>
    </div>
  )
}
