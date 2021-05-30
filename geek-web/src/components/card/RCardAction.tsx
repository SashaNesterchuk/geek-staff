import React from 'react'
import './RCardAction.scss'
type Props = {
  children: React.ReactNode
}
export const RCardAction: React.FC<Props> = ({ children }) => {
  return <div className="r-card-action">{children}</div>
}
