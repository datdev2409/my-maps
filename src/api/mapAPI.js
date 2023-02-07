import goongJs from "@goongmaps/goong-js"
import { GOONG_API_KEY, GOONG_MAPTILES_KEY } from "../config/key"
import PlaceInfo from "../components/PlaceInfo"

goongJs.accessToken = GOONG_MAPTILES_KEY

export function createMarker(map, lngLat, options) {
  if (!map instanceof goongJs.Map) return
  const marker = new goongJs.Marker(options)
    .setLngLat(lngLat ?? [107.6416527, 11.295036])
    .addTo(map)

  return marker
}

export function createPopup() {
  const popup = new goongJs.Popup()
  return popup
}

export function createMap(config) {
  console.log("create map")
  const map = new goongJs.Map({
    container: "map",
    style: "https://tiles.goong.io/assets/goong_light_v2.json",
    zoom: 15,
    center: [107.6416527, 11.295036],
    ...config,
  })

  return map
}

export function setMarkerPopup(marker, popup) {
  marker.setPopup(popup)
  marker.togglePopup()
}
