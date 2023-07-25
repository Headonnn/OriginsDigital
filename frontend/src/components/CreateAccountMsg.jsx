import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function CreateAccountMsg() {
  return (
    <>
      <NavBar />

      <div className="flex flex-col items-center px-10 py-8 mx-auto max-w-xs md:max-w-md my-10 text-center text-white">
        <h2 className="flex items-center gap-12 pb-6">Félicitations !</h2>
        <p className="pb-8">Votre compte à été créé avec succès.</p>
        <NavLink to="/login">
          <button
            type="button"
            className="w-full mx-auto border-2 border-white text-white py-2 px-4  my-3"
          >
            Se connecter
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default CreateAccountMsg;
