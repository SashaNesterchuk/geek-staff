import React, { useState, useEffect } from 'react'
import { RCard } from '../../components/card/RCard'
import { RCardAction } from '../../components/card/RCardAction'
import { RCardContent } from '../../components/card/RCardContent'
import { RCardTitle } from '../../components/card/RCardTitle'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { useHistory } from 'react-router-dom'
export const RegisterPage: React.FC = () => {
  const message = useMessage()
  const history = useHistory()
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
  const loginHandler = () => {
    history.push('/login')
  }
  const registerHandler = async () => {
    try {
      const data = await request('/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }
  return (
    <div className="row justify-center mt-6">
      <div className="col s12 mt-7">
        <RCard>
          <RCardTitle>Register Page</RCardTitle>
          <RCardContent>
            <div>
              <div className="input-field mb-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="validate"
                  onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
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
              onClick={registerHandler}
              disabled={loading || !form.email}
            >
              Register
            </button>
            <button className="btn-primary" onClick={loginHandler}>
              Login
            </button>
          </RCardAction>
        </RCard>
      </div>
    </div>
  )
}
