import { Container } from "react-bootstrap"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"

import Login from "./pages/LoginPage/"
import RegisterPage from "./pages/RegisterPage"
import MapPage from "./pages/MapPage/"
import PlaceDetailPage, {
  loader as placeDetailLoader,
} from "./pages/PlaceDetailPage"
import configAxios from "./config/axiosConfig"
import MapLayout from "./layouts/MapLayout/MapLayout"

configAxios()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MapLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "place/:query/:placeId",
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

function App() {
  return <RouterProvider router={router} />
}

function DefaultLayout() {
  return (
    <Container fluid className="vh-100 p-0">
      <Outlet />
    </Container>
  )
}

export default App
