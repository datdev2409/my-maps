import { useEffect, useState } from "react";

export default function useDeboucing(value, timeout = 250) {
    const [deboucing, setDeboucing] = useState(value)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDeboucing(value)            
        }, timeout);

        return () => {
            clearTimeout(timeoutID)
        }

    }, [value])

    return deboucing
}
