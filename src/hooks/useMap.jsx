import { useRef, useEffect } from "react"
import { createMap } from "../api/mapAPI";

export default function useMap(config) {
    const mapRef = useRef(null)

    useEffect(() => {
        if (mapRef.current) return

        mapRef.current = createMap(config)
    }, [mapRef])

    return mapRef
}
