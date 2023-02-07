import React from "react"
import styles from "./Search.module.css"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import { ListGroupItem } from "react-bootstrap"

export default function SuggestionItem({
  description,
  place_id,
  structured_formatting,
}) {
  const navigate = useNavigate()
  const { main_text, secondary_text } = structured_formatting

  function handleClick() {
    navigate(`/place/${description}/${place_id}`)
    console.log(place_id)
  }

  return (
    <ListGroupItem
      onClick={handleClick}
      className={clsx("text-truncate", styles.suggestionItem)}
    >
      <span className="fw-medium pe-1">{main_text}</span>
      <span className="fw-light">{secondary_text}</span>
    </ListGroupItem>
  )
}
