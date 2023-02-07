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
    return data?.data?.predictions || []
  } catch (error) {
    console.log(error)
    return []
  }
}
