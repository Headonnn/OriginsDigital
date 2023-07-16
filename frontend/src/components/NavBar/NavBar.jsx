import React, { useContext, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import LoginContext from "../../../contexts/LoginContext";
import BurgerMenu from "./BurgerMenu";
import logolarge from "../../assets/images/Logo_Origins-digital_White.png";

function Header() {
  const location = useLocation();

  const { dataLogin, setDataLogin } = useContext(LoginContext);

  const logout = () => {
    localStorage.removeItem("token");
    setDataLogin(undefined);
  };

  const handleLogout = () => {
    logout();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickMyProfile = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className=" flex justify-between items-center text-white inset-x-0 h-24 bg-black bg-opacity-60	shadow-[0px_20px_20px_10px_#00000024]-md">
      <ul className="flex items-center gap-12">
        <li>
          <Link to="/">
            <img
              className="w-36 md:w-48"
              src={logolarge}
              alt="Logo Origins-Digital"
            />
          </Link>
        </li>

        {location.pathname !== "/" && (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600">
            <NavLink to="/">Accueil</NavLink>
          </li>
        )}
        <li className=" text-l hidden lg:block tracking-wide hover:text-orange-600">
          <NavLink to="/decouvrir">Découvrir</NavLink>
        </li>
        {dataLogin ? (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
            <NavLink to="/ma_liste">Ma Liste</NavLink>
          </li>
        ) : null}
        {dataLogin?.is_admin ? (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
            <NavLink to="/admin">Admin Page</NavLink>
          </li>
        ) : null}
        <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
          <NavLink to="/faq">FAQ</NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-8">
        {dataLogin ? (
          <ul>
            <li className="relative text-l hidden lg:block tracking-wide transition">
              <button
                type="button"
                onClick={handleClickMyProfile}
                className="border hover:bg-white duration-300 tracking-wide lg:block hidden hover:text-black rounded-xl py-2 px-6 transition"
              >
                {" "}
                Bonjour {dataLogin.firstname} !
              </button>
              {isDropdownOpen && (
                <div className="px-6 absolute duration-300  bg-black bg-opacity-60 w-60 top-[70px] rounded-b-md py-2">
                  <NavLink to="/userprofile">
                    <p className="text-l hidden lg:block hover:text-orange-600 transition my-2">
                      Mon compte
                    </p>
                  </NavLink>
                  <NavLink to="/">
                    <button
                      type="submit"
                      className="text-l hidden lg:block hover:text-orange-600 transition my-2"
                      onClick={handleLogout}
                    >
                      {" "}
                      Se déconnecter{" "}
                    </button>
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        ) : (
          <NavLink to="/login">
            <button
              type="button"
              className="border hover:bg-white tracking-wide lg:block hidden hover:text-black rounded-xl py-2 px-6 transition"
            >
              S'identifier
            </button>
          </NavLink>
        )}
        <BurgerMenu className="block md:hidden" />
      </div>
    </nav>
  );
}

export default Header;
