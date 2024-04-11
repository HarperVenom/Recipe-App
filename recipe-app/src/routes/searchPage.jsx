import { useContext } from "react";
import useFetch from "../data/useFetch";
import { GlobalContext } from "./root";
import Recipe from "../components/recipe";
import HomePage from "./homePage";

export default function SearchPage() {
  const query = useContext(GlobalContext);
  const [recipes, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  );

  return (
    <div className="search">
      {recipes &&
      recipes.data &&
      recipes.data.recipes &&
      recipes.data.recipes.length > 0 ? (
        <div className="recipes-grid">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">Error Occured: {error.message}</div>
          ) : (
            recipes.data.recipes.map((recipe) => (
              <Recipe recipe={recipe} key={recipe.id}></Recipe>
            ))
          )}
        </div>
      ) : (
        <HomePage></HomePage>
      )}
    </div>
  );
}
