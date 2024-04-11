import { useEffect } from "react";
import Star from "./star-icon";
import { Link } from "react-router-dom";

export default function Recipe({ recipe }) {
  return (
    <div className="recipe-container">
      <Link to={recipe.id} className="recipe">
        <img src={recipe.image_url} alt={recipe.title} />
        <h1>{adjustTitle(recipe.title, 20)}</h1>
        <h2>{"- " + recipe.publisher}</h2>
      </Link>
      <Star
        onClick={(e) => {
          console.log("click");
          e.stopPropagation();
        }}
      ></Star>
    </div>
  );
}

function adjustTitle(title, chars) {
  let modified = title;

  modified = modified.slice(0, 1).toUpperCase() + modified.slice(1);

  if (title.length > chars) {
    modified = title.slice(0, chars) + "...";
  }
  return modified;
}
