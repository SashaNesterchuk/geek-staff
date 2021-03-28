import React, { useState } from 'react'
type Props = {
  messageHandler: (message: string) => void
}

export const ChatTextearea: React.FC<Props> = ({ messageHandler }) => {
  const [text, setText] = useState('')
  const enterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter') {
      const target: any = e.target
      messageHandler(target.value)
      setText('')
    }
  }
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value)
  }
  return (
    <textarea
      className=""
      name="chat"
      id="chat"
      cols={30}
      rows={1}
      value={text}
      onChange={changeHandler}
      onKeyUp={enterHandler}
    ></textarea>
  )
}
