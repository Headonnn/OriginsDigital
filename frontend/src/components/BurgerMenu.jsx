import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";

function BurgerMenu() {
  // Changer classes menu
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <nav>
        {openMenu === false ? (
          <GiHamburgerMenu
            className="hover:text-orange-600"
            size={30}
            onClick={() => setOpenMenu(!openMenu)}
          />
        ) : (
          <GoX
            className="hover:text-orange-600"
            size={35}
            onClick={() => setOpenMenu(!openMenu)}
          />
        )}
        {openMenu === true && (
          <div className="absolute w-55 py-4 px-4 bg-black right-0 top-20 rounded-md">
            <ul>
              <li className="p-2 hover:text-orange-600 font-medium">
                <NavLink to="login">Login</NavLink>
              </li>
              <li className="p-2 hover:text-orange-600 font-medium">
                <NavLink>Catégories</NavLink>
              </li>
              <li className="p-2 hover:text-orange-600 font-medium">
                <NavLink>Contact</NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
export default BurgerMenu;
