import axios from "axios"
import { GOONG_API_KEY } from "../config/key"

const goongRequest = axios.create({
  baseURL: "http://localhost:8000/api/places",
  timeout: 1000,
})

export async function getAutocompleteData(query, limit = 5) {
  const endpoint = "/"
  try {
    const res = await goongRequest.get(endpoint, {
      params: {
        q: query,
        limit,
        api_key: GOONG_API_KEY,
      },
    })
    return res?.data?.predictions || []
  } catch (error) {
    console.log(error)
    return []
  }
}
