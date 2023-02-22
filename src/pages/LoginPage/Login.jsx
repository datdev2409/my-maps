import React, { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LoginFail,
  LoginStart,
  LoginSuccess,
  useUserContext,
} from "../../context/userContext"
import axios from "axios"
import { Alert } from "react-bootstrap"
import useRedirectPrevious from "../../hooks/useRedirectPrevious"

async function login(email, password) {
  if (!email || !password) throw new Error("Invalid email or password")
  const URL = "http://localhost:8000/api/auth/login"
  const res = await axios.post(URL, { email, password })
  return res.data
}

function Login() {
  const { error, dispatch } = useUserContext()

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(LoginStart())
    const fromData = new FormData(e.target)
    const data = Object.fromEntries(fromData.entries())

    try {
      const { email, password } = data
      const { user, token } = await login(email, password)
      dispatch(LoginSuccess(user, token))
    } catch (err) {
      if (err.response) {
        dispatch(LoginFail(err.response.data.message))
      } else dispatch(LoginFail(err.message))
    }
  }

  useRedirectPrevious()

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" />
      </div>

      <button type="submit">Login</button>

      <Alert variant="dark">
        Don't have an account.
        <Alert.Link>
          <Link to="/register">Register</Link>
        </Alert.Link>
      </Alert>
    </form>
  )
}

export default Login
