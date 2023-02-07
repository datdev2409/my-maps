import { createContext, useContext, useEffect, useReducer } from "react"
import { getMe } from "../services/userService"
import { tokenStorage } from "../services/localStorageService"

const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    async function getUserInfo() {
      const access_token = tokenStorage.get()
      console.log("access_token" + access_token)
      if (access_token) {
        const user = await getMe()
        dispatch(LoadUserInfo(user))
      }
    }

    getUserInfo().catch(err => console.log(err))
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuthContext() {
  return useContext(AuthContext)
}

// INITIAL STATE
const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
}

// Actions
export function LoginStart() {
  return {
    type: "LOGIN_START",
  }
}

export function LoginSuccess(user) {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
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

// Reducer
export function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFetching: true, error: null }

    case "LOGIN_SUCCESS":
      tokenStorage.set(action.payload?.access_token)
      return {
        user: action.payload?.user,
        isFetching: false,
        error: null,
      }

    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      }

    case "LOAD_USER":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      }

    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: null,
      }

    default:
      throw new Error("Invalid action")
  }
}
