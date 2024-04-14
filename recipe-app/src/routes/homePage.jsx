import Carousel from "../components/Carousel";
import Spinner from "../components/Spinner";
import useFetch from "../data/useFetch";

export default function HomePage() {
  const [recipes, loading, error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${"apple"}`
  );

  const extractedRecipes =
    recipes &&
    recipes.data &&
    recipes.data.recipes &&
    recipes.data.recipes.length > 0 &&
    [...recipes.data.recipes].filter((_, index) => index < 10);

  return (
    <div className="home">
      <h1>Let's cook!</h1>
      <h2>
        Try searching for recipes using full words like "chocolate",
        "strawberry", "pasta" etc.
      </h2>
      <Carousel
        items={extractedRecipes && extractedRecipes}
        direction="right"
      ></Carousel>
    </div>
  );
}
