import React from 'react'
import './SlackSidebar.scss'
type Props = {
  items: string[]
  active: string
  chooseHandle: (name: string) => () => void
  deleteHandle: (name: string) => () => void
}

export const SlackSidebar: React.FC<Props> = ({
  items,
  active,
  chooseHandle,
  deleteHandle
}) => {
  return (
    <div className="slack-sidebar">
      <ul>
        {items.map((item) => (
          <li
            className={
              item === active
                ? 'active p-1 d-flex justify-between'
                : 'p-1 d-flex justify-between'
            }
            key={item}
            onClick={chooseHandle(item)}
          >
            <span>{item}</span>
            <span onClick={deleteHandle(item)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
