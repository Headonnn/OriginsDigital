import React from "react";

import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function CreateAccountForm() {
  return (
    <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] left-[60px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] right-[60px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute top-[0px] left-1/2 transform -translate-x-1/2"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-20 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <div>
          <NavLink to="/login">
            {" "}
            <FaTimes className="absolute top-8 right-8 cursor-pointer text-orange-500 w-10 h-10" />{" "}
          </NavLink>
        </div>
        <h1 className="text-white text-3xl font-bold font-poppins text-center mt-15">
          Création de votre compte
        </h1>
        <form className=" rounded-lg p-4 ">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-bold font-poppins text-white"
            >
              Votre Username
            </label>
            <div className="py-2">
              <input
                id="Username"
                name="Username"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Prénom"
              className="block text-xl font-bold font-poppins text-white "
            >
              Prénom
            </label>
            <div className="py-2">
              <input
                id="Prénom"
                name="Prénom"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Nom"
              className="block text-xl font-bold font-poppins text-white"
            >
              Nom
            </label>
            <div className="py-2">
              <input
                id="Nom"
                name="Nom"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="mail"
              className="block text-xl font-bold font-poppins text-white"
            >
              E-mail
            </label>
            <div className="py-2">
              <input
                id="e-mail"
                name="e-mail"
                type="email"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-bold font-poppins text-white"
            >
              Password
            </label>
            <div className="py-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div className="flex pt-4 items-center ">
            <input
              id="terms-and-privacy"
              name="terms-and-privacy"
              type="checkbox"
              className=""
            />
            <label
              htmlFor="terms-and-privacy"
              className="ml-2 block text-sm text-gray-900"
            >
              J'ai lu et j'accepte les
              <a href="/" className="text-indigo-600 hover:text-indigo-500">
                Conditions
              </a>
              et la
              <a href="/" className="text-indigo-600 hover:text-indigo-500">
                {" "}
                Politique de Confidentialité{" "}
              </a>
              .
            </label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-m font-bold text-white font-poppins bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <a href="/accountcreationmessage">Je m'inscris !</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
