import React, { useState, useEffect, useContext } from 'react'
import { RCard } from '../../components/card/RCard'
import { RCardAction } from '../../components/card/RCardAction'
import { RCardContent } from '../../components/card/RCardContent'
import { RCardTitle } from '../../components/card/RCardTitle'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { useHistory } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const history = useHistory()
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
  const registerHandler = () => {
    history.push('/register')
  }
  const loginHandler = async () => {
    try {
      const data = await request('/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row justify-center mt-6">
      <div className="col s12 mt-7">
        <RCard>
          <RCardTitle>Login Page</RCardTitle>
          <RCardContent>
            <div>
              <div className="input-field mb-2">
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
          </RCardContent>
          <RCardAction>
            <button
              className="btn-success mr-1"
              onClick={loginHandler}
              disabled={loading || !form.email}
            >
              Login
            </button>
            <button className="btn-primary" onClick={registerHandler}>
              Register
            </button>
          </RCardAction>
        </RCard>
      </div>
    </div>
  )
}
