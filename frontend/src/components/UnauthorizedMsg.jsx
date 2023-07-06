import React from "react";
import { NavLink } from "react-router-dom";

function UnauthorizedMsg() {
  return (
    <div className="min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <h2 className="text-3xl flex justify-center md:text-3xl pb-8 font-bold mt-10">
          ACCES REFUSE
        </h2>
        <p className="pb-8"> Vous n'êtes pas admin </p>
        <NavLink to="/">
          <button
            type="button"
            className="border hover:bg-white tracking-wide lg:block hidden hover:text-black rounded-xl py-2 px-6 transition"
          >
            j'avoue
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default UnauthorizedMsg;
