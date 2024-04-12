import { useState, createContext, useEffect } from "react";
import NavBar from "../components/nav-bar";
import "../styles.css";
import { Outlet, useLoaderData } from "react-router-dom";
import useRecipes from "../data/useFetch";
import useLocalStorage from "../data/useLocalStorage";

export const GlobalContext = createContext();

export async function action() {
  console.log(action);
  return null;
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchInput = url.searchParams.get("q");
  return searchInput;
}

export default function Root() {
  const searchInput = useLoaderData();
  const [search, setSearch] = useState(searchInput);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  return (
    <div className="root">
      <NavBar search={search} setSearch={setSearch}></NavBar>
      <div className="outlet">
        <GlobalContext.Provider
          value={{ searchInput, favourites, setFavourites }}
        >
          <Outlet></Outlet>
        </GlobalContext.Provider>
      </div>
      <div className="footer">
        <h2>©HarperVenom</h2>
      </div>
    </div>
  );
}
