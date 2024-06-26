import React, { useState } from "react"
import { login } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import "./LoginForm.css"

function LoginFormPage() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data)
    }
  }

  return (
    <div className="log-in-form-container">
      <h1>Log In</h1>
      <form className="log-in-form-elements-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <label className="email-label">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="log-in-password-container">
          <label className="password-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="log-in-form-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  )
}

export default LoginFormPage
