import { FC, useEffect, useState } from 'react';
import { Ingredient, Recipe, RecipeContext } from './RecipeContext';

interface Props {
  children: React.ReactNode;
}

export const RecipeState: FC<Props> = ({ children }) => {
  const [ingredients, setIngredientsState] = useState<Ingredient[]>([]);
  const [possibleRecipes, setPossibilities] = useState<Recipe[]>();
  const [chosenRecipe, setChosenRecipe] = useState<Recipe>();

  useEffect(() => {
    if (ingredients.length === 0) {
      if (localStorage.getItem('ingredients')) {
        const ingredientsFromStorage = localStorage.getItem('ingredients');
        const ingredientsParsed: Ingredient[] = JSON.parse(
          ingredientsFromStorage || ''
        );
        setIngredientsState(ingredientsParsed);
      }
    }
    if (!chosenRecipe) {
      if (localStorage.getItem('chosenRecipe')) {
        const chosenRecipeFromStorage = localStorage.getItem('chosenRecipe');
        const chosenRecipeParsed: Recipe = JSON.parse(
          chosenRecipeFromStorage || ''
        );
        setChosenRecipe(chosenRecipeParsed);
      }
    }
  }, []);

  const setIngredients = (ingredients: Ingredient[]) => {
    setIngredientsState(ingredients);
    localStorage.removeItem('ingredients');
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  };

  /*  const getIngredients = (): Ingredient[] | undefined => {
    if (ingredients.length === 0) {
      if (typeof window !== 'undefined') {
        const ingredientsFromStorage = localStorage.getItem('ingredients');
        const ingredientsParsed: Ingredient[] = JSON.parse(
          ingredientsFromStorage || ''
        );
        console.log('test');
        return ingredientsParsed;
      }
    }
    console.log('hjkhh');
    return ingredients;
  }; */

  const setPossibleRecipes = (recipes: Recipe[]) => {
    setPossibilities(recipes);
    localStorage.removeItem('possibleRecipes');
    localStorage.setItem('possibleRecipes', JSON.stringify(recipes));
  };

  const getPossibleRecipes = () => {
    if (!possibleRecipes) {
      const possibleRecipesFromStorage =
        localStorage.getItem('possibleRecipes');
      const possibleRecipesParsed: Recipe[] = JSON.parse(
        possibleRecipesFromStorage || ''
      );
      return possibleRecipesParsed;
    }
    return possibleRecipes;
  };

  const setRecipe = (recipe: Recipe) => {
    setChosenRecipe(recipe);
    localStorage.removeItem('chosenRecipe');
    localStorage.setItem('chosenRecipe', JSON.stringify(recipe));
  };

  const getRecipe = () => {
    if (!possibleRecipes) {
      const chosenRecipeFromStorage = localStorage.getItem('chosenRecipe');
      const chosenRecipeParsed: Recipe = JSON.parse(
        chosenRecipeFromStorage || ''
      );
      return chosenRecipeParsed;
    }
    return chosenRecipe;
  };

  return (
    <RecipeContext.Provider
      value={{
        ingredients,
        setIngredients,
        //getIngredients,
        possibleRecipes,
        setPossibleRecipes,
        getPossibleRecipes,
        chosenRecipe,
        setRecipe,
        getRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
