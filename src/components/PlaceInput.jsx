import React, { useEffect, useRef, useState } from 'react'
import {Search} from 'react-feather'

function PlaceInput({setCenter}) {
    const ref = useRef(null)
    const [autoCompleteWidget, setAutoCompleteWidget] = useState(null)

    const onPlaceChanged = () => {
        const place = autoCompleteWidget.getPlace()

        // Reset input if user don't select any place in dropdown
        if (!place.geometry) {
            const map = document.createElement('div')
            const request = {
                query: place.name,
                fields: ['name', 'geometry']
            }
            const service = new window.google.maps.places.PlacesService(map)
            service.textSearch(request, (results, status) => {
                if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results)
                }
            })
        }
        else {
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            setCenter({lat, lng})
        }

    }

    useEffect(() => {
        if (ref.current && !autoCompleteWidget) {
            setAutoCompleteWidget(
                new window.google.maps.places.Autocomplete(ref.current, {})
            )
        }

        if (autoCompleteWidget) {
            autoCompleteWidget.addListener("place_changed", onPlaceChanged)
        }
    }, [ref, autoCompleteWidget])

    return (
        <div className="place-search">
            <input
                className="place-search-input"
                placeholder='Enter a place'
                type="text"
                ref={ref} 
            />
            <Search
                className='place-search-icon'
                color='grey'
                size={18}
            />
        </div>
    )
}

export default PlaceInput
