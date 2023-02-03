import { Search, MapPin } from "react-feather"
import useMapContext from "../hooks/useMapContext"
import { CHANGE_FOCUS_PLACE, CHANGE_MAP_OPTIONS } from "../store/constant"
import { getDetailPlace } from "../services/searchService"
import { useActivePlaceContext } from "../contexts/ActivePlaceContext"

function PlaceSuggestItem({ suggestion, setQuery }) {
  const { place_id } = suggestion
  const { main_text, secondary_text } = suggestion?.structured_formatting
  const [activePlace, setActivePlace] = useActivePlaceContext()

  const displayText = main_text + " " + secondary_text
  const changeFocusPlace = async () => {
    const placeData = await getDetailPlace(place_id)
    setQuery(displayText)
    setActivePlace(placeData)
  }

  return (
    <li onClick={changeFocusPlace} className="suggest-item">
      <MapPin size={12} />
      <span className="suggest-item-text">{main_text}</span>
      <span className="suggest-item-text--secondary">{secondary_text}</span>
    </li>
  )
}

export default PlaceSuggestItem
