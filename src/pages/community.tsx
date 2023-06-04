import { CustomButton } from '@/components/Controls/Button/CustomButton';
import { CreateModalRecipe } from '@/components/Modals/ModalCreateRecipe';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { GlobalContext } from '@/contexts/GlobalContext/GlobalContext';
import { RecipeContext } from '@/contexts/RecipeContext/RecipeContext';
import { recipesData } from '@/data/recipe';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';

const Community = () => {
  const [openModal, closeModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const createRecipe = () => {
    return <CreateModalRecipe callBackCloseModal={closeModal} />;
  };

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
                  <RecipeCard
                    recipe={recipe}
                    key={recipe.id}
                    isLoading={setLoading}
                  />
                ))
              : ''}
          </div>
          <CustomButton
            onClick={() => closeModal(!openModal)}
            className="fixed bottom-28 mt-12"
          >
            Proposer une recette
          </CustomButton>
          {openModal && createRecipe()}
        </div>
      </div>
    </div>
  );
};

export default Community;
