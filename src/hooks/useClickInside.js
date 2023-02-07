import { useEffect } from "react";

export default function useClickInside(htmlRef, callback) {

  const handleInnerClick = e => {
    if (htmlRef.current?.contains(e.target)) {
      callback()
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleInnerClick)

    return window.addEventListener("click", handleInnerClick)

  }, [])

}


