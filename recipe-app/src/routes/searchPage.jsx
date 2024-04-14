import { useContext } from "react";
import useFetch from "../data/useFetch";
import Recipe from "../components/Recipe";
import HomePage from "./homePage";
import useLocalStorage from "../data/useLocalStorage";
import RecipesList from "../components/RecipesList";
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

  const empty = (
    <div className="empty-container">
      <h1>No results found.</h1>
      <h2>Try using full words. E. g. "orange", "apple", "chocolate" etc.</h2>
    </div>
  );

  return (
    <div className="search-list">
      {query ? (
        <h1>
          Result found: {(extractedRecipes && extractedRecipes.length) || 0}
        </h1>
      ) : null}
      {query ? (
        <RecipesList
          recipes={extractedRecipes}
          loading={loading}
          error={error}
          empty={empty}
        ></RecipesList>
      ) : (
        <HomePage></HomePage>
      )}
    </div>
  );
}
