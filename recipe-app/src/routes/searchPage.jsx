import { useContext } from "react";
import useFetch from "../data/useFetch";
import { GlobalContext } from "./root";
import Recipe from "../components/recipe";
import HomePage from "./homePage";
import useLocalStorage from "../data/useLocalStorage";
import RecipesList from "../components/recipesList";

export default function SearchPage() {
  const { searchInput: query } = useContext(GlobalContext);
  const [recipes, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  );

  return (
    <div className="search-list">
      {recipes &&
      recipes.data &&
      recipes.data.recipes &&
      recipes.data.recipes.length > 0 ? (
        <RecipesList
          recipes={recipes}
          loading={loading}
          error={error}
        ></RecipesList>
      ) : (
        <HomePage></HomePage>
      )}
    </div>
  );
}
