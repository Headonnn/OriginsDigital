import React, { useContext } from "react";
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

  return (
    <nav className=" flex justify-between items-center text-white inset-x-0 h-24 bg-black bg-opacity-60	shadow-[0px_20px_20px_10px_#00000024]">
      <ul className="flex items-center gap-12">
        <li>
          <Link to="/">
            <img className="w-48" src={logolarge} alt="Logo Origins-Digital" />
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
        <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
          <NavLink to="/ma_liste">Ma Liste</NavLink>
        </li>
        {dataLogin?.is_admin ? (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
            <NavLink to="/admin">Admin Page</NavLink>
          </li>
        ) : null}
      </ul>
      <div className="flex items-center pr-8 gap-8">
        {/*  */}
        {dataLogin ? (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
            <NavLink to="/UserProfile">Hello {dataLogin.username} !</NavLink>
          </li>
        ) : null}
        {dataLogin ? (
          <button
            type="submit"
            className="border hover:bg-white tracking-wide lg:block hidden hover:text-black rounded-xl py-2 px-6 transition"
            onClick={handleLogout}
          >
            {" "}
            Se déconnecter{" "}
          </button>
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
