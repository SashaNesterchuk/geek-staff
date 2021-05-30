import React from 'react'
type Props = {
  children: React.ReactNode
}

export const RCardContent: React.FC<Props> = ({ children }) => {
  return <div className="p-2">{children}</div>
}
