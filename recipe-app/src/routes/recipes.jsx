export default function Recipes() {

    
  return (
    <div className="recipes">
      {recipes
        ? recipes.map((recipe) => <h1 key={recipe.id}>{recipe.title}</h1>)
        : null}
    </div>
  );
}
