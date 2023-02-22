export const initialState = {
  loading: false,
  showHint: false,
  suggestions: [],
}

export function reducer(state, action) {
  switch (action.type) {
    case "LOADING_START":
      return {
        ...state,
        loading: true,
        showHint: true,
      }

    case "LOADING_SUCCESS":
      return {
        loading: false,
        showHint: true,
        suggestions: action.payload,
      }

    case "HIDE_HINT":
      return {
        ...state,
        loading: false,
        showHint: false,
      }

    case "SHOW_HINT":
      return {
        ...state,
        loading: false,
        showHint: true,
      }

    case "CLEAR":
      return {
        loading: false,
        showHint: false,
        suggestions: [],
      }

    default:
      throw new Error("Invalid action")
      break
  }
}

export function LoadStart() {
  return { type: "LOADING_START" }
}

export function LoadSuccess(suggestions) {
  return { type: "LOADING_SUCCESS", payload: suggestions }
}

export function CLEAR() {
  return { type: "CLEAR" }
}

export function HideHint() {
  return { type: "HIDE_HINT" }
}

export function ShowHint() {
  return { type: "SHOW_HINT" }
}
