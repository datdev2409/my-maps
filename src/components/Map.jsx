import React, { useEffect, useRef, useState } from 'react'

function Map({center}) {
    const ref = useRef(null)
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState(null)

    const createMap = () => {
        setMap(new window.google.maps.Map(ref.current, {
            center,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
            rotateControl: true,
            fullscreenControl: true,
            scaleControl: true
        }))
    }

    // Handle create map and marker
    useEffect(() => {
        if (!map) createMap()
        else {
            setMarker(new window.google.maps.Marker({
                map, position: center
            }))
        }
    }, [ref, map])

    // Handle when center change, re-render map
    useEffect(() => {
        createMap()
    }, [ref, center])

    return (
        <div id="map" ref={ref}></div>
    )
}

export default Map
