import { createContext, useEffect, useState } from "react"
import { createMap } from "../api/mapAPI"
import { useActivePlaceContext } from "../contexts/ActivePlaceContext"

export const MapContext = createContext()

export function Map({ children, config }) {
  const [mapInstance, setMapInstance] = useState(null)
  const [activePlace, setActivePlace] = useActivePlaceContext()

  useEffect(() => {
    if (mapInstance) return

    const center = activePlace?.location ?? [107.6416527, 11.295036]
    const map = createMap({ center, ...config })
    setMapInstance(map)
  }, [])

  useEffect(() => {
    if (!mapInstance || !activePlace) return

    mapInstance.flyTo({
      center: activePlace.location,
    })
  }, [activePlace])

  return (
    <div id="map">
      {mapInstance && (
        <MapContext.Provider value={mapInstance}>
          {children}
        </MapContext.Provider>
      )}
    </div>
  )
}
