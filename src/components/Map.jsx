import { useEffect, useState, useRef } from "react"
import useMap from "../hooks/useMap"
import {
  createMarker,
  createPlacePopup,
  createPopup,
  setMarkerPopup,
} from "../api/mapAPI"
import useMapContext from "../hooks/useMapContext"
import Popup from "./Popup"

export default function Map() {
  const mapRef = useMap()
  const markerRef = useRef([])
  const [state, dispatch] = useMapContext()

  useEffect(() => {
    if (!mapRef.current) return

    // When center change, change viewport
    const zoom = state.mapOptions.zoom
    const centerLngLat = state.place.location
    mapRef.current.flyTo({ zoom, center: centerLngLat })

    // Create marker in the center of viewport
    const marker = createMarker(mapRef.current, centerLngLat)

    const popup = createPopup(createPlacePopup(state.place))
    marker.setPopup(popup)
    marker.togglePopup()

    markerRef.current = state.pinnedPlaces.map(place => {
      const marker = createMarker(mapRef.current, place.location)
      const popup = createPopup(createPlacePopup(place))
      marker.setPopup(popup)
      marker.togglePopup()
      return marker
    })

    // Clear marker when center change
    return () => {
      marker.remove()
      markerRef.current.forEach(marker => marker.remove())
    }
  }, [state, dispatch])

  return (
    <div id="map">
      <Popup mapRef={mapRef} location={state.place.location}/>
    </div>
  )
}
