import classNames from 'classnames';
import { FC, useState } from 'react';

interface Props {
  classnames?: string;
  labelsStyle?: string;
  callBackNumber: (value: number) => void;
}

export const NumberCounter: FC<Props> = ({
  classnames,
  labelsStyle,
  callBackNumber,
}) => {
  const [numberOnCounter, setNumberOnCounter] = useState(1);
  return (
    <div
      className={classNames(
        'flex flex-row h-6 w-10/12 sm:w-8/12 mt-1.5 sm:mt-2 sm:h-5.5 drop-shadow-lg',
        classnames
      )}
    >
      <button
        data-action="decrement"
        className=" bg-[#CACACA] text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 sm:w-12 rounded-l-2xl cursor-pointer outline-none"
        onClick={() => {
          setNumberOnCounter(numberOnCounter - 1);
          callBackNumber(numberOnCounter);
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
        className="border-x-1 border-y-0 border-gray-600 outline-none focus:outline-none text-center sm:text-end sm:px-2 w-full bg-[#CACACA] font-semibold text-sm hover:text-black focus:text-black text-gray-700 outline-none"
        name="custom-input-number"
        value={numberOnCounter}
        readOnly
      />
      <button
        data-action="increment"
        className="bg-[#CACACA] text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 sm:w-12 rounded-r-2xl cursor-pointer "
        onClick={() => {
          setNumberOnCounter(numberOnCounter + 1);
          callBackNumber(numberOnCounter);
        }}
      >
        <span
          className={classNames('text-2xl font-thin align-middle', labelsStyle)}
        >
          +
        </span>
      </button>
    </div>
  );
};
