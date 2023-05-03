import classNames from 'classnames';
import { FC, useState } from 'react';

interface Props {
  classnames?: string;
  labelsStyle?: string;
}

export const NumberCounter: FC<Props> = ({ classnames, labelsStyle }) => {
  const [numberOnCounter, setNumberOnCounter] = useState(1);
  return (
    <div
      className={classNames(
        'flex flex-row h-8 w-10/12  relative bg-transparent mt-1',
        classnames
      )}
    >
      <button
        data-action="decrement"
        className=" bg-[#CACACA] text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l-2xl cursor-pointer outline-none"
        onClick={() => {
          setNumberOnCounter(numberOnCounter - 1);
        }}
        disabled={numberOnCounter <= 0 ? true : false}
      >
        <span
          className={classNames('text-2xl font-thin align-middle', labelsStyle)}
        >
          −
        </span>
      </button>
      <input
        type="number"
        className=" border-x-1 border-y-0 border-gray-600 outline-none focus:outline-none text-center w-full bg-[#CACACA] font-semibold text-sm hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
        name="custom-input-number"
        value={numberOnCounter}
      ></input>
      <button
        data-action="increment"
        className="bg-[#CACACA] text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r-2xl cursor-pointer"
        onClick={() => setNumberOnCounter(numberOnCounter + 1)}
      >
        <span
          className={classNames(
            'text-2xl font-thin inline-block align-middle',
            labelsStyle
          )}
        >
          +
        </span>
      </button>
    </div>
  );
};
