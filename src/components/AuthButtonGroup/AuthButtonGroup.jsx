import { Fragment } from "react"
import { BoxArrowInRight } from "react-bootstrap-icons"
import styles from "./AuthButtonGroup.module.css"
import { Logout, useAuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import { Button, Container } from "react-bootstrap"

function LoggedInBtnGroup() {
  const { user, dispatch } = useAuthContext()
  function handleLogout() {
    dispatch(Logout())
  }
  return (
    <Fragment>
      <Button
        variant="light"
        className="d-flex justify-content-center align-items-center"
      >
        <BoxArrowInRight onClick={handleLogout} />
      </Button>
    </Fragment>
  )
}

function DefaultBtnGroup() {
  const navigate = useNavigate()
  function handleLogin() {
    navigate("/login")
  }

  function handleRegister() {
    navigate("/register")
  }
  return (
    <Fragment>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleRegister}>Register</Button>
    </Fragment>
  )
}

export default function AuthButtonGroup() {
  const { user, dispatch } = useAuthContext()
  console.log(user)
  return (
    <div className={styles.container}>
      {user ? <LoggedInBtnGroup /> : <DefaultBtnGroup />}
    </div>
  )
}
