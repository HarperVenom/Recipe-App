import { useState, createContext, useEffect } from "react";
import NavBar from "../components/nav-bar";
import "../styles.css";
import { Outlet, useLoaderData } from "react-router-dom";
import useRecipes from "../data/useFetch";
import useLocalStorage from "../data/useLocalStorage";
import GlobalState from "../components/GlobalState";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchInput = url.searchParams.get("q");
  return searchInput;
}

export default function Root() {
  const searchInput = useLoaderData();
  const [search, setSearch] = useState(searchInput);

  return (
    <div className="root">
      <GlobalState searchInput={searchInput}>
        <NavBar search={search} setSearch={setSearch}></NavBar>
        <div className="outlet">
          <Outlet></Outlet>
        </div>
        <div className="footer">
          <h2>©HarperVenom</h2>
        </div>
      </GlobalState>
    </div>
  );
}
