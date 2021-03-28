import React from 'react'
type Props = {
  children: React.ReactNode
}

export const RCardContent: React.FC<Props> = ({ children }) => {
  return <div className="card-content">{children}</div>
}
