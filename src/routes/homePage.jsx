import { useEffect, useMemo, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import useFetch from "../data/useFetch";

export default function HomePage() {
  const words = [
    "Apple",
    "Banana",
    "Chocolate",
    "Strawberry",
    "Chicken",
    "Lemon",
    "Spicy",
  ];
  const currentWordRef = useRef(
    words[Math.floor(Math.random() * words.length)]
  );

  const currentWord = currentWordRef.current;

  const [row1, row1Loading, row1Error] = useFetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${currentWord}`
  );

  const [extractedRow1, setExtractedRow1] = useState(null);

  useEffect(() => {
    setExtractedRow1(extractRecipes(row1));
  }, [row1]);

  function extractRecipes(recipes) {
    if (
      !(
        recipes &&
        recipes.data &&
        recipes.data.recipes &&
        recipes.data.recipes.length > 0
      )
    )
      return;
    const numberOfItems = 10;
    const startingPoint = Math.round(
      Math.random() * (recipes.data.recipes.length - numberOfItems)
    );
    return [...recipes.data.recipes].filter(
      (_, index) => index > startingPoint && index < startingPoint + 10
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Let's cook!</h1>
        <h2>
          Try searching for recipes using full words like "chocolate",
          "strawberry", "pasta" etc.
        </h2>
      </div>
      <Carousel
        items={extractedRow1 && extractedRow1}
        direction="right"
        keyWord={currentWord}
        loading={row1Loading}
        error={row1Error}
        id={0}
      ></Carousel>
    </div>
  );
}
