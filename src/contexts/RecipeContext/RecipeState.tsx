import { FC, useState } from 'react';
import { Ingredient, Recipe, RecipeContext } from './RecipeContext';

interface Props {
  children: React.ReactNode;
}

export const RecipeState: FC<Props> = ({ children }) => {
  const [ingredients, setIngredientsState] = useState<Ingredient[]>([]);
  const [possibleRecipes, setPossibilities] = useState<Recipe[]>();
  const [chosenRecipe, setChosenRecipe] = useState<Recipe>();

  const setIngredients = (ingredients: Ingredient[]) => {
    setIngredientsState(ingredients);
    localStorage.removeItem('ingredients');
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  };

  const getIngredients = (): Ingredient[] | undefined => {
    if (!ingredients) {
      const ingredientsFromStorage = localStorage.getItem('ingredients');
      const ingredientsParsed: Ingredient[] = JSON.parse(
        ingredientsFromStorage || ''
      );
      return ingredientsParsed;
    }
    return ingredients;
  };

  const addIngredient = (ingredient: Ingredient): void => {
    setIngredientsState([...ingredients, ingredient]);
  };

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
        getIngredients,
        addIngredient,
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
