import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ButtonOrange from "./ButtonOrange";
import NavBar from "./NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";

function UserProfile() {
  const { dataLogin } = useContext(LoginContext);

  return (
    <>
      <NavBar />

      <div className="flex flex-col items-center bg-gradient-to-br from-blue-900 relative px-5 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] rounded-[31px]">
        <h2 className=" flex justify-center text-2xl md:text-3xl font-bold text-white pb-8 mt-10 tracking-wide">
          Votre profil
        </h2>
        {dataLogin ? (
          <div className="flex  grid-cols-2 gap-6">
            <div className="flex justify-start md:space-y-16 mx-5">
              <ul className=" space-y-10">
                <li>
                  <h3 className="  text-xl md:text-xl text-gray-500">
                    Vous êtes
                  </h3>
                  <p className=" text-xl md:text-2xl text-white">
                    {dataLogin.firstname}
                  </p>
                </li>
                <li>
                  <h3 className=" text-xl md:text-xl text-gray-500">
                    Votre email
                  </h3>
                  <p className=" text-xl md:text-2xl text-white">
                    {dataLogin.email}
                  </p>
                </li>
                <li>
                  <h3 className=" text-xl md:text-xl text-gray-500">
                    Votre password
                  </h3>
                  <p className=" text-xl md:text-2xl text-white">
                    {" "}
                    * * * * * * * *
                  </p>
                </li>
                <li>
                  <h3 className=" text-xl md:text-xl text-gray-500 py-3">
                    Supprimer le compte
                  </h3>
                </li>
              </ul>
            </div>
            <div className="flex justify-end md:space-y-16">
              <ul className="space-y-14 pr-3">
                <li>
                  <NavLink to="/">
                    <p className=" flex justify-center border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition">
                      Modifier
                    </p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <p className=" flex justify-center border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition">
                      Modifier
                    </p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <p className=" flex justify-center border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition">
                      Modifier
                    </p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <p className=" flex justify-center border border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition">
                      Supprimer
                    </p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        <div className=" flex justify-center mt-10">
          <NavLink to="/">
            <ButtonOrange className="pb-8">Retour à l'accueil</ButtonOrange>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
