import React, { useEffect, useRef, useState } from 'react'
import {Search} from 'react-feather'
import { MAPBOX_API_KEY } from '../config/api_key'

export default function PlaceInput() {
    const inputRef = useRef(null)
    const [input, setInput] = useState("")

    useEffect(() => {
        if (input.length <= 5 || input.length % 2 == 0) return
        const baseURL = 'https://api.mapbox.com'
        const url = new URL(`/geocoding/v5/mapbox.places/${input}.json`, baseURL)
        url.searchParams.set("access_token", MAPBOX_API_KEY)
        url.searchParams.set("limit", 3)

        fetch(url.toString())
            .then(res => res.json())
            .then(data => console.log(data))
    }, [input])
    return (
        <div style={{position: "fixed", zIndex: 10, top: 0, left: 0}}>
            <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
            />
        </div>
    )
}
