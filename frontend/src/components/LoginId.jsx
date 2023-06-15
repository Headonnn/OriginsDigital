import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { FaTimes } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

function LoginId() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="loginid-container bg-black p-5 py-8 relative overflow-hidden">
      {/* <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[10px] left-[00px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[1px] right-[100px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute top-[0px] left-1/2 transform -translate-x-1/2"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      /> */}
      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 xl:p-0shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <NavLink to="/">
          <FaTimes className="absolute top-8 right-8 cursor-pointer text-orange-500 w-6 h-6" />
        </NavLink>
        <h1 className="text-white text-lg text-center mt-15">
          Se connecter à Mon Compte
        </h1>
        <div className="rounded-lg p-4 mt-16">
          <div className="relative">
            <input
              type="email"
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white placeholder-white font-regular text-md rounded-md px-3 py-3 mb-4 border border-black focus:outline-none focus:border-blue-700 w-full md:w-96 pr-10"
              placeholder="Identifiant : wildco@gmail.com"
            />
            <BsCheckCircle className="absolute top-1/2 right-2 transform -translate-y-1/2 text-green-500 w-6 h-6" />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white placeholder-white font-regular text-md rounded-md px-3 py-3 border border-black focus:outline-none focus:border-blue-700 w-full md:w-106 pr-10"
              placeholder="Mot de passe : ******* "
            />
            {passwordVisible ? (
              <IoEyeOffSharp
                className="absolute right-2 transform -translate-y-1/2 text-white w-6 h-6 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeSharp
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white w-6 h-6 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>
        <p className="text-white text-sm font-light font-poppins mt-2">
          Forgot password? Recover <span className="underline">here</span>.
        </p>
        <div className="flex flex-col space-y-2 mt-16 w-full">
          <button
            type="button"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-regular text-base rounded-md px-3 py-3 border border-black focus:outline-none focus:border-blue-700"
          >
            S'identifier
          </button>
          <p className="mt-4 text-sm text-center">
            Première visite sur Origins Digital ?{" "}
            <span className="font-bold">Inscrivez-vous</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginId;
