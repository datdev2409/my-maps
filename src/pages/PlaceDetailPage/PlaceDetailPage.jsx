import React, { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import PlaceInfo from "./PlaceInfo"
import { useMapContext } from "../../context/mapContext"
import { createMarker } from "../../api/mapAPI"
import axios from "axios"

async function getPlaceDetail(id) {
  const URL = "http://localhost:8000/api/places/" + id;
  const res = await axios.get(URL)
  return res.data.data
}

export async function loader({ params, request }) {
  console.log(params?.placeId)
  const place = await getPlaceDetail(params?.placeId)
  return { place }
}

export default function PlaceDetailPage() {
  const { place } = useLoaderData()
  const { mapInstance } = useMapContext()

  useEffect(() => {
    const placeLocation = place.location
    mapInstance.jumpTo({
      center: placeLocation,
    })
    const marker = createMarker(mapInstance, placeLocation)
    return () => marker.remove()
  })

  return <PlaceInfo {...place} />
}
