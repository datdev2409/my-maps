import { useEffect, useState } from 'react';
import useMap from '../hooks/useMap';
import goongJs from '@goongmaps/goong-js';

export default function Map({center}) {
    const mapRef = useMap({center: center})
    const [zoom, setZoom] = useState(15)


    useEffect(() => {
        console.log("run at first")
        if (!mapRef.current) return
        mapRef.current.flyTo({zoom ,center})

        const marker = new goongJs.Marker()
            .setLngLat(center)
            .addTo(mapRef.current);

        return () => {
            marker.remove()
        }

    }, [zoom, center])


    return (
        <div>
            <div id="map"></div>
            <button onClick={() => setZoom(zoom + 1)}>Zoom in</button>
            <button onClick={() => setZoom(zoom - 1)}>Zoom out</button>
        </div>
    )
}
