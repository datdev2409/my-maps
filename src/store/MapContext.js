import { createContext, useReducer } from "react";
import { reducer } from './reducer';
import initialState from './initialState';

const MapContext = createContext()

function MapContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <MapContext.Provider value={[state, dispatch]}>
            {children}
        </MapContext.Provider>
    )
}

export {MapContext, MapContextProvider}


