import { useEffect, useState } from "react";

export default function useRecipes(search) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchRecipes() {
    try {
      setLoading(true);

      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
      );
      const data = await response.json();

      data && data.data && data.data.recipes && setRecipes(data.data.recipes);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRecipes();
  }, [search]);

  return [recipes, loading, error];
}
