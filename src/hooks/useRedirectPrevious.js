import { useEffect } from "react"
import { useUserContext } from "../context/userContext"
import { useLocation, useNavigate } from "react-router-dom"

function useRedirectPrevious() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUserContext()
  console.log(user)
  useEffect(() => {
    if (user) {
      const from = location?.state?.from || "/"
      navigate(from, { replace: true })
    }
  }, [user])
}

export default useRedirectPrevious
