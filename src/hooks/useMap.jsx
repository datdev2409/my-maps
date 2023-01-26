import { useRef, useEffect } from "react"
import {GOONG_API_KEY, GOONG_MAPTILES_KEY} from '../config/key'
import goongJs from '@goongmaps/goong-js';

goongJs.accessToken = GOONG_MAPTILES_KEY
export default function useMap(config) {
    const mapRef = useRef(null)
    // const [mapConfig, setMapConfig] = useState(config)

    useEffect(() => {
        const center = config?.center ?? [105.6390316, 10.4607423]
        if (mapRef.current) return

        mapRef.current = new goongJs.Map({
            container: 'map',
            style: 'https://tiles.goong.io/assets/goong_map_web.json',
            zoom: 12,
            center,
            ...config
        })

        const marker = new goongJs.Marker()
            .setLngLat(center)
            .addTo(mapRef.current);

        return () => {
            marker.remove()
        }
    }, [])

    return mapRef
}
