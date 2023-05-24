import { createContext } from 'react';

export interface Ingredient {
  id: number;
  name: string;
  image?: string;
  quantity?: number;
}

export interface Recipe {
  id: number;
  ingredients: Ingredient[];
  name: string;
  image: string;
  difficulty?: string;
  cooking?: string;
  steps?: Step[];
  calories?: string;
  duration?: string;
}

export interface Ticket {
  id: number;
  icon: string;
  label: string;
}

export interface Step {
  id: number;
  description: string;
}

interface RecipeContextType {
  ingredients: Ingredient[] | undefined;
  setIngredients: (ingredients: Ingredient[]) => void;
  // getIngredients: () => Ingredient[] | undefined;
  possibleRecipes: Recipe[] | undefined;
  setPossibleRecipes: (recipes: Recipe[]) => void;
  getPossibleRecipes: () => Recipe[] | undefined;
  chosenRecipe: Recipe | undefined;
  setRecipe: (recipe: Recipe) => void;
  getRecipe: () => Recipe | undefined;
}

export const RecipeContext = createContext<RecipeContextType>(
  {} as RecipeContextType
);
