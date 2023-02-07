import { useEffect } from "react";

export default function useClickOutside(htmlRef, callback) {

  const handleOuterClick = e => {
    if (!htmlRef.current?.contains(e.target)) {
      callback()
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOuterClick)

    return window.addEventListener("click", handleOuterClick)

  }, [])

}
