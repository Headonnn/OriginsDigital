import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";

function BurgerMenu() {
  // Changer classes menu
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <nav className="lg:hidden">
        {openMenu === false ? (
          <GiHamburgerMenu
            className="hover:text-orange-600"
            size={40}
            onClick={() => setOpenMenu(!openMenu)}
          />
        ) : (
          <GoX
            className="hover:text-orange-600"
            size={40}
            onClick={() => setOpenMenu(!openMenu)}
          />
        )}
        {openMenu === true && (
          <div className="absolute w-full h-full py-4 px-4 bg-black right-0 top-20 rounded-md transition">
            <ul>
              <li className="p-2 hover:text-orange-600 font-medium">
                <NavLink>Découvrir</NavLink>
              </li>
              <li className="p-2 hover:text-orange-600 font-medium">
                <NavLink>Ma Liste</NavLink>
              </li>
            </ul>
            <div className="flex flex-col p-2 justify-center mt-7">
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  className="border w-full md:w-60 hover:bg-gray-300 bg-white text-black rounded-xl py-1 transition w-50%"
                >
                  <NavLink to="login" className="bg-white">
                    S'identifier
                  </NavLink>
                </button>
              </div>
              <p className="mt-3 text-sm text-center">
                Première visite sur Origins Digital ?{" "}
                <span className="font-bold">Inscrivez-vous</span>
              </p>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
export default BurgerMenu;
