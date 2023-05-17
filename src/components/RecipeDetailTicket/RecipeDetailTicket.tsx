import { FC } from 'react';
import Image from 'next/image';

interface Props {
  label: string;
  icon: string;
  alt?: string;
}

export const RecipeDetailTicket: FC<Props> = ({ label, icon, alt }) => {
  return (
    <div className="bg-[#CBA55F] w-[30%] rounded-lg  drop-shadow-lg mb-4 grid place-items-center">
      <span className="mt-2 mb-1">
        <Image src={icon} alt={alt || label} width={50} height={50} />
      </span>
      <span className="mb-2">{label}</span>
    </div>
  );
};
