import { MapContext } from "../store/MapContext";
import { useContext } from "react";

export default function useMapContext() {
    return useContext(MapContext)
}
