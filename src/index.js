import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "bootstrap/dist/css/bootstrap.min.css"
import "@goongmaps/goong-js/dist/goong-js.css"
// import "./index.css"
import { MapContextProvider } from "./context/mapContext"
import { AuthContextProvider } from "./context/authContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <MapContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MapContextProvider>
  </React.StrictMode>
)
