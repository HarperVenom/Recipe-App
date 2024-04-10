import { useState, createContext, useEffect } from "react";
import NavBar from "../components/nav-bar";
import "../styles.css";
import { Outlet, useLoaderData } from "react-router-dom";
import useRecipes from "../data/useRecipes";

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
  const [recipes, loading, error] = useRecipes(search);

  return (
    <div className="root">
      <NavBar search={search} setSearch={setSearch}></NavBar>
      <div className="outlet">
        <GlobalContext.Provider value={searchInput}>
          <Outlet></Outlet>
        </GlobalContext.Provider>
      </div>
    </div>
  );
}
