import classNames from 'classnames';
import { FC } from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// Pour les couleurs, utiliser une couleur tailwindcss (ex: 'red-500') ou utiliser le format [#1da1f2]
export const CustomButton: FC<Props> = ({ className, children, onClick }) => {
  return (
    <button
      className={classNames(
        'bg-[#F2F2F2] text-black font-bold py-2 px-8 rounded-lg shadow-xl hover:bg-[#B5B5B5]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
