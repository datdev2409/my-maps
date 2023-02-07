import React, { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Map } from "../../components/Map"
import Search from "../../components/Search"
import AuthButtonGroup from "../../components/AuthButtonGroup"
import { useMapContext } from "../../context/mapContext"
import { createMap } from "../../api/mapAPI"
import styles from "./MapLayout.module.css"

function MapLayout() {
  console.log("map layout")
  const { mapInstance, setMapInstance } = useMapContext()
  const mapRef = useRef(null)

  useEffect(() => {
    const map = createMap({ container: mapRef.current })
    setMapInstance(map)

    return () => {
      map.remove()
    }
  }, [mapRef])

  return (
    <Container fluid className="vw-100 vh-100 p-0">
      <div className={styles.map} ref={mapRef}></div>
      {/* <Map /> */}
      <Search />
      <AuthButtonGroup />
      {mapInstance && <Outlet />}
    </Container>
  )
}

export default MapLayout
