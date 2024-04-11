import { useLoaderData } from "react-router-dom";
import useFetch from "../data/useFetch";
import Clock from "../assets/clock.svg";
import Star from "../components/star-icon";

export async function loader({ params }) {
  return params.recipeId;
}

export default function RecipePage() {
  const recipeId = useLoaderData();
  let [recipe, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
  );
  console.log(recipe);
  recipe = recipe && recipe.data && recipe.data.recipe;
  console.log(recipe);
  return (
    <div className="recipe-page">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : recipe ? (
        <div className="recipe-details">
          <img className="image" src={recipe.image_url} alt="" />
          <div className="info">
            <div className="header">
              <h1>{recipe.title}</h1>
              <Star></Star>
            </div>

            <p className="time">
              <span>
                <img className="clock" src={Clock} alt="cooking time" />
              </span>
              {" " + recipe.cooking_time + " min."}
            </p>
            <ul>
              Ingredients:{" "}
              {recipe.ingredients.map((ingredient) => (
                <li>
                  {ingredient.description +
                    (ingredient.quantity
                      ? " - " +
                        ingredient.quantity +
                        " " +
                        (ingredient.unit === "tbsps" ? "tbs." : ingredient.unit)
                      : "")}
                </li>
              ))}
            </ul>
            <br />
            <p>
              Source:{" "}
              <a href={recipe.source_url ? recipe.source_url : ""}>
                {recipe.source_url ? recipe.source_url : "-"}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
