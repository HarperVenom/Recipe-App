import { useContext } from "react";
import RecipesList from "../components/RecipesList";
import { GlobalContext } from "../components/GlobalState";

export default function Favourite() {
  const { favouritesList } = useContext(GlobalContext);

  let extractedRecipes = favouritesList.getItemList();
  extractedRecipes =
    extractedRecipes && extractedRecipes.map((recipe) => recipe?.data?.recipe);

  const empty = (
    <div className="empty-container">
      <h1>The list is empty.</h1>
      <h2>You don't have any recipes saved.</h2>
    </div>
  );
  return (
    <div className="favourite">
      {extractedRecipes.length > 0 && (
        <h1>Your saved recipes: {extractedRecipes.length}</h1>
      )}
      <RecipesList recipes={extractedRecipes} empty={empty}></RecipesList>
    </div>
  );
}
