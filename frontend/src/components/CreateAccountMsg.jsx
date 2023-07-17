import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function CreateAccountMsg() {
  return (
    <>
      <NavBar />

      <div className="flex flex-col items-center border border-white px-10 py-8 mx-auto sm:max-w-md my-10 text-white rounded-[31px]">
        <h2 className="flex items-center gap-12 pb-6">Félicitations !</h2>
        <p className="pb-8">Votre compte à été créé avec succès.</p>
        <NavLink to="/login">
          <button
            type="button"
            className="w-full mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-3"
          >
            Se connecter
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default CreateAccountMsg;
