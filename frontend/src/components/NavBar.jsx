import React from "react";
// import { NavLink } from "react-router-dom";
import { CiBurger } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import logolarge from "../assets/images/Logo_Origins-digital_White.png";
import logosmall from "../assets/images/logo_simple.png";

function Header() {
  return (
    <span className="flex w-screen items-center inset-x-0 top-0 h-24">
      <div className="flex w-screen items-center inset-x-0 top-0 h-24 justify-start pl-5 bg-black text-white">
        <a href="https://origins-digital.com">
          <img
            className="h-22 w-60 hidden sm:block"
            src={logolarge}
            alt="Logo Origins-Digital"
          />
          <img
            className="h-24 w-24 block sm:hidden"
            src={logosmall}
            alt="Logo Origins-Digital"
          />
        </a>
      </div>
      <div className="flex w-screen items-center top-0 h-24 justify-end gap-5 pr-5 bg-black text-white ">
        <h2 className="text-orange-600 text-xl font-poppins hidden sm:block">
          Create Account
        </h2>
        <VscAccount size={56} className="block sm:hidden" />
        <CiBurger size={72} />
      </div>
    </span>
  );
}

export default Header;
