import { createContext, useEffect, useReducer } from "react"
import { reducer } from "./reducer"
import initialState from "./initialState"
import { data } from "../api/placeAPI"
import { LOAD_PINNED_PLACES } from "./constant"

const MapContext = createContext()

function MapContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getPinnedPlaces = async () => {
    const URL = "http://localhost:8080/places"
    const places = await (await fetch(URL)).json()
    return places
  }

  useEffect(() => {
    getPinnedPlaces().then(places => {
      dispatch({
        type: LOAD_PINNED_PLACES,
        data: places,
      })
    })
  }, [])

  return (
    <MapContext.Provider value={[state, dispatch]}>
      {children}
    </MapContext.Provider>
  )
}

export { MapContext, MapContextProvider }
