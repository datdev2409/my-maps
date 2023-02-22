import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import axios from "axios"

const UserContext = createContext()

async function getMe(access_token) {
  if (!access_token) return { user: null, token: null }
  const URL = "http://localhost:8000/api/auth/me"
  const res = await axios.get(URL, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })

  return res.data
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState)

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token")
    getMe(storedToken)
      .then(({ user }) => dispatch(LoadUserInfo(user)))
      .catch(console.error)
  }, [])

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook
export function useUserContext() {
  return useContext(UserContext)
}

const initalState = {
  user: null,
  error: null,
  loading: false
}

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        error: null,
        loading: true,
      }

    case "LOGIN_SUCCESS":
      localStorage.setItem("access_token", action.payload?.access_token || "")
      return {
        user: action.payload?.user,
        error: null,
        loading: false,
      }
    
    case "LOAD_USER":
      return {
        user: action.payload?.user,
        error: null,
        loading: false
      }

    case "LOGOUT":
      localStorage.removeItem("access_token")
      return {
        user: null,
        error: null,
        loading: false,
      }

    case "LOGIN_FAIL":
      return {
        user: null,
        error: action.payload,
        loading: false
      }

    default:
      throw new Error("Invalid action type")
  }
}

// Actions
export function LoginStart() {
  return {
    type: "LOGIN_START",
  }
}

export function LoginSuccess(user, access_token) {
  return {
    type: "LOGIN_SUCCESS",
    payload: {user, access_token},
  }
}

export function LoginFail(error) {
  return {
    type: "LOGIN_FAIL",
    payload: error,
  }
}

export function LoadUserInfo(user) {
  return {
    type: "LOAD_USER",
    payload: user,
  }
}

export function Logout() {
  return {
    type: "LOGOUT",
  }
}
