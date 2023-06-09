import React from "react";
import { NavLink } from "react-router-dom";
import ButtonOrange from "./ButtonOrange";
import NavBar from "./NavBar";
import Footer from "./Footer";

function CreateAccountMsg() {
  return (
    <>
      <NavBar />
      <div className="Blackcontainer bg-black min-h-screen  p-5 pt-20 pb-20 relative overflow-hidden">
        <div className=" Congrats-container  max-h-[800px] overflow-auto p-8  bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-20 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <h2 className="text-3xl flex justify-center md:text-3xl pb-8 font-bold mt-10">
            Félicitations !
          </h2>
          <p className="pb-8">
            Votre compte à été créé avec succès. Nous sommes ravis de vous
            accueillir dans notre communauté. Votre inscription est désormais
            terminée et vous êtes prêt.e à découvrir toutes les fonctionnalités
            passionnantes de notre site web. Nous vous souhaitons une expérience
            agréable et enrichissante. Si vous avez des questions ou besoin
            d'aide, n'hésitez pas à contacter notre équipe de support qui se
            fera un plaisir de vous aider. Commencez dès maintenant à explorer
            notre site web en cliquant sur le bouton ci-dessous et profitez de
            tout ce que nous avons à offrir !
          </p>
          <div className="justify-center">
            <NavLink to="/CreateAccountProfile">
              <ButtonOrange className="flex items-center mx-auto w-full">
                Se connecter
              </ButtonOrange>
            </NavLink>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreateAccountMsg;
