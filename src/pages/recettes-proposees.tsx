import { CustomButton } from '@/components/Controls/Button/CustomButton';
import { Loading } from '@/components/Loading/Loading';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import { RecipeContext } from '@/contexts/RecipeContext/RecipeContext';
import Image from 'next/image';
import { useContext, useState } from 'react';

const PosibleRecipe = () => {
  const { goToPath } = useContext(GlobalContext);
  const { possibleRecipes } = useContext(RecipeContext);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="h-screen bg-[#CACACA] sm:bg-[#535961]">
      <div className="grid place-items-center mb-10">
        <h1 className="mt-8 text-center font-bold w-10/12 sm:text-white text-xl">
          Recettes disponibles
        </h1>
        <h2 className="font-bold mb-1">A vos fourneaux !</h2>
        <Image
          src={'/LogoTheNourisherNoir_short.png'}
          alt={'Logo The Nourrisher'}
          width={40}
          height={40}
        />
      </div>

      <div className="h-screen bg-[#535961] rounded-3xl pb-50">
        <div className="grid place-items-center">
          <div className="mt-8 sm:mt-0 w-full grid place-items-center sm:w-1/3">
            {possibleRecipes
              ? possibleRecipes.map((recipe) => (
                  <RecipeCard
                    recipe={recipe}
                    key={recipe.id}
                    isLoading={setLoading}
                  />
                ))
              : ''}
          </div>
          {isLoading && (
            <div className="fixed bottom-10 mb-40">
              <Loading />
            </div>
          )}
          <CustomButton
            onClick={() => goToPath('/')}
            className="fixed bottom-28 mt-12"
          >
            Ajouter des ingrédients
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PosibleRecipe;
