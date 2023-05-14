import { FC } from 'react';

interface Props {
  image: string;
  title: string;
  duration: number;
}

export const RecipeCard: FC<Props> = ({ image, title, duration }) => {
  return (
    <div className="bg-[#CBA55F] w-10/12 mb-4 rounded-lg">
      <div className="flex gap-2 p-2">
        <img className="w-5/12 rounded-lg h-32 object-contain" src={image} />
        <div className="flex justify-center">
          <h1 className="text-xs">{title}</h1>
          <p className="text-xs flex-end">{duration} min</p>
        </div>
      </div>
    </div>
  );
};
