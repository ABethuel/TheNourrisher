import { CustomButton } from '@/components/Controls/Button/CustomButton';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import { RecipeContext } from '@/contexts/RecipeContext/RecipeContext';
import { recipesData } from '@/data/recipe';
import Image from 'next/image';
import { useContext } from 'react';

const PosibleRecipe = () => {
  const { goToPath } = useContext(GlobalContext);

  return (
    <div className="h-screen bg-[#535961] sm:bg-[#535961]">
      <div className="grid place-items-center mb-4">
        <h1 className="mt-8 text-center font-bold w-10/12 text-white text-xl mb-4">
          Les plats de la communauté !
        </h1>
        <Image
          src={'/LogoTheNourisherGold.png'}
          alt={'Logo The Nourrisher'}
          width={40}
          height={40}
        />
      </div>

      <div className="h-screen bg-[#535961] rounded-3xl ">
        <div className="grid place-items-center">
          <div className="mt-8 sm:mt-0 w-full grid place-items-center sm:w-1/3">
            {recipesData
              ? recipesData.map((recipe) => (
                  <RecipeCard recipe={recipe} key={recipe.id} />
                ))
              : ''}
          </div>

          <CustomButton
            onClick={() => goToPath('/nouvelle-recette')}
            className="fixed bottom-20 mt-12"
          >
            Proposer une recette
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PosibleRecipe;
