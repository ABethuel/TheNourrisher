import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

export const HeaderOrdi = () => {
  const {goToPath}=useContext(GlobalContext)
  return (
      <header className="bg-gray-300 p-4 hidden sm:block">

        <ul className="flex justify-between max-w-5xl mx-auto">
          <li onClick={() => goToPath('/')}>
            <a className="flex items-center">
              <img
                src="/imageNavBar/hot-pot.png"
                alt="Cuisiner"
                className="w-6 h-6 mr-2"
              />
              <span>Cuisiner</span>
            </a>
          </li>
          <li>
            <a href="#communaute" className="flex items-center">
              <img
                src="/imageNavBar/meeting.png"
                alt="Communauté"
                className="w-6 h-6 mr-2"
              />
              <span>Communauté</span>
            </a>
          </li>
          <li>
            <a href="#profil" className="flex items-center">
              <img src="/imageNavBar/profile-user.png" alt="Profil" className="w-6 h-6 mr-2"/>
              <span>Profil</span>
            </a>
          </li>

        </ul>
      </header>
  );
};
