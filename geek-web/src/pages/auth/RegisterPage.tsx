import React, { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const RegisterPage: React.FC = () => {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  const changeHandler = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const registerHandler = async () => {
    try {
      const data = await request('/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card darken-1">
          <div className="card-content white-text">
            <div>
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn blue"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
