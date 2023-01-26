import React, { useEffect, useRef, useState } from 'react'
import {Search, MapPin} from 'react-feather'
import { GOONG_API_KEY } from '../config/key'
import useDeboucing from '../hooks/useDeboucing'
import PlaceSuggestItem from './PlaceSuggestItem'

function PlaceInput({setCenter}) {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const deboucingQuery = useDeboucing(query)

    useEffect(() => {
        const BASE_URL = "https://rsapi.goong.io"
        const url = new URL("/Place/AutoComplete", BASE_URL)
        url.searchParams.set("api_key", GOONG_API_KEY)
        url.searchParams.set("input", deboucingQuery)
        url.searchParams.set("limit", 5)

        if (deboucingQuery.length >= 0) {
            fetch(url)
                .then(res => res.json())
                .then(data => setSuggestions(data?.predictions ?? []))
        }

    }, [deboucingQuery])

    const renderSuggestionItem = (suggestion) => {
        const { place_id } = suggestion
        return (
            <PlaceSuggestItem
                key={place_id}
                setCenter={setCenter}
                suggestion={suggestion}
            />
        )
    }

    return (
        <div className='place-search'>
            <Search size={18} className='place-search-icon' />
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                className='place-search-input'
            />

            <ul className='suggest-list'>
                {suggestions.map(renderSuggestionItem)}
            </ul>
        </div>
    )
}

export default PlaceInput
