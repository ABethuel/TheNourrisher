import { GlobalContext } from "@/contexts/GlobalContext/GlobalContext";
import { useContext } from "react";

export const NavBar = () => {
    const {goToPath}=useContext(GlobalContext)
    return (
        <nav className="fixed bottom-0 w-full bg-gray-300 z-50 sm:hidden">
        <ul className="flex">
            <li className="flex-1" onClick={() => goToPath('/')}>
              <a className="block text-center py-2">
                <img src="/imageNavBar/hot-pot.png" alt="Cuisiner" className="mx-auto w-6"></img>
                <span>Cuisiner</span>
              </a>
            </li>
            <li className="flex-1">
              <a href="#communaute" className="block text-center py-2">
                <img src="/imageNavBar/meeting.png" alt="Communauté" className="mx-auto w-6"></img>
                <span>Communauté</span>
              </a>
            </li>
            <li className="flex-1">
              <a href="#profil" className="block text-center py-2">
                <img src="/imageNavBar/profile-user.png" alt="Profil" className="mx-auto w-6"></img>
                <span>Profil</span>
              </a>
            </li>
          </ul>
        </nav>
    );
  };
  