/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import {
  Ingredient,
  Recipe,
  RecipeContext,
} from '@/contexts/RecipeContext/RecipeContext';
import { FC, useContext, useEffect, useState } from 'react';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: FC<Props> = ({ recipe }) => {
  const [ingredientsToDisplay, setIngredientsToDisplay] = useState<
    Ingredient[]
  >(recipe.ingredients.slice(0, 3));
  const { setRecipe } = useContext(RecipeContext);
  const { goToPath } = useContext(GlobalContext);

  const choseRecipe = () => {
    setRecipe(recipe);
    goToPath('/recette');
  };

  return (
    <div
      className="bg-[#CBA55F] w-10/12 2xl:w-9/12 mb-5 rounded-lg drop-shadow-lg hover:bg-[#AF8B49]"
      onClick={() => choseRecipe()}
    >
      <div className="flex gap-2 p-2">
        <img
          className="w-5/12 rounded-lg h-32 object-contain"
          src={recipe.image}
          alt={recipe.name}
        />
        <div className="w-full h-full">
          <div className=" flex justify-between text-sm ">
            <h1 className="font-bold ">{recipe.name}</h1>
            <p>{recipe.duration}</p>
          </div>
          <ul className="list-disc ml-5 text-sm mt-2">
            {ingredientsToDisplay.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
          <p className="text-sm mt-5 flex justify-end">{recipe.calories}</p>
        </div>
      </div>
    </div>
  );
};
