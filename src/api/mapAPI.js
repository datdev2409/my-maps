import goongJs from "@goongmaps/goong-js";
import {GOONG_API_KEY, GOONG_MAPTILES_KEY} from '../config/key'
import PlaceInfo from "../components/PlaceInfo";

goongJs.accessToken = GOONG_MAPTILES_KEY

export function createMarker(map, lngLat = [107.6416527, 11.295036]) {
    if (!map instanceof goongJs.Map) return;
    const marker = new goongJs.Marker()
        .setLngLat(lngLat)
        .addTo(map)
    
    return marker
}

export function createPopup(htmlString) {
    const popup = new goongJs.Popup()
        .setHTML(htmlString)
        .setMaxWidth("800px")
        // .addClassName("popup")
    
    return popup
}

export function createMap(config) {
    const map = new goongJs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_light_v2.json',
        zoom: 12,
        center: [107.6416527, 11.295036],
        ...config
    })

    return map
}

export function setMarkerPopup(marker, popup) {
    marker.setPopup(popup)
    marker.togglePopup()
}

export function createPlacePopup(place) {
    return `
        <h3 class="popup-title">${place.name ?? place.formatted_address}</h3> 
        <p class="popup-content">${place.note}</p> 
        <p>${place.formatted_address}</p> 
        <button onclick="(function () {
            const title = document.querySelector('.popup-title')
            const content = document.querySelector('.popup-content')
            const saveBtn = document.querySelector('.popup-save-btn')
            const editBtn = document.querySelector('.popup-edit-btn')

            title.contentEditable = true
            content.contentEditable = true
            saveBtn.style.display = 'block'
            editBtn.style.display = 'none'

        })()" class="popup-edit-btn">Edit</button>
        <script defer>
            alert('hello world')
        </script>

        <button onclick='(function () {
            fetch("http://localhost:8080/places", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: "{"name": "my home"}"
            })
          })()' class="popup-add-btn">+ Add to map</button>
        
        <button onclick="(function() {
            const title = document.querySelector('.popup-title')
            const content = document.querySelector('.popup-content')
            const saveBtn = document.querySelector('.popup-save-btn')
            const editBtn = document.querySelector('.popup-edit-btn')

            saveBtn.style.display = 'none'
            editBtn.style.display = 'block'
        })()" class="popup-save-btn">Save</button>
    `
}

