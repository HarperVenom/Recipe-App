import { useContext } from "react";
import useRecipes from "../data/useRecipes";
import { GlobalContext } from "../routes/root";
import Recipe from "./recipe";

export default function Home() {
  const query = useContext(GlobalContext);
  const recipes = useRecipes(query && query);
  console.log(recipes);
  return (
    <div className="home">
      <div className="recipes-grid">
        {recipes && recipes[0].length > 0
          ? recipes[0].map((recipe) => (
              <Recipe recipe={recipe} key={recipe.id}></Recipe>
            ))
          : null}
      </div>
    </div>
  );
}
