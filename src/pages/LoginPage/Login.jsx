import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { login } from "../../services/authService"
import {
  useAuthContext,
  LoginStart,
  LoginSuccess,
} from "../../context/authContext"

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [error, setError] = useState(null)
  const { dispatch, isFetching, user } = useAuthContext()
  let location = useLocation()
  let navigate = useNavigate()

  console.log(localStorage.getItem("access_token"))
  console.log(localStorage.getItem("user"))

  let from = location.state?.from?.pathname || "/"

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(LoginStart())
    console.log("email: ", emailRef.current.value)
    console.log("password: ", passwordRef.current.value)

    try {
      const email = emailRef.current.value
      const password = passwordRef.current.value
      const res = await login(email, password)

      dispatch(LoginSuccess(res))
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} id="password" name="password" />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
