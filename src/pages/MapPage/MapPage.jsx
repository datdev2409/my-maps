import React, { Fragment } from "react"
import { Map } from "../../components/Map"
import Search from "../../components/Search"
import { Button, Container } from "react-bootstrap"
import AuthButtonGroup from "../../components/AuthButtonGroup/AuthButtonGroup.jsx"

function MapPage() {
  return (
    <Container fluid className="vw-100 vh-100 p-0">
      <Map />
      <Search />
      <AuthButtonGroup />
    </Container>
  )
}

export default MapPage
