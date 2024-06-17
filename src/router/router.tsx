import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Order from "../pages/Order";

export default createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/offer',
        element: <Order />
      },
      {
        path: '/search',
        element: <Order />
      },
    ],
  },
]);
