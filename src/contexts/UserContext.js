import { createContext, useContext, useEffect, useReducer } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

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

// INITIAL STATE
const INITIAL_STATE = {
  user: !localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
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

// Reducer
export function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFetching: true, error: null }

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      }

    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      }

    default:
      throw new Error("Invalid action")
  }
}
