import React from "react"
import { useSavedPlaces } from "../contexts/SavedPlacesContext"
import { useActivePlaceContext } from "../contexts/ActivePlaceContext"
import { MapPin } from "react-feather"

function PlaceSummaryItem({ place }) {
  const [activePlace, setActivePlace] = useActivePlaceContext()

  function handleClick() {
    setActivePlace(place)
  }

  return (
    <div className="place-summary-item" onClick={handleClick}>
      <MapPin />
      <div className="place-summary-content">
        <h6 className="place-summary-name">
          {place.name ?? place.formatted_address}
        </h6>
        <p className="place-summary-address">{place.formatted_address}</p>
      </div>
    </div>
  )
}

export default function PlaceSumary() {
  const [savedPlaces, setSavedPlaces] = useSavedPlaces()

  console.log("place summary -change")
  return (
    <div className="place-summary">
      {savedPlaces.map((place, idx) => (
        <PlaceSummaryItem key={idx} place={place} />
      ))}
    </div>
  )
}
