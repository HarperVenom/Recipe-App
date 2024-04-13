import { useContext, useEffect, useState } from "react";
import useFetch from "../data/useFetch";
import useLocalStorage from "../data/useLocalStorage";
import Recipe from "./recipe";
import { GlobalContext } from "./GlobalState";

export default function RecipesList({ recipes, loading, error }) {
  const { favouritesList } = useContext(GlobalContext);

  console.log(recipes);

  return (
    <div className="recipes-grid">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error Occured: {error.message}</div>
      ) : recipes ? (
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
      ) : null}
    </div>
  );
}
