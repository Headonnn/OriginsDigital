import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";
import LoginContext from "../../../contexts/LoginContext";

function BurgerMenu() {
  // Changer classes menu
  const [openMenu, setOpenMenu] = useState(false);
  const { dataLogin, setDataLogin } = useContext(LoginContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDataLogin(undefined);
  };

  return (
    <div className="z-40">
      <nav className="lg:hidden pr-3 ">
        {openMenu === false ? (
          <GiHamburgerMenu
            className="hover:text-orange-600 cursor-pointer duration-200"
            size={40}
            onClick={() => setOpenMenu(!openMenu)}
          />
        ) : (
          <GoX
            className="hover:text-orange-600 cursor-pointer duration-200"
            size={40}
            onClick={() => setOpenMenu(!openMenu)}
          />
        )}
        {openMenu === true && (
          <div className="w-full absolute md:top-20 right-0 py-4 px-4 bg-black transition">
            <ul className="">
              <li className="p-2 hover:text-orange-600 duration-200 font-medium">
                <NavLink to="/decouvrir">Découvrir</NavLink>
              </li>
              {dataLogin ? (
                <li className="p-2 hover:text-orange-600 duration-200 font-medium">
                  <NavLink to="/ma_liste">Ma Liste</NavLink>
                </li>
              ) : null}
              {dataLogin?.is_admin ? (
                <li className="p-2 hover:text-orange-600  duration-200 font-medium">
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              ) : null}
              <li className="p-2 hover:text-orange-600 duration-200 font-medium">
                <NavLink to="/faq">FAQ</NavLink>
              </li>
            </ul>
            {dataLogin ? (
              <div className="p-2 mt-7">
                <div className="flex flex-col gap-2 ">
                  <button
                    type="button"
                    className="border w-full md:w-60 md:mx-auto hover:bg-gray-300 bg-white text-black rounded-md py-1 transition"
                  >
                    <NavLink to="/userprofile">Mon compte</NavLink>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="border w-full md:w-60 md:mx-auto hover:bg-gray-300  text-white rounded-md py-1 transition"
                  >
                    <NavLink to="/">Déconnexion</NavLink>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-2 justify-center mt-7">
                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="border w-full md:w-60 hover:bg-gray-300 bg-white text-black rounded-xl py-1 transition w-50%"
                  >
                    <NavLink to="/login">S'identifier</NavLink>
                  </button>
                </div>
                <p className="mt-3 text-sm text-center">
                  Première visite sur Origins Digital ?{" "}
                  <NavLink to="/createaccountform">
                    <span className="font-bold duration-200 hover:text-orange-600 ">
                      Inscrivez-vous
                    </span>
                  </NavLink>
                </p>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
export default BurgerMenu;
