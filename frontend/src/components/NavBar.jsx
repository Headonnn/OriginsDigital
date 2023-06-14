import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import logolarge from "../assets/images/Logo_Origins-digital_White.png";

function Header() {
  const location = useLocation();

  return (
    <nav className="flex w-screen justify-between items-center text-white inset-x-0 bg-black h-24">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-48" src={logolarge} alt="Logo Origins-Digital" />
        </Link>
      </div>
      <ul className="flex items-center gap-12">
        {location.pathname !== "/" && (
          <li className="text-l hidden lg:block tracking-wide hover:text-orange-600">
            <NavLink to="/">Accueil</NavLink>
          </li>
        )}
        <li className=" text-l hidden lg:block tracking-wide hover:text-orange-600">
          <NavLink>Découvrir</NavLink>
        </li>
        <li className=" text-l hidden lg:block tracking-wide  hover:text-orange-600">
          <NavLink>Contact</NavLink>
        </li>
        <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
          <NavLink to="/admin">Ma Liste</NavLink>
        </li>
        <li className="text-l hidden lg:block tracking-wide hover:text-orange-600 transition">
          <NavLink to="/admin">Admin</NavLink>
        </li>
      </ul>
      <div className="flex items-center pr-8 gap-8">
        <NavLink to="/login">
          <button
            type="button"
            className="border hover:bg-white tracking-wide lg:block hidden hover:text-black rounded-xl py-2 px-6 transition"
          >
            S'identifier
          </button>
        </NavLink>
        <BurgerMenu className="block md:hidden" />
      </div>
    </nav>
  );
}

export default Header;
