import { useEffect, useRef, useState } from "react"
import { InputGroup, Form, Spinner } from "react-bootstrap"
import useDeboucing from "../../hooks/useDeboucing"
import { getAutocompleteData } from "../../services/searchService"
import SuggestionList from "./SuggestionList"
import { CheckLg, Search as SearchIcon } from "react-bootstrap-icons"
import styles from "./Search.module.css"
import useClickOutside from "../../hooks/useClickOutside"
import { useParams } from "react-router-dom"

export default function Search() {
  const [input, setInput] = useState("")
  const debounceValue = useDeboucing(input, 500)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAutocompleteOpen, setAutocompleteOpen] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  const { query } = useParams()

  useEffect(() => {
    if (query) setInput(query)
  }, [query])

  useClickOutside(searchRef, () => {
    setAutocompleteOpen(false)
  })

  const isInputFocus = () => {
    return inputRef.current === document.activeElement
  }

  // Handle open and close automcomplete
  useEffect(() => {
    if (!debounceValue) {
      setSuggestions([])
      setAutocompleteOpen(false)
      return
    }

    if (!isInputFocus()) {
      setAutocompleteOpen(false)
      return
    }

    setLoading(true)
    getAutocompleteData(debounceValue).then(data => {
      setSuggestions(data)
      setLoading(false)
      setAutocompleteOpen(true)
    })
  }, [debounceValue, document.activeElement])

  return (
    <div ref={searchRef} className={styles.container}>
      <InputGroup>
        <InputGroup.Text style={{ width: "45px" }}>
          {loading ? (
            <Spinner animation="border" size="sm"></Spinner>
          ) : (
            <SearchIcon color="black" />
          )}
        </InputGroup.Text>
        <Form.Control
          placeholder="Search on map"
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={e => setAutocompleteOpen(true)}
          ref={inputRef}
        />
      </InputGroup>

      {isAutocompleteOpen && <SuggestionList data={suggestions} />}
    </div>
  )
}
