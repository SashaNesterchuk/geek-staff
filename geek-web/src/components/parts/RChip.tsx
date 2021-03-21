import React from 'react'
type RChipProps = {
  close?: boolean
  text: string
  onClose?: () => void
  onClick?: () => void
}
export const RChip = (props: RChipProps) => {
  return (
    <div className="chip" onClick={props.onClick}>
      {props.text}
      {props.close && (
        <span className="ml-2" onClick={props.onClose}>
          X
        </span>
      )}
    </div>
  )
}
