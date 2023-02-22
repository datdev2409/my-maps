import React from "react"
import { useUserContext } from "../context/userContext"
import { Navigate, useLocation } from "react-router-dom"

function ProtectRoute({ children }) {
  const { pathname, search } = useLocation()
  const { user } = useUserContext()
  return user ? (
    children
  ) : (
    <Navigate replace state={{ from: `${pathname}${search}` }} to="/login" />
  )
}

export default ProtectRoute
