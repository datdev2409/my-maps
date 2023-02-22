import { useRef, useEffect } from "react"
import { useMapContext } from "../context/mapContext"
import GoongJS from '@goongmaps/goong-js'
import { GOONG_MAPTILES_KEY } from "../config/key"

function createMap(container, config = {}) {
  GoongJS.accessToken = GOONG_MAPTILES_KEY
  const map = new GoongJS.Map({
    container: container,
    style: "https://tiles.goong.io/assets/goong_light_v2.json",
    zoom: 15,
    center: [107.6416527, 11.295036],
    ...config
  })

  return map
}

export default function useMap() {
  const mapRef = useRef(null)
const {mapInstance, setMapInstance} = useMapContext()

  useEffect(() => {
    let map;
    if (mapRef.current) {
      map = createMap(mapRef.current)
      setMapInstance(map)
    }

    return () => {
      if (map) map.remove()
    }


  }, [mapRef.current])

  return {mapRef, mapInstance}
}
