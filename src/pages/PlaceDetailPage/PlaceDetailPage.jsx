import React, { useEffect } from "react"
import { getDetailPlace } from "../../services/placeService"
import { useLoaderData } from "react-router-dom"
import PlaceInfo from "../../components/PlaceInfo"
import { useMapContext } from "../../context/mapContext"
import { createMarker } from "../../api/mapAPI"

export async function loader({ params, request }) {
  const place = await getDetailPlace(params?.placeId)
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
