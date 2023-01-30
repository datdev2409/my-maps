import axios from "axios"
import { GOONG_API_KEY } from "../config/key"

const goongRequest = axios.create({
  baseURL: "https://rsapi.goong.io",
  timeout: 1000,
})

export async function getAutocompleteData(query, limit = 5) {
  const endpoint = "/Place/AutoComplete"
  try {
    const data = await goongRequest.get(endpoint, {
      params: {
        input: query,
        limit,
        api_key: GOONG_API_KEY,
      },
    })
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function getDetailPlace(id) {
  const endpoint = "/Place/Detail"
  try {
    const res = await goongRequest.get(endpoint, {
      params: {
        place_id: id,
        api_key: GOONG_API_KEY,
      },
    })

    const { name, formatted_address, place_id, geometry, types } =
      res.data.result

    return {
      name,
      formatted_address,
      place_id,
      types,
      location: geometry.location,
    }
  } catch (error) {
    console.log(error)
    return {}
  }
}
