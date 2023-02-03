import React from "react"
import ReactDOM from "react-dom/client"
import "@goongmaps/goong-js/dist/goong-js.css"
import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom"

// Roboto font import
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import App from "./App"
import "./index.css"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { UserProvider, useUserContext } from "./contexts/UserContext"
import RequireAuth from "./components/RequireAuth"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode>
)
