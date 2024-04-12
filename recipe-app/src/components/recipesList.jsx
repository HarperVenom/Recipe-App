import { useContext, useEffect, useState } from "react";
import useFetch from "../data/useFetch";
import useLocalStorage from "../data/useLocalStorage";
import Recipe from "./recipe";
import { GlobalContext } from "../routes/root";

export default function RecipesList({ recipes, loading, error }) {
  const { favourites, setFavourites } = useContext(GlobalContext);
  const [favouriteitems, setFavouriteItems] = useState([]);

  useEffect(() => {
    async function fetchRecipe(id) {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        return await response.json();
      } catch (err) {
        console.log(err.message);
      }
    }

    async function fetchRecipes() {
      const favouriteRecipes = await Promise.all(
        favourites.map((id) => fetchRecipe(id))
      );
      setFavouriteItems(favouriteRecipes);
    }
    fetchRecipes();
  }, [favourites]);

  function handleAddFavourite(id) {
    setFavourites(() => {
      const currentValue = favourites.includes(id)
        ? favourites
        : [...favourites, id];
      return currentValue;
    });
  }

  function handleRemoveFavourite(id) {
    setFavourites(favourites.filter((currentId) => currentId != id));
  }

  return (
    <div className="recipes-grid">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error Occured: {error.message}</div>
      ) : recipes ? (
        recipes.data.recipes.map((recipe) => (
          <Recipe
            className={favourites.includes(recipe.id) ? "favourite" : ""}
            recipe={recipe}
            key={recipe.id}
            onClick={
              favourites.includes(recipe.id)
                ? handleRemoveFavourite
                : handleAddFavourite
            }
          ></Recipe>
        ))
      ) : (
        favouriteitems &&
        favouriteitems.map(
          (recipe) =>
            recipe &&
            recipe.data &&
            recipe.data.recipe && (
              <Recipe
                className={
                  favourites.includes(recipe.data.recipe.id) ? "favourite" : ""
                }
                recipe={recipe.data.recipe}
                key={recipe.data.recipe.id}
                onClick={
                  favourites.includes(recipe.data.recipe.id)
                    ? handleRemoveFavourite
                    : handleAddFavourite
                }
              ></Recipe>
            )
        )
      )}
    </div>
  );
}
