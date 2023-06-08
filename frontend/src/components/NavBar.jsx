import React from "react";
import { NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import BurgerMenu from "./BurgerMenu";
import logolarge from "../assets/images/Logo_Origins-digital_White.png";
import logosmall from "../assets/fav-icon_OD.png";

function Header() {
  return (
    <div className="flex w-screen items-center inset-x-0 top-0 h-24">
      <div className="flex w-screen items-center inset-x-0 top-0 h-24 justify-start pl-5 bg-black text-white">
        <a href="https://origins-digital.com">
          <img
            className="h-22 w-60 hidden md:block"
            src={logolarge}
            alt="Logo Origins-Digital"
          />
          <img
            className="h-20 w-20 block md:hidden"
            src={logosmall}
            alt="Logo Origins-Digital"
          />
        </a>
      </div>
      <div className="flex w-screen items-center top-0 h-24 justify-start gap-12 pr-5 bg-black text-white ">
        <h2 className="text-white text-xl font-poppins hidden md:block tracking-wide  hover:text-orange-600">
          <NavLink to="/">Accueil</NavLink>
        </h2>
        <h2 className="text-white text-xl font-poppins hidden md:block tracking-wide  hover:text-orange-600">
          <NavLink>Catégories</NavLink>
        </h2>
        <h2 className="text-white  text-xl font-poppins hidden md:block tracking-wide  hover:text-orange-600">
          <NavLink to="/admin">Admin</NavLink>
        </h2>
      </div>
      <div className="flex w-screen items-center top-0 h-24 justify-end gap-5 bg-black text-white pr-8">
        <h2 className="text-white border text-xl font-poppins hidden md:block tracking-wide p-2 rounded  hover:text-orange-600">
          {" "}
          <NavLink to="/login">Se connecter</NavLink>
        </h2>
        <VscAccount size={56} className="block md:hidden" />
        <BurgerMenu size={72} className="block md:hidden" />
      </div>
    </div>
  );
}

export default Header;
