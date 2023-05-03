import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import { Ingredient } from '@/components/Ingredient/Ingredient';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="h-screen bg-[#CACACA] sm:bg-[#535961]">
      <div className="grid place-items-center mb-10">
        <h1 className="text-center mt-8 font-bold w-10/12 sm:text-white">
          Avec quels ingrédients souhaitez vous cuisiner aujourd&apos;hui?
        </h1>
        <form className="mt-5">
          <div className="relative w-full">
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
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 h-full text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Insérer un ingrédient"
              required
            />
          </div>
        </form>
      </div>
      <div className="h-screen bg-[#535961] rounded-3xl">
        <div className="grid place-items-center">
          <h1 className="text-center text-xl font-bold text-white pt-5">
            Vos ingrédients
          </h1>
          <div className="flex flex-wrap gap-6 justify-center w-10/12 mt-10">
            <Ingredient
              image={
                'https://static.vecteezy.com/system/resources/previews/013/442/147/original/tomatoes-on-a-transparent-background-free-png.png'
              }
              name={'Tomate'}
              alt="tomate"
            />
            <Ingredient
              image={
                'https://static.vecteezy.com/system/resources/previews/013/442/147/original/tomatoes-on-a-transparent-background-free-png.png'
              }
              name={'Tomate'}
              alt="tomate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
