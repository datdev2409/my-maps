import { createContext, useContext, useState } from "react"

export const SavedPlaces = createContext()

export function useSavedPlaces() {
  return useContext(SavedPlaces)
}

export function SavedPlacesProvider({ children }) {
  const [savedPlaces, setSavedPlaces] = useState([])
  return (
    <SavedPlaces.Provider value={[savedPlaces, setSavedPlaces]}>
      {children}
    </SavedPlaces.Provider>
  )
}
