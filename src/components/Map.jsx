import { useEffect, useState } from "react"
import useMap from "../hooks/useMap"
import { createMarker, createPopup, setMarkerPopup } from "../api/mapAPI"
import useMapContext from "../hooks/useMapContext"

export default function Map() {
  const mapRef = useMap()
  const [state, dispatch] = useMapContext()

  useEffect(() => {
    if (!mapRef.current) return

    // When center change, change viewport
    const zoom = state.mapOptions.zoom
    const centerLngLat = state.place.location
    mapRef.current.flyTo({ zoom, center: centerLngLat })

    // Create marker in the center of viewport
    const marker = createMarker(mapRef.current, centerLngLat)

    // const popup = createPopup()
    // setMarkerPopup(marker, popup)

    // Clear marker when center change
    return () => {
      marker.remove()
    }
  }, [state, dispatch])

  return <div id="map"></div>
}
