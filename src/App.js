import React, {useState, useRef, useEffect} from 'react'
import mapboxgl from 'mapbox-gl'
import { MAPBOX_API_KEY } from './config/api_key'
import PlaceInput from './components/PlaceInput';

mapboxgl.accessToken = MAPBOX_API_KEY

export default function App() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const markers = useRef([])
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	const handleMapClick = (e) => {
		if (!map.current) return
		const marker = new mapboxgl.Marker()
			.setLngLat(e.lngLat)
			.setPopup(new mapboxgl.Popup().setHTML(`<p>Pinned!!</p>`))
			.addTo(map.current)
		
		marker.togglePopup()
		
		markers.current.push(marker)
	}


	useEffect(() => {
		if (map.current) return
		const mapConfig = {
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom
		}
		// Create new map
		map.current = new mapboxgl.Map(mapConfig)

		// Add click event handler in map
		map.current.on("click", handleMapClick)
	}, [])

	useEffect(() => {
		if (!map.current) return
		map.current.setCenter([lng, lat])
	}, [lng, lat, zoom])

	return (
		<div>
			<PlaceInput />
			<div className='map-container' ref={mapContainer}></div>
		</div>
	)

}
