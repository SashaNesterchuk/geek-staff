import React from 'react'
import 'RCardTitle.scss'
type Props = {
  children: React.ReactNode
}

export const RCardTitle: React.FC<Props> = ({ children }) => {
  return <div className="card-title">{children}</div>
}
