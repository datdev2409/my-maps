import goongJs from "@goongmaps/goong-js"
import React, { useContext, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { MapContext } from "./Map"

export default function Popup(props) {
  const map = useContext(MapContext)
  const container = useMemo(() => {
    console.log("1")
    return document.createElement("div")
  }, [])

  const popup = useMemo(() => {
    console.log("2")
    const options = { ...props }
    const pp = new goongJs.Popup(options).setLngLat(props.location)

    return pp
  }, [])

  useEffect(() => {
    console.log("3")
    popup.setDOMContent(container).addTo(map)
  }, [])
// 
  console.log("0")
  return createPortal(props.children, container)
}
