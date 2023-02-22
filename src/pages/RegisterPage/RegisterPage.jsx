import React from "react"
import {Link} from 'react-router-dom'
import { Alert } from "react-bootstrap"
import useRedirectPrevious from "../../hooks/useRedirectPrevious"
import {
  LoginFail,
  LoginSuccess,
  useUserContext,
} from "../../context/userContext"
import axios from "axios"

async function register(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Provide enough information")
  }
  const URL = "http://localhost:8000/api/auth/register"
  const res = await axios.post(URL, {name, email, password})
  return res.data
}

function RegisterPage() {
  const { error, dispatch } = useUserContext()

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    try {
      const { name, email, password } = data
      const { user, token } = await register(name, email, password)
      dispatch(LoginSuccess(user, token))
    }
    catch (err) {
      if (err.response) {
        dispatch(LoginFail(err.response.data.message))
      } else dispatch(LoginFail(err.message))
    }
  }

  useRedirectPrevious()

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error}
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" />
      </div>

      <button type="submit">Register</button>

      <Alert variant="dark">
        Aldready have an account
        <Alert.Link>
          <Link to="/login">Login</Link>
        </Alert.Link>
      </Alert>
    </form>
  )
}

export default RegisterPage
