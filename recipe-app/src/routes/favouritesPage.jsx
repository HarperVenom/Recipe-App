import { useContext } from "react";
import RecipesList from "../components/recipesList";
import useLocalStorage from "../data/useLocalStorage";
import { GlobalContext } from "./root";
import useFetch from "../data/useFetch";

export default function Favourite() {
  return (
    <div className="favourite">
      <RecipesList></RecipesList>
    </div>
  );
}
