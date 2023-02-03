import React, { useEffect } from "react"
import { useActivePlaceContext } from "../contexts/ActivePlaceContext"
import { useSavedPlaces } from "../contexts/SavedPlacesContext"
import Pin from "./Pin"
import { getSavedPlaces } from "../api/placeAPI"

function MarkerList() {
  const [activePlace, setActivePlace] = useActivePlaceContext()
  const [savedPlaces, setSavedPlaces] = useSavedPlaces()

  useEffect(() => {
    getSavedPlaces().then(setSavedPlaces)
  }, [])

  return (
    <div>
      {activePlace && <Pin options={{ color: "red" }} place={activePlace} />}
      {savedPlaces.map((place, idx) => (
        <Pin key={idx} place={place} />
      ))}
    </div>
  )
}

export default MarkerList
