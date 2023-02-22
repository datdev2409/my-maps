import { useEffect, useReducer, useRef, useState } from "react"
import { InputGroup, Form, Spinner } from "react-bootstrap"
import useDeboucing from "../../hooks/useDeboucing"
import { getAutocompleteData } from "../../services/searchService"
import SuggestionList from "./SuggestionList"
import { Search as SearchIcon } from "react-bootstrap-icons"
import styles from "./Search.module.css"
import useClickOutside from "../../hooks/useClickOutside"
import {
  initialState,
  reducer,
  LoadStart,
  LoadSuccess,
  CLEAR,
  HideHint,
  ShowHint,
} from "./Search.helper"

export default function Search() {
  const [input, setInput] = useState("")
  const debounceValue = useDeboucing(input, 500)

  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, showHint, suggestions } = state

  const searchRef = useRef(null)
  const inputRef = useRef(null)

  useClickOutside(searchRef, () => {
    dispatch(HideHint())
  })

  useEffect(() => {
    if (!debounceValue) {
      dispatch(CLEAR())
      return
    }

    dispatch(LoadStart())
    getAutocompleteData(debounceValue).then(data => {
      dispatch(LoadSuccess(data))
    })
  }, [debounceValue])

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
          onFocus={e => dispatch(ShowHint())}
          ref={inputRef}
        />
      </InputGroup>

      {showHint && <SuggestionList data={suggestions} />}
    </div>
  )
}
