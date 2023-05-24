/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import {
  Ingredient,
  Recipe,
  RecipeContext,
} from '@/contexts/RecipeContext/RecipeContext';
import { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: FC<Props> = ({ recipe }) => {
  const [ingredientsToDisplay, setIngredientsToDisplay] = useState<
    Ingredient[]
  >(recipe.ingredients.slice(0, 4));
  const { setRecipe } = useContext(RecipeContext);
  const { goToPath, getPath } = useContext(GlobalContext);
  //const location = useLocation();
  console.log(getPath())
  //const isOnCommunityPage = location.pathname === "/community"; 

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
          className="w-5/12 rounded-lg h-32 object-cover"
          src={recipe.image}
          alt={recipe.name}
        />
        <div className="w-full h-full">
          <div className=" flex justify-between text-xs ">
            <h1 className="font-bold ">{recipe.name}</h1>
          </div>
          <ul className="list-disc ml-5 text-xs mt-2">
            {ingredientsToDisplay.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
          <div className="flex justify-between text-xs mt-6">
            <p>{recipe.duration}</p>

            <p className="text-xs ">{getPath() == "/community" ? 'Par ' + recipe.author : recipe.calories + 'Cal'}</p>

            
            
          </div>
        </div>
      </div>
    </div>
  );
};
