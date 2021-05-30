import React from 'react'
import './RChip.scss'
type Props = {
  close?: boolean
  text: string
  onClose?: () => void
  onClick?: () => void
}
export const RChip: React.FC<Props> = (props) => {
  return (
    <div className="r-chip" onClick={props.onClick}>
      {props.text}
      {props.close && (
        <span className="ml-2" onClick={props.onClose}>
          X
        </span>
      )}
    </div>
  )
}
