import { useLoaderData, useNavigate } from "react-router-dom";
import useFetch from "../data/useFetch";
import Clock from "../assets/clock.svg";
import Star from "../components/Star";
import { useContext } from "react";
import { GlobalContext } from "../components/GlobalState";
import Spinner from "../components/Spinner";
import Back from "../assets/arrow-back.svg";

export async function loader({ params }) {
  return params.recipeId;
}

export default function RecipePage() {
  const { favouritesList } = useContext(GlobalContext);
  const recipeId = useLoaderData();
  let [recipe, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
  );
  const navigate = useNavigate();
  recipe = recipe && recipe.data && recipe.data.recipe;
  return (
    <div
      className={
        "recipe-page " + (favouritesList.contains(recipeId) ? "favourite" : "")
      }
    >
      {
        <button onClick={() => navigate(-1)}>
          <img src={Back} alt="" />
        </button>
      }
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : recipe ? (
        <div className="recipe-details">
          <div className="header">
            <img className="image" src={recipe.image_url} alt="" />
            <div className="left">
              <h1>{recipe.title}</h1>

              <div className="time-and-star-container">
                <p className="time">
                  <span>
                    <img className="clock" src={Clock} alt="cooking time" />
                  </span>
                  {" " + recipe.cooking_time + " min."}
                </p>
                <Star
                  onClick={() =>
                    favouritesList.contains(recipeId)
                      ? favouritesList.remove(recipeId)
                      : favouritesList.add(recipeId)
                  }
                ></Star>
              </div>
            </div>
          </div>

          <ul>
            Ingredients:{" "}
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
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
      ) : null}
    </div>
  );
}
