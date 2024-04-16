import Star from "./Star";
import { Link } from "react-router-dom";

export default function Recipe({ recipe, onClick, className }) {
  return (
    <div className={"recipe-container " + className}>
      <Link to={"/Recipe-App/" + recipe.id} className="recipe">
        <img src={recipe.image_url} alt={recipe.title} />
        <h1>{adjustTitle(recipe.title, 20)}</h1>
        <h2>{"- " + recipe.publisher}</h2>
      </Link>
      <Star onClick={() => onClick(recipe.id)}></Star>
    </div>
  );
}

export function adjustTitle(title, chars) {
  let modified = title;
  modified = modified.slice(0, 1).toUpperCase() + modified.slice(1);

  if (title.length > chars) {
    modified = modified.slice(0, chars).trim() + "...";
  }
  return modified;
}
