import { useContext } from "react";
import useFetch from "../data/useFetch";
import Recipe from "../components/recipe";
import HomePage from "./homePage";
import useLocalStorage from "../data/useLocalStorage";
import RecipesList from "../components/recipesList";
import { GlobalContext } from "../components/GlobalState";

export default function SearchPage() {
  const { searchInput: query } = useContext(GlobalContext);
  const [recipes, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  );

  const extractedRecipes = recipes &&
    recipes.data &&
    recipes.data.recipes &&
    recipes.data.recipes.length > 0 && [...recipes.data.recipes];

  return (
    <div className="search-list">
      {extractedRecipes ? (
        <RecipesList
          recipes={extractedRecipes}
          loading={loading}
          error={error}
        ></RecipesList>
      ) : (
        <HomePage></HomePage>
      )}
    </div>
  );
}
