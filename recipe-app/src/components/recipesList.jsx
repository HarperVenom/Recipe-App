import { useContext } from "react";
import Recipe from "./Recipe";
import { GlobalContext } from "./GlobalState";
import Spinner from "./Spinner";

export default function RecipesList({ recipes, loading, error, empty }) {
  const { favouritesList } = useContext(GlobalContext);

  return (
    <div className="recipes-grid">
      {loading ? (
        <Spinner loading={loading} />
      ) : error ? (
        <div className="error">Error Occured: {error.message}</div>
      ) : recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Recipe
            className={favouritesList.contains(recipe.id) ? "favourite" : ""}
            recipe={recipe}
            key={recipe.id}
            onClick={() =>
              favouritesList.contains(recipe.id)
                ? favouritesList.remove(recipe.id)
                : favouritesList.add(recipe.id)
            }
          ></Recipe>
        ))
      ) : (
        empty
      )}
    </div>
  );
}
