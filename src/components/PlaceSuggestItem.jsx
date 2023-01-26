import { GOONG_API_KEY } from '../config/key'
import {Search, MapPin} from 'react-feather'

function PlaceSuggestItem({suggestion, setCenter}) {
  const {description, place_id} = suggestion
  const {main_text, secondary_text} = suggestion?.structured_formatting

  const changePlace = async () => {
    const BASE_URL = "https://rsapi.goong.io"
    const url = new URL("/Place/Detail", BASE_URL)
    url.searchParams.set("api_key", GOONG_API_KEY)
    url.searchParams.set("place_id", place_id)

    try {
      const data = await (await fetch(url)).json()
      console.log(data)
      const {lat, lng} = data.result.geometry.location
      setCenter([lng, lat])
    }
    catch (error) {
      console.log("Something went wrong!!")
    }

  }

  return (
      <li
          onClick={changePlace}
          className='suggest-item'
      >
          <MapPin size={12} />
          <span className='suggest-item-text'>{main_text}</span>
          <span className='suggest-item-text--secondary'>{secondary_text}</span>
      </li>
  )
}

export default PlaceSuggestItem
