import axios from "axios"

function getPlaceAxiosInstance() {
  const placeRequest = axios.create({
    baseURL: "http://localhost:8080/places",
    timeout: 1000,
  })
  return placeRequest
}

export async function getSavedPlaces() {
  try {
    const places = await getPlaceAxiosInstance().get("/")
    console.log(places.data[0]._id)
    return places.data.map(place => {
      return { ...place, status: "saved" }
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function savePlace(place) {
  const data = JSON.stringify(place)
  const res = await getPlaceAxiosInstance().post("/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  return res
}

export async function deletePlace(place) {
  console.log(place._id)
  const res = await getPlaceAxiosInstance().delete(`/${place._id}`)
  return res
}

export async function updatePlace(placeId, newData) {
  const instance = getPlaceAxiosInstance()
  const res = await instance.patch(`/${placeId}`, newData)
  return res
}
