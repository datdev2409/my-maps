import { CHANGE_FOCUS_PLACE, CHANGE_MAP_OPTIONS, ADD_NEW_PLACE, LOAD_PINNED_PLACES } from "./constant"

export function reducer(state, action) {
    switch (action.type) {
        case CHANGE_FOCUS_PLACE:
            return {
                ...state,
                place: action.data
            }

        case CHANGE_MAP_OPTIONS:
            return {
                ...state,
                mapOptions: action.data
            }

        case ADD_NEW_PLACE:
            return {
                ...state,
                pinnedPlaces: [...state.pinnedPlaces, action.data]
            }

        case LOAD_PINNED_PLACES:
            return {
                ...state,
                pinnedPlaces: action.data
            }

        default:
            throw new Error("Invalid action")
    }
}
