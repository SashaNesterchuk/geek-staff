import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage: React.FC = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
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
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.id)
    } catch (e) {}
  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Geek</h1>
      </div>
      <div className="col s12 m6">
        <div className="card darken-1">
          <div className="card-content white-text">
            <span className="card-title">Login</span>
            <div>
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
              className="btn green"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
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
