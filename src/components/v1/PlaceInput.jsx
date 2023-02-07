import React, { useEffect, useRef, useState } from "react"
import { Search, MapPin } from "react-feather"
import useDeboucing from "../hooks/useDeboucing"
import PlaceSuggestItem from "./PlaceSuggestItem"
import { getAutocompleteData } from "../services/searchService"
import useClickOutside from "../hooks/useClickOutside"
import useClickInside from "../hooks/useClickInside"

function PlaceInput() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isAutocompleOpen, setAutocompleteOpen] = useState(false)
  const deboucingQuery = useDeboucing(query)
  const inputRef = useRef(null)

  useClickOutside(inputRef, () => {
    setAutocompleteOpen(false)
  })

  useClickInside(inputRef, () => {
    setAutocompleteOpen(true)
  })

  useEffect(() => {
    if (deboucingQuery.length > 0) {
      getAutocompleteData(deboucingQuery).then(data => {
        setSuggestions(data?.predictions ?? [])
        setAutocompleteOpen(true)
      })
    } else setSuggestions([])
  }, [deboucingQuery])

  return (
    <div ref={inputRef} className="place-search">
      <Search size={18} className="place-search-icon" />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="place-search-input"
      />

      {isAutocompleOpen && (
        <ul className="suggest-list">
          {suggestions.map((suggestion, index) => (
            <PlaceSuggestItem
              key={index}
              setQuery={setQuery}
              suggestion={suggestion}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default PlaceInput
