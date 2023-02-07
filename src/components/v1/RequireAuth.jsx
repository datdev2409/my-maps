import React from "react"
import { useUserContext } from "../context/UserContext"
import { Navigate, useLocation } from "react-router-dom"

function RequireAuth({ children }) {
  const { user } = useUserContext()
  const location = useLocation()

  if (!user) {
    return <Navigate state={{ from: location }} to={"/login"} replace />
  }

  return children
}

export default RequireAuth
