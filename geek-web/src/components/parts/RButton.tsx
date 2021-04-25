import React from 'react'

type Props = {
  children: React.ReactNode
  click: (any: any) => void
  disabled: boolean
}
export const RButton: React.FC<Props> = ({
  children,
  click,
  disabled = false
}) => {
  return (
    <button className="btn btn-primary" onClick={click} disabled={disabled}>
      {children}
    </button>
  )
}
