import axios from "axios"
import { GOONG_API_KEY } from "../config/key"

const goongRequest = axios.create({
  // baseURL: "https://rsapi.goong.io",
  baseURL: "http://localhost:8000/api/places",
  timeout: 1000,
})

export async function getDetailPlace(id) {
  // const endpoint = "/Place/Detail"
  const endpoint = `/${id}`
  try {
    const res = await goongRequest.get(endpoint, {
      params: {
        place_id: id,
        api_key: GOONG_API_KEY,
      },
    })

    console.log(res)

    const { name, address, place_id, location, types, saved } = res.data.data

    return {
      name,
      address,
      place_id,
      types,
      location,
      saved,
    }
  } catch (error) {
    console.log(error)
    return {}
  }
}
