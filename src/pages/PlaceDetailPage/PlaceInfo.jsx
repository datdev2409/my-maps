import React from "react"
import styles from "./PlaceInfo.module.css"
import { Form, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useUserContext } from "../../context/userContext"

async function createPin(place) {
  const URL = "http://localhost:8000/api/pins"
  const res = await axios.post(URL, place)
  return res.data
}

function PlaceInfo({ name, location, address, place_id, saved }) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { user } = useUserContext()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!user) {
      alert("Please sign in before save place")
      navigate("/login", { from: pathname + search })
    }

    const formData = new FormData(e.target)
    const place = Object.fromEntries(formData.entries())
    const location = JSON.parse(place.location)
    try {
      await createPin({ ...place, location })
      return navigate(`/place/${place_id}`)
    } catch (error) {
      console.log(error)
      return navigate(`/place/${place_id}`)
    }
  }

  return (
    <div className={styles.container}>
      <h3>{name}</h3>
      <p>{address}</p>
      {!saved && (
        <Form onSubmit={handleSubmit}>
          <input readOnly value={name} name="name" hidden />
          <input readOnly value={address} name="address" hidden />
          <input readOnly value={place_id} name="place_id" hidden />
          <input
            readOnly
            value={JSON.stringify(location)}
            name="location"
            hidden
          />
          <button type="submit">Add to map</button>
        </Form>
      )}
    </div>
  )
}

export default PlaceInfo
