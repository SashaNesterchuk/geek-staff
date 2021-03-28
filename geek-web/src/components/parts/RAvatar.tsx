import React from 'react'
import './RAvatar.scss'
type Props = {
  avatar?: string
  name?: string
}

export const RAvatar: React.FC<Props> = ({ avatar, name }) => {
  const getName = name
    ? name[0].toUpperCase() + name[name.length - 1].toUpperCase()
    : 'UD'
  return (
    <div>
      {avatar ? (
        <img src={avatar} alt="" />
      ) : (
        <div className="avatar-default">{getName}</div>
      )}
    </div>
  )
}
