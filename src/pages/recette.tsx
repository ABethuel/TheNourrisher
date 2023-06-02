/* eslint-disable @next/next/no-img-element */
import { RecipeContext } from '@/contexts/RecipeContext/RecipeContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { RecipeDetailTicket } from '@/components/RecipeDetailTicket/RecipeDetailTicket';
import { RecipeStep } from '@/components/RecipeStep/RecipeStep';

const Recipe = () => {
  const { chosenRecipe } = useContext(RecipeContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    completeRecipe();
  }, []);
  const completeRecipe = async () => {
    try {
      const response = await fetch('/api/completeRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe: chosenRecipe }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log('d', data.result);
      updateRecipe(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const updateRecipe = (recipeRaw: string) => {
    const cookingRaw = recipeRaw.substring(0, 12);
    console.log('cr', cookingRaw);
  };

  return (
    <div className="h-screen bg-[#CACACA] sm:bg-[#535961]">
      <div className="grid place-items-center mb-10">
        <h1 className="mt-8 text-center font-bold w-10/12 sm:text-white text-xl">
          Votre recette
        </h1>
        <h2 className="font-bold mb-1">A vos fourneaux !</h2>
        <Image
          src={'/LogoTheNourisherNoir_short.png'}
          alt={'Logo The Nourrisher'}
          width={40}
          height={40}
        />
      </div>

      <div className="h-screen bg-[#535961] rounded-3xl">
        <div className="sm:mt-0 w-full sm:w-1/3 px-9">
          <div className=" flex justify-between w-full items-center gap-2">
            <h1 className="text-lg mt-8 font-bold text-white">
              {chosenRecipe?.name}
            </h1>
            <div className="mt-8">
              <Image
                src={isLiked ? '/heart/full.png' : '/heart/empty.png'}
                alt={'Like'}
                width={45}
                height={45}
                onClick={() => setIsLiked(!isLiked)}
              />
            </div>
          </div>
          <img
            src={chosenRecipe?.image || ''}
            alt="recette"
            className="w-full object-cover rounded-lg h-52 mt-6 mb-6"
          />
          <div className="flex gap-2 w-full justify-between mb-8">
            <RecipeDetailTicket label={'12min'} icon={'/tickets/time.png'} />
            <RecipeDetailTicket
              label={'12min'}
              icon={'/tickets/difficulty.png'}
            />
            <RecipeDetailTicket label={'12min'} icon={'/tickets/time2.png'} />
          </div>
          <div className="flex gap-2 items-center justify-start">
            <Image src={'/ingredient.png'} alt="" width={40} height={40} />
            <h2 className="font-bold text-white text-lg">Ingrédients</h2>
          </div>

          <div className="flex justify-between w-full mb-8">
            <ul className="list-disc mt-5 px-5">
              {chosenRecipe?.ingredients.map((ingredient) => (
                <li className="text-white font-bold" key={ingredient.id}>
                  {ingredient.name}
                </li>
              ))}
            </ul>
            <Image
              src={'/cooker.png'}
              alt={'cooker'}
              width={100}
              height={100}
              className="object-contain inline-block align-bottom"
            />
          </div>

          <div className="flex gap-2 items-center justify-start mb-6 mt-3">
            <Image src={'/prep.png'} alt="" width={40} height={40} />
            <h2 className="font-bold text-white text-lg">Préparation</h2>
          </div>

          <RecipeStep />
          <RecipeStep />
          <RecipeStep />

          <p className="text-white text-xl text-center text-font mt-12 mb-20">
            Bonne dégustation !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
