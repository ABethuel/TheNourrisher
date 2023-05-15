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

  useEffect(() => {
    if (
      newIngredient &&
      !chosenIngredients.some(
        (ingredient) => ingredient.id === newIngredient.id
      )
    ) {
      setChosenIngredients([...chosenIngredients, newIngredient]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newIngredient]);

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
          <Combobox value={newIngredient} onChange={setNewIngredient}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <Combobox.Input
                  className="bg-gray-50 border border-gray-300 h-full text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  displayValue={(ingredient: Ingredient) => ingredient.name}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Insérer un ingrédient"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setSearchQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredIngredient.length === 0 && searchQuery !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredIngredient.map((ingredient) => (
                      <Combobox.Option
                        key={ingredient.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={ingredient}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {ingredient.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
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
              className="fixed bottom-20 mt-12"
            >
              Trouver une recette
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
}
