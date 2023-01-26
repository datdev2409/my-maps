import { CHANGE_FOCUS_PLACE, CHANGE_MAP_OPTIONS } from "./constant"

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
        
        default:
            throw new Error("Invalid action")
    }
}
