import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import styles from "./MapLayout.module.css"
import useMap from "../../hooks/useMap"
import Search from "../../components/Search/Search"

function MapLayout() {
  const {mapRef, mapInstance} = useMap()

  return (
    <Container fluid className="vw-100 vh-100 p-0">
      <div className={styles.map} ref={mapRef}></div>
      <Search />
      {mapInstance && <Outlet />}
    </Container>
  )
}

export default MapLayout
