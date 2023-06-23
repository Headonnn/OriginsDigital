import React from "react";
import { NavLink } from "react-router-dom";
import ButtonOrange from "./ButtonOrange";
import NavBar from "./NavBar/NavBar";

function CreateAccountProfile() {
  return (
    <>
      <NavBar />
      <div>
        <div className="Blackcontainer bg-black min-h-screen  p-5 pt-20 pb-20 relative overflow-hidden">
          <div className=" Congrats-container  max-h-[800px] overflow-auto p-8  bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-20 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
            <h2 className="text-3xl flex justify-center md:text-3xl pb-8 font-bold mt-10">
              Votre profil
            </h2>
            <p className="pb-8">Vos informations</p>
            <div className="justify-center">
              <NavLink to="/">
                <ButtonOrange className="pb-8">Retour à l'accueil</ButtonOrange>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccountProfile;
