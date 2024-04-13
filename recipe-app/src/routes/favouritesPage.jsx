import { useContext } from "react";
import RecipesList from "../components/recipesList";
import useLocalStorage from "../data/useLocalStorage";
import useFetch from "../data/useFetch";
import { GlobalContext } from "../components/GlobalState";

export default function Favourite() {
  const { favouritesList } = useContext(GlobalContext);

  let extractedRecipes = favouritesList.getItemList();
  extractedRecipes =
    extractedRecipes && extractedRecipes.map((recipe) => recipe?.data?.recipe);

  return (
    <div className="favourite">
      <RecipesList recipes={extractedRecipes}></RecipesList>
    </div>
  );
}
