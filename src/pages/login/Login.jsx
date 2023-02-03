import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import {
  LoginStart,
  LoginSuccess,
  useUserContext,
} from "../../contexts/UserContext"
import { useLocation, useNavigate } from "react-router-dom"

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [error, setError] = useState(null)
  const { dispatch, isFetching, user } = useUserContext()
  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || "/"

  async function handleSubmit(e) {
    e.preventDefault()
    dispatch(LoginStart())
    console.log("email: ", emailRef.current.value)
    console.log("password: ", passwordRef.current.value)

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })

      console.log(res.data)
      dispatch(LoginSuccess(res.data))
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
