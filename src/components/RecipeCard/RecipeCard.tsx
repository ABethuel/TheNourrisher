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
  isLoading: (value: boolean) => void;
}

export const RecipeCard: FC<Props> = ({ recipe, isLoading }) => {
  const [ingredientsToDisplay, setIngredientsToDisplay] = useState<
    Ingredient[]
  >(recipe.ingredients.slice(0, 3));
  const { setRecipe } = useContext(RecipeContext);
  const { goToPath } = useContext(GlobalContext);

  const clickOnRecipe = async () => {
    setRecipe(recipe);
    isLoading(true);

    try {
      const response = await fetch('/api/completeRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe: recipe }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      updateRecipe(data.result);
      isLoading(false);

      goToPath('/recette');
    } catch (err) {
      console.log(err);
    }
  };

  const updateRecipe = (detailRecipe: String) => {
    const difficultyRegex = /Difficulté : ([^\n]+)/;
    const difficultyMatch = detailRecipe.match(difficultyRegex);
    const difficulty = difficultyMatch ? difficultyMatch[1].trim() : '∅';

    const cookingTimeRegex = /Temps de cuisson : (\d+) min/;
    const cookingTimeMatch = detailRecipe.match(cookingTimeRegex);
    const cooking = cookingTimeMatch ? cookingTimeMatch[1] + 'min' : '∅';

    const stepsRegex = /Etapes :([\s\S]*)/;
    const stepsMatch = detailRecipe.match(stepsRegex);
    const steps = stepsMatch
      ? stepsMatch[1]
          .trim()
          .split('\n')
          .map((step) => step.trim())
      : [];

    console.log('Difficulty:', difficulty);
    console.log('\nCooking Time:', cooking);
    console.log('\nCooking Time:', cooking);
    console.log('Steps:', steps);
    setRecipe({
      ...recipe,
      cooking: cooking,
      steps: steps,
      difficulty: difficulty,
    });
    console.log(recipe);
  };

  return (
    <div
      className="bg-[#CBA55F] w-10/12 2xl:w-9/12 mb-5 rounded-lg drop-shadow-lg hover:bg-[#AF8B49]"
      onClick={() => clickOnRecipe()}
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

            <p className="text-xs ">{recipe.calories} Cal</p>
          </div>
        </div>
      </div>
    </div>
  );
};
