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
    <nav className="flex justify-between items-center text-white inset-x-0 md:h-24 h-18 bg-black shadow-[0px_20px_20px_10px_#00000024]-md">
      <ul className="flex items-center gap-12">
        <li>
          <Link to="/">
            <img
              className="w-36 md:w-48 z-50"
              src={logolarge}
              alt="Logo Origins-Digital"
            />
          </Link>
        </li>

        {location.pathname !== "/" && (
          <li className="text-l hidden lg:block tracking-wide duration-200 hover:text-orange-600">
            <NavLink to="/">Accueil</NavLink>
          </li>
        )}
        <li
          className={
            location.pathname === "/decouvrir"
              ? `hidden lg:block tracking-wide text-orange-600`
              : `hidden lg:block tracking-wide duration-200 hover:text-orange-600`
          }
        >
          <NavLink to="/decouvrir">Découvrir</NavLink>
        </li>
        {dataLogin ? (
          <li
            className={
              location.pathname === "/ma_liste"
                ? `hidden lg:block tracking-wide text-orange-600`
                : `hidden lg:block tracking-wide duration-200 hover:text-orange-600`
            }
          >
            <NavLink to="/ma_liste">Ma Liste</NavLink>
          </li>
        ) : null}
        {dataLogin?.is_admin ? (
          <li
            className={
              location.pathname === "/admin"
                ? `hidden lg:block tracking-wide text-orange-600`
                : `hidden lg:block tracking-wide duration-200 hover:text-orange-600`
            }
          >
            <NavLink to="/admin">Admin Page</NavLink>
          </li>
        ) : null}
        <li
          className={
            location.pathname === "/faq"
              ? ` hidden lg:block tracking-wide  text-orange-600`
              : `hidden lg:block tracking-wide duration-200 hover:text-orange-600`
          }
        >
          <NavLink to="/faq">FAQ</NavLink>
        </li>
      </ul>

      <div className="flex flex-row items-center gap-8">
        {dataLogin ? (
          <ul>
            <li className="relative hidden lg:block tracking-wide transition">
              <button
                type="button"
                onClick={handleClickMyProfile}
                className="border hover:bg-white duration-300 tracking-wide lg:block hidden hover:text-black py-2 px-6 transition"
              >
                {" "}
                Bonjour {dataLogin.firstname} !
              </button>
              {isDropdownOpen && (
                <div className="absolute duration-300 bg-black w-50 top-12">
                  <NavLink to="/userprofile">
                    <p className=" hidden lg:block hover:text-orange-600 pl-2 transition my-2">
                      Mon compte
                    </p>
                  </NavLink>
                  <NavLink to="/">
                    <button
                      type="submit"
                      className=" hidden lg:block duration-200 pl-2 hover:text-orange-600 transition my-2"
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
              className="border hover:bg-white tracking-wide lg:block hidden hover:text-black py-1 px-6 transition"
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
