import { useContext } from "react";
import useFetch from "../data/useFetch";
import Recipe from "../components/recipe";

export default function HomePage() {
  // const [recipes, loading, error] = useFetch(
  //   `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  // );

  return (
    <div className="home">
      <h1>Homepage</h1>
    </div>
  );
}
