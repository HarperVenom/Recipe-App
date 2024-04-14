import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import Favourite from "./routes/favouritesPage";
import RecipePage, { loader as recipeLoader } from "./routes/recipePage";
import SearchPage from "./routes/searchPage";
import ErrorPage from "./components/ErrorPage";

window.addEventListener("click", (e) => {
  e.stopPropagation();
  // console.log(e.);
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SearchPage></SearchPage> },
      {
        path: "/:recipeId",
        element: <RecipePage></RecipePage>,
        loader: recipeLoader,
      },
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
