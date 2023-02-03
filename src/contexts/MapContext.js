import { createContext, useEffect, useState } from "react"
import { createMap } from "../api/mapAPI"

export const MapContext = createContext()

export function Map({ children, config }) {
  const [mapInstance, setMapInstance] = useState(null)

  useEffect(() => {
    if (mapInstance) return

    const map = createMap({...config})
    setMapInstance(map)
  }, [])

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
