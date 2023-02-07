import React from "react"
import { ListGroup, ListGroupItem } from "react-bootstrap"
import SuggestionItem from "./SuggetionItem"

function SuggestionList({ data = [] }) {
  return (
    <ListGroup>
      {data.map((item, index) => (
        <SuggestionItem key={index} {...item} />
      ))}
    </ListGroup>
  )
}

export default SuggestionList
