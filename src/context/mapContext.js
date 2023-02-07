import { createContext, useContext, useState } from "react"

export const MapContext = createContext()

export function MapContextProvider({ children }) {
  const [mapInstance, setMapInstance] = useState(null)

  return (
    <MapContext.Provider value={{ mapInstance, setMapInstance }}>
      {children}
    </MapContext.Provider>
  )
}

export function useMapContext() {
  return useContext(MapContext)
}
