import { useEffect, useRef } from "react"
import { createMap, createMarker } from "../../api/mapAPI"
import { useMapContext } from "../../context/mapContext"
import style from "./Map.module.css"
import { useAuthContext } from "../../context/authContext"

export function Map({ config, center }) {
  const { mapInstance, setMapInstance } = useMapContext()
  const mapRef = useRef(null)

  useEffect(() => {
    const map = createMap({ ...config, container: mapRef.current, center })
    setMapInstance(map)

    return () => {
      map.remove()
    }
  }, [mapRef])

  useEffect(() => {
    if (!mapInstance) return

    mapInstance.flyTo({
      center,
      ...config,
    })
    const marker = createMarker(mapInstance, center)

    return () => marker.remove()
  }, [center, config])

  return <div ref={mapRef} className={style.map} id="map"></div>
}
