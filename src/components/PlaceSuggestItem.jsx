import { GOONG_API_KEY } from "../config/key"
import { Search, MapPin } from "react-feather"
import useMapContext from "../hooks/useMapContext"
import { CHANGE_FOCUS_PLACE, CHANGE_MAP_OPTIONS } from "../store/constant"

function PlaceSuggestItem({ suggestion }) {
  const { place_id } = suggestion
  const { main_text, secondary_text } = suggestion?.structured_formatting
  const [state, dispatch] = useMapContext()

  const changePlace = async () => {
    const BASE_URL = "https://rsapi.goong.io"
    const url = new URL("/Place/Detail", BASE_URL)
    url.searchParams.set("api_key", GOONG_API_KEY)
    url.searchParams.set("place_id", place_id)

    try {
      const data = await (await fetch(url)).json()

      const { formatted_address, place_id, geometry, types } = data.result
      dispatch({
        type: CHANGE_FOCUS_PLACE,
        data: {
          formatted_address,
          place_id,
          types,
          location: geometry.location,
        },
      })
    } catch (error) {
      console.log("Something went wrong!!")
    }
  }

  return (
    <li onClick={changePlace} className="suggest-item">
      <MapPin size={12} />
      <span className="suggest-item-text">{main_text}</span>
      <span className="suggest-item-text--secondary">{secondary_text}</span>
    </li>
  )
}

export default PlaceSuggestItem
