import { IngredientCard } from '@/components/Ingredient/IngredientCard';
import { CustomButton } from '@/components/Controls/Button/CustomButton';
import { Fragment, useContext, useEffect, useState } from 'react';
import {
  Ingredient,
  Recipe,
  RecipeContext,
} from '@/contexts/RecipeContext/RecipeContext';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ingredientsData } from '@/data/ingredients';
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import { Loading } from '@/components/Loading/Loading';
import { ComboBox } from '@/components/Controls/ComboBox/ComboBox';

export default function Home() {
  const [newIngredient, setNewIngredient] = useState<Ingredient>();
  const { setIngredients, ingredients, setPossibleRecipes, possibleRecipes } =
    useContext(RecipeContext);
  const [chosenIngredients, setChosenIngredients] = useState<Ingredient[]>(
    ingredients || []
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [returnedPrompt, setReturnedPrompt] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { goToPath } = useContext(GlobalContext);

  useEffect(() => {
    if (ingredients) setChosenIngredients(ingredients);
  }, [ingredients]);

  const callBackAddIngredient = (newIngredient: Ingredient) => {
    if (
      newIngredient &&
      !chosenIngredients.some(
        (ingredient) => ingredient.id === newIngredient.id
      )
    ) {
      setChosenIngredients([...chosenIngredients, newIngredient]);
    }
  };
  const filteredIngredient =
    searchQuery === ''
      ? ingredientsData
      : ingredientsData.filter((ingredient) =>
          ingredient.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(searchQuery.toLowerCase().replace(/\s+/g, ''))
        );

  const removeIngredient = (id: number) => {
    setChosenIngredients(
      chosenIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const changeQuantity = (quantity: number, id: number) => {
    const ingIndex = chosenIngredients.findIndex(
      (ingredient) => ingredient.id === id
    );
    const updatedIngredients = [...chosenIngredients];
    updatedIngredients[ingIndex].quantity = quantity + 1;
    setChosenIngredients(updatedIngredients);
  };

  const findRecipe = async (): Promise<void> => {
    setIngredients(chosenIngredients);
    setLoading(true);
    try {
      const response = await fetch('/api/generateRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: chosenIngredients }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log('d', data.result);
      setReturnedPrompt(data.result);
      setLoading(false);
      goToPath('/recettes-proposees');
    } catch (err: any) {
      console.log('err', err);
    }
  };

  const getRecipeImage = async (recipeName: string): Promise<string> => {
    try {
      const image = await fetch('/api/generateImages', {
        method: 'POST',
        body: JSON.stringify({ recipe: recipeName }),
      });

      const data = await image.json();
      return data;
    } catch (err) {
      console.log('err', err);
      return 'https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/v1520601012/jctcyii9cp2y9aouunfn.jpg';
    }
  };

  useEffect(() => {
    let [recipe1, recipe2, recipe3] = returnedPrompt.split('~');
    recipe1 = recipe1.substring(2);
    const arrayOfRecipes = [recipe1, recipe2, recipe3];
    const recipeParsed: Recipe[] = [];
    arrayOfRecipes.forEach((recipe) => {
      console.log(recipe);
      const name = recipe
        ? recipe.substring(12, recipe.lastIndexOf('Ingredients'))
        : '';
      console.log('name :', name);
      const ingredients = recipe
        ? recipe.substring(
            recipe.indexOf(':') + 1,
            recipe.lastIndexOf('Calories')
          )
        : '';
      const ingredientsParsed = ingredients.split('-');
      ingredientsParsed.shift();
      const ingredientsArray: Ingredient[] = [];
      ingredientsParsed.forEach((ingredient) => {
        ingredientsArray.push({
          id: Math.floor(Math.random() * 5000),
          name: ingredient,
        });
      });
      const caloriesFullTxt = recipe
        ? recipe.substring(
            recipe.indexOf('Calories:') + 1,
            recipe.indexOf('Durée')
          )
        : '';
      const calories = caloriesFullTxt.substring(
        caloriesFullTxt.indexOf(':') + 1
      );
      const preparation = recipe
        ? recipe.substring(recipe.lastIndexOf(':') + 1)
        : '';
      const recipeMapped: Recipe = {
        id: Math.floor(Math.random() * 5000),
        name: name.replace(':', ''),
        ingredients: ingredientsArray,
        image:
          'https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/v1520601012/jctcyii9cp2y9aouunfn.jpg',
        duration: preparation,
        calories: calories,
      };
      recipeParsed.push(recipeMapped);
    });
    setPossibleRecipes(recipeParsed);
  }, [returnedPrompt]);

  useEffect(() => {
    console.log('p', possibleRecipes);
  }, [possibleRecipes]);

  return (
    <div className="h-screen bg-[#CACACA] sm:bg-[#535961]">
      <div className="grid place-items-center mb-10">
        <h1 className="text-center mt-8 font-bold w-10/12 sm:text-white">
          Avec quels ingrédients souhaitez vous cuisiner aujourd&apos;hui ?
        </h1>
        <div className="mt-5 z-10">
          <ComboBox
            placeholder="Insérer un ingrédient"
            items={filteredIngredient}
            callBackMethod={callBackAddIngredient}
          />
        </div>
      </div>
      <div className="h-screen bg-[#535961] rounded-3xl">
        <div className="grid place-items-center">
          <h1 className="text-center text-xl font-bold text-white pt-5">
            Vos ingrédients
          </h1>
          <div className="flex flex-wrap gap-5 justify-center w-10/12 sm:w-1/3 mt-10">
            {chosenIngredients.map((ingredient: Ingredient) => (
              <IngredientCard
                image={
                  ingredient.image ||
                  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
                }
                name={ingredient.name}
                alt={ingredient.name}
                key={ingredient.id}
                id={ingredient.id}
                quantity={ingredient.quantity}
                removeIngredient={removeIngredient}
                changeQuantity={changeQuantity}
              />
            ))}
          </div>
          {isLoading && (
            <div className="fixed bottom-10 mb-40">
              <Loading />
            </div>
          )}

          {chosenIngredients.length > 0 && (
            <CustomButton
              onClick={() => findRecipe()}
              className="fixed bottom-28"
            >
              Trouver une recette
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}
