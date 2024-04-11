import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchRecipes() {
    try {
      setLoading(true);

      const response = await fetch(url);
      const data = await response.json();

      setData(data);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRecipes();
  }, [url]);

  return [data, loading, error];
}
