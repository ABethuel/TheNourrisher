/* eslint-disable @next/next/no-img-element */

import { FC } from 'react';
import { NumberCounter } from '../Controls/NumberCounter/NumberCounter';

interface Props {
  image: string;
  alt?: string;
  name: string;
}

export const Ingredient: FC<Props> = ({ image, alt, name }) => {
  return (
    <>
      <div className="bg-[#CBA55F] w-[45%] rounded-lg grid place-items-center drop-shadow-lg">
        <img src={image} alt={alt} width={90} className="mt-2" />
        <h2 className="font-bold mb-1">{name}</h2>
        <div className=" h-5 w-32 flex justify-center">
          <NumberCounter classnames="h-6 w-8/12" labelsStyle="text-lg" />
        </div>
      </div>
    </>
  );
};
