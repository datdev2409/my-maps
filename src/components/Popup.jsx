import goongJs from "@goongmaps/goong-js"
import React, { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"

export default function Popup(props) {
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
    popup.setDOMContent(container)
  }, [])
// 
  console.log("0")
  return createPortal(props.children, container)
}
