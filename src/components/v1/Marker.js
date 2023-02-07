import React, { useContext, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { MapContext } from "../Map"
import { createMarker, createPopup } from "../../api/mapAPI"

function Marker({ children, location, options }) {
  const map = useContext(MapContext)
  const popupContainer = useMemo(() => {
    return document.createElement("div")
  }, [])

  const popup = useMemo(() => {
    return createPopup().setLngLat(location).setMaxWidth("300px")
  }, [location])

  useEffect(() => {
    const marker = createMarker(map, location, options)
    popup.setDOMContent(popupContainer)
    marker.setPopup(popup)

    return () => {
      marker.remove()
    }
  }, [location])

  return createPortal(children, popupContainer)
}

export default Marker
