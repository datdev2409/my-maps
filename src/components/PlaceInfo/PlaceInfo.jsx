import React from "react"
import styles from "./PlaceInfo.module.css"
import { Button } from "react-bootstrap"

function PlaceInfo({ name, formatted_address }) {
  const handleSavePlace = () => {
    console.log("save place")
  }

  return (
    <div className={styles.container}>
      <h3>{name}</h3>
      <p>{formatted_address}</p>
      <Button onClick={handleSavePlace}>Save</Button>
    </div>
  )
}

export default PlaceInfo
