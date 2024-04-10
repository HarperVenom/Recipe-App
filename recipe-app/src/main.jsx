import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";
import Home from "./components/home";
import Favourite from "./routes/favourite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Home></Home> },
      // {
      //   path:'/:'
      // }
      {
        path: "/favourite",
        element: <Favourite></Favourite>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
