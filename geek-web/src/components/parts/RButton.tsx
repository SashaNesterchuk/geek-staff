import React from 'react'

type Props = {
  children: React.ReactNode
}
export const RButton: React.FC<Props> = ({ children }) => {
  return <button className="btn">{children}</button>
}
