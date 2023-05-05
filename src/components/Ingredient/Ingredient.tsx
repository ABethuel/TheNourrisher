/* eslint-disable @next/next/no-img-element */

import { FC, useContext, useEffect, useState } from 'react';
import { NumberCounter } from '../Controls/NumberCounter/NumberCounter';
import {
  Ingredient,
  RecipeContext,
} from '@/contexts/RecipeContext/RecipeContext';
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';

interface Props {
  image: string;
  alt?: string;
  name: string;
}

export const IngredientCard: FC<Props> = ({ image, alt, name }) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [ingredient, setIngredient] = useState<Ingredient>({
    id: Math.floor(Math.random() * 100000),
    name: name,
    quantity: numberOfItems,
  });
  const { addIngredient, getIngredients } = useContext(RecipeContext);
  const { isMobile } = useContext(GlobalContext);

  const callBackNumber = (numberOfIngredients: number) => {
    setIngredient((ingredient) => ({
      ...ingredient,
      quantity: numberOfIngredients,
    }));
  };

  return (
    <>
      <div className="bg-[#CBA55F] w-[45%] sm:w-[30%] rounded-lg  drop-shadow-lg mb-4">
        <div className="absolute right-[-45px] top-[-5px] mr-9 bg-[#cacaca] hover:bg-[#6b6b6b] hover:text-white flex h-7 w-7 cursor-pointer flex-col items-center justify-center rounded-full border border-none tracking-wide shadow-lg">
          <span className="pb-1">x</span>
        </div>
        <div className="grid place-items-center">
          <img
            src={image}
            alt={alt}
            width={isMobile ? 75 : 90}
            className="mt-1"
          />
          <h2 className="font-bold mb-1">{name}</h2>
          <div className=" h-5 w-32 flex justify-center">
            <NumberCounter
              classnames="h-5 w-8/12"
              labelsStyle="text-lg"
              callBackNumber={callBackNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};
