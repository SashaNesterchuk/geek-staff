import React from 'react'
import './RModal.scss'
type Props = {
  children: React.ReactNode
  close: () => void
}
export const RModal: React.FC<Props> = ({ children, close }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" onClick={close}>
          close
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
