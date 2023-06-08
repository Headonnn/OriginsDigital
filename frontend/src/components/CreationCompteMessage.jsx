import React from "react";
import { BsArrowRight } from "react-icons/bs";

function CreationCompteMessage() {
  return (
    <div className="bg-black c-white">
      <h2 className="text-3xl md:text-3xl font-bold mt-10">
        Création du compte
      </h2>
      <div className="rounded-lg bg-gradient-to-r from-blue-900 from 80% via-blue-800 via 90% to-blue-200 to 97%">
        <p>
          Félicitations ! Votre compte à été créé avec succès. Nous sommes ravis
          de vous accueillir dans notre communauté. Votre inscription est
          désormais terminée et vous êtes prêt.e à découvrir toutes les
          fonctionnalités passionnantes de notre site web. Nous vous souhaitons
          une expérience agréable et enrichissante. Si vous avez des questions
          ou besoin d'aide, n'hésitez pas à contacter notre équipe de support
          qui se fera un plaisir de vous aider. Commencez dès maintenant à
          explorer notre site web en cliquant sur le bouton ci-dessous et
          profitez de tout ce que nous avons à offrir !
        </p>

        <button
          type="button"
          className="bg-gradient-to-r from-orange-600 to-orange-400 c-white cursor-pointer"
        >
          {" "}
          Se connecter <BsArrowRight />
        </button>
      </div>
    </div>
  );
}

export default CreationCompteMessage;
