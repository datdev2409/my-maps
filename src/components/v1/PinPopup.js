import React, { useRef, useState } from "react"
import {
  deletePlace,
  getSavedPlaces,
  savePlace,
  updatePlace,
} from "../api/placeAPI"
import { useSavedPlaces } from "../context/SavedPlacesContext"
import { Plus, PlusCircle, PlusSquare } from "react-feather"
import { useActivePlaceContext } from "../context/ActivePlaceContext"

function PinPopup({ place }) {
  const [savedPlaces, setSavedPlaces] = useSavedPlaces()
  const [activePlace, setActivePlace] = useActivePlaceContext()
  const [isEdit, setIsEdit] = useState(false)
  const titleRef = useRef(null)
  const noteRef = useRef(null)

  async function updateSavedPlaces() {
    getSavedPlaces().then(setSavedPlaces)
  }

  async function handleAddPlace() {
    const res = await savePlace(place)

    // If successfull, fetch saved places again
    if (res.data.status === "success") {
      await updateSavedPlaces()
      place.status = "saved"
    }
  }

  function handleEditPlace() {
    setIsEdit(true)
  }

  async function handleSaveChanges() {
    setIsEdit(false)
    const newData = {
      ...place,
      name: titleRef.current.textContent,
      note: noteRef.current.textContent,
    }
    const res = await updatePlace(place._id, newData)

    if (res.data.status === "success") {
      await updateSavedPlaces()
    }
  }

  async function handleDeletePlace() {
    const res = await deletePlace(place)
    console.log(res)

    if (res.status == 204) {
      await updateSavedPlaces()
      setActivePlace(null)
      console.log("deleted" + place._id)
    }
  }

  return (
    <div className="popup">
      <h1 ref={titleRef} contentEditable={isEdit} className="popup-title">
        {place.name}
      </h1>
      <p ref={noteRef} contentEditable={isEdit} className="popup-note">
        {place.note}
      </p>
      <div className="popup-address">
        <sub>Details from Google Maps</sub>
        <div>{place.formatted_address}</div>
        <a href="/">View in Google Maps</a>
      </div>
      {place.status === "saved" ? (
        <div>
          {!isEdit && <button onClick={handleEditPlace}>Edit</button>}
          {isEdit && <button onClick={handleSaveChanges}>Save</button>}
          <button onClick={handleDeletePlace}>Delete</button>
        </div>
      ) : (
        <button className="popup-save-btn" onClick={handleAddPlace}>
          <Plus size={16} />
          <div>Add to map</div>
        </button>
      )}
    </div>
  )
}

export default PinPopup
