import React, { memo } from "react"
import Marker from "./Marker"
import PinPopup from "./PinPopup"

function Pin({ place, options }) {
  return (
    <Marker options={options} location={place.location}>
      <PinPopup place={place} />
    </Marker>
  )
}

export default memo(Pin)
