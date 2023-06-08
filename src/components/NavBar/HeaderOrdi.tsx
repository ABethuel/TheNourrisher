import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

export const HeaderOrdi = () => {
  const {goToPath}=useContext(GlobalContext)
  return (
<header className="flex justify-around items-center p-4 invisible sm:visible ">
  <div className="flex items-center">
    <a className="hover:cursor-pointer" onClick={() => goToPath('/')}>
      <img src="/LogoTheNourisherGold.png"></img>
    </a>
    <button className="bg-transparent mx-2 pl-2 text-white" onClick={() => goToPath('/')}>Cuisiner</button>
    <button className="bg-transparent mx-2 text-white" onClick={() => goToPath('/community')}>Communauté</button>
  </div>
  <div className="flex items-center">
    <button className="bg-transparent mx-2 text-white">Se connecter</button>
    <button className="bg-black text-white px-5 rounded mx-2">Inscription</button>
  </div>
</header>

  );
};
