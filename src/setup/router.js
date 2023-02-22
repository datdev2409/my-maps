import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/LoginPage/Login"
import ProtectRoute from "../components/ProtectRoute"
import { Button } from "react-bootstrap"
import { Logout, useUserContext } from "../context/userContext"
import RegisterPage from "../pages/RegisterPage/RegisterPage"
import PlaceDetailPage, {
  loader as placeDetailLoader,
} from "../pages/PlaceDetailPage"
import MapLayout from "../layouts/MapLayout/MapLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "/place/:placeId",
        element: <PlaceDetailPage />,
        loader: placeDetailLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
])

export default router
