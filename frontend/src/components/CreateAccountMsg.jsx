import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function CreateAccountMsg() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <h2 className="text-3xl flex justify-center md:text-3xl pb-8 font-bold mt-10">
            Félicitations !
          </h2>
          <p className="pb-8">Votre compte à été créé avec succès.</p>
          <NavLink to="/login">
            <button
              type="button"
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-regular text-base font-poppins text-md rounded-md px-3 py-3 border border-black focus:outline-none focus:border-blue-700 w-full md:w-[22rem] md:h-[5rem]"
            >
              Se connecter
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CreateAccountMsg;
