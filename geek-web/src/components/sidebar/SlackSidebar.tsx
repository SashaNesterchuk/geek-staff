import React from 'react'
import './SlackSidebar.scss'
type Props = {
  items: string[]
  active: string
  chooseHandle: (name: string) => () => void
}

export const SlackSidebar: React.FC<Props> = ({
  items,
  active,
  chooseHandle
}) => {
  return (
    <div className="slack-sidebar">
      <ul>
        {items.map((item) => (
          <li
            className={item === active ? 'active p-1' : 'p-1'}
            key={item}
            onClick={chooseHandle(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
