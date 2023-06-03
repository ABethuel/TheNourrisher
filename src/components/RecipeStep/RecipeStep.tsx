import { FC } from 'react';

interface Props {
  label: string;
}

export const RecipeStep: FC<Props> = ({ label }) => {
  return (
    <div className="text-white  mb-8">
      <p className="text-base">{label}</p>
    </div>
  );
};
