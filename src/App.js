import { useEffect } from "react"
import PlaceDetail from "./components/PlaceDetail"
import PlaceInput from "./components/PlaceInput"
import PlaceSumary from "./components/PlaceSumary"
import { Map } from "./components/Map"
import { ActivePlaceProvider } from "./contexts/ActivePlaceContext"
import MarkerList from "./components/MarkerList"
import { SavedPlacesProvider } from "./contexts/SavedPlacesContext"
import { useUserContext } from "./contexts/UserContext"
import { redirect, useNavigate } from "react-router-dom"

function App() {
  return (
    <SavedPlacesProvider>
      <ActivePlaceProvider>
        <div className="container">
          <div className="sidebar">
            <PlaceInput />
            <PlaceSumary />
          </div>
          <div className="content">
            <Map>
              <MarkerList />
            </Map>
          </div>
        </div>
      </ActivePlaceProvider>
    </SavedPlacesProvider>
  )
}

export default App
