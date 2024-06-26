import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../data/useLocalStorage";

export const GlobalContext = createContext(null);

export default function GlobalState({ children, searchInput }) {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [favouriteitems, setFavouriteItems] = useState([]);

  useEffect(() => {
    async function fetchRecipe(id) {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        return await response.json();
      } catch (err) {
        console.log(err.message);
      }
    }

    if (
      favouriteitems &&
      favouriteitems.length > 0 &&
      favouriteitems.length > favourites.length
    ) {
      setFavouriteItems(
        favouriteitems.filter((item) =>
          favourites.includes(item.data.recipe.id)
        )
      );
      return;
    }

    if (favouriteitems.length + 1 === favourites.length) {
      async function getNewItem() {
        return await fetchRecipe(favourites[favourites.length - 1]);
      }
      getNewItem().then((newItem) => favouriteitems.push(newItem));
      return;
    }

    async function fetchRecipes() {
      const favouriteRecipes = await Promise.all(
        favourites.map((id) => fetchRecipe(id))
      );
      setFavouriteItems(favouriteRecipes);
    }
    fetchRecipes();
  }, [favourites]);

  const favouritesList = {
    add: (id) => {
      setFavourites((prevFavourites) => {
        const currentValue = prevFavourites.includes(id)
          ? prevFavourites
          : [...prevFavourites, id];
        return currentValue;
      });
    },
    remove: (id) => {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((currentId) => currentId != id)
      );
    },
    contains: (id) => {
      return favourites.includes(id);
    },
    getItemList: () => favouriteitems,
  };

  return (
    <GlobalContext.Provider value={{ favouritesList, searchInput }}>
      {children}
    </GlobalContext.Provider>
  );
}
