import { createContext, useContext, useState } from "react"

export const ActivePlaceContext = createContext()

export function ActivePlaceProvider({ children }) {
  const [activePlace, setActivePlace] = useState(null)

  return (
    <ActivePlaceContext.Provider value={[activePlace, setActivePlace]}>
      {children}
    </ActivePlaceContext.Provider>
  )
}

const initialState = {
  formatted_address: "48, Ninh Kiều, Cần Thơ",
  location: { lat: 10.032067, lng: 105.781117 },
  types: ["station"],
  place_id:
    "PPDmkatJq4F7qlNcsGWv8ES1bhiBe6fyT4NqfrNrleAfgXZns1SenHyAYluweiD7c7hUv65QF-5zkWItqWlUgHz5qxazLDGG1ffhPW5lpmbl8hlwPrw-DmX6JVCSZDuLZ",
  rating: 4.7,
  note: "",
}

export function useActivePlaceContext() {
  return useContext(ActivePlaceContext)
}
