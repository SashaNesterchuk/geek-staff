import React from 'react'
import './RCard.scss'
type Props = {
  children: React.ReactNode
}

export const RCard: React.FC<Props> = ({ children }) => {
  return <div className="card p-2">{children}</div>
}
