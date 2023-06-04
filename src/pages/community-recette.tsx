import { RecipeContext } from '@/contexts/RecipeContext/RecipeContext';
import { useContext, useEffect, useState } from 'react';

const Recipe = () => {
  const { chosenRecipe } = useContext(RecipeContext);
  return <div>Recette communauté</div>;
};

export default Recipe;