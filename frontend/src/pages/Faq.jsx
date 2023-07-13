import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Faq() {
  const navigate = useNavigate();
  const [isAnswerVisible1, setIsAnswerVisible1] = useState(false);
  const [isAnswerVisible2, setIsAnswerVisible2] = useState(false);
  const [isAnswerVisible3, setIsAnswerVisible3] = useState(false);
  const [isAnswerVisible4, setIsAnswerVisible4] = useState(false);
  const [isAnswerVisible5, setIsAnswerVisible5] = useState(false);

  const toggleAnswerVisibility1 = () => {
    setIsAnswerVisible1((prevValue) => !prevValue);
  };

  const toggleAnswerVisibility2 = () => {
    setIsAnswerVisible2((prevValue) => !prevValue);
  };

  const toggleAnswerVisibility3 = () => {
    setIsAnswerVisible3((prevValue) => !prevValue);
  };

  const toggleAnswerVisibility4 = () => {
    setIsAnswerVisible4((prevValue) => !prevValue);
  };

  const toggleAnswerVisibility5 = () => {
    setIsAnswerVisible5((prevValue) => !prevValue);
  };

  return (
    <>
      <NavBar />
      <div className="bg-gradient-to-br from-blue-900 my-4 to-022340 mx-auto sm:w-10/12 lg:w-9/12 xl:w-10/12 flex flex-col px-6 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <div className="px-7 w-full md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between relative">
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
            >
              Retour
            </button>
          </div>
          <div className="text-lg text-center md:text-2xl">FAQ</div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 rounded cursor-pointer"
                onClick={toggleAnswerVisibility1}
              >
                <h2 className="text-xl">
                  Dois-je m'inscrire pour accéder aux vidéos sportives ?
                </h2>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 transform ${
                    isAnswerVisible1 ? "rotate-180" : ""
                  } hover:text-orange-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isAnswerVisible1 && (
                <div className="p-4">
                  <p>
                    Non, vous n'avez pas besoin de vous inscrire pour accéder aux vidéos sportives sur notre site. Elles sont disponibles gratuitement pour tous les utilisateurs.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 rounded cursor-pointer"
                onClick={toggleAnswerVisibility2}
              >
                <h2 className="text-xl">
                  Quels sont les avantages de la création d'un compte ?
                </h2>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 transform ${
                    isAnswerVisible2 ? "rotate-180" : ""
                  } hover:text-orange-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isAnswerVisible2 && (
                <div className="p-4">
                  <p>
                    En créant un compte personnel sur notre site, vous pouvez profiter de fonctionnalités supplémentaires telles que la possibilité de marquer vos vidéos préférées et de les ajouter à votre liste de favoris pour un accès ultérieur. Cela vous permet de garder une trace de vos contenus préférés et de les retrouver facilement.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 rounded cursor-pointer"
                onClick={toggleAnswerVisibility3}
              >
                <h2 className="text-xl">
                  Quels types de vidéos sportives sont disponibles ?
                </h2>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 transform ${
                    isAnswerVisible3 ? "rotate-180" : ""
                  } hover:text-orange-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isAnswerVisible3 && (
                <div className="p-4">
                  <p>
                    Nous proposons une vaste collection de vidéos sportives couvrant différents sports. Vous pourrez trouver des moments forts, des analyses de matchs, des interviews d'athlètes et bien plus encore. Nous nous efforçons de fournir un large éventail de contenus pour satisfaire tous les passionnés de sport.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 rounded cursor-pointer"
                onClick={toggleAnswerVisibility4}
              >
                <h2 className="text-xl">
                  Puis-je contrôler qui peut accéder aux vidéos ?
                </h2>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 transform ${
                    isAnswerVisible4 ? "rotate-180" : ""
                  } hover:text-orange-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isAnswerVisible4 && (
                <div className="p-4">
                  <p>
                    Oui, en tant qu'administrateur du site, nous avons mis en place des options de contrôle d'accès. Vous pouvez choisir de rendre les vidéos publiques, accessibles à tous les utilisateurs, ou de les réserver aux passionnés de sports inscrits uniquement. Cela vous permet de gérer la confidentialité et l'exclusivité des contenus.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 rounded cursor-pointer"
                onClick={toggleAnswerVisibility5}
              >
                <h2 className="text-xl">
                  Le site est-il compatible avec les appareils mobiles ?
                </h2>
                <svg
                  className={`w-6 h-6 transition-transform duration-300 transform ${
                    isAnswerVisible5 ? "rotate-180" : ""
                  } hover:text-orange-500`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {isAnswerVisible5 && (
                <div className="p-4">
                  <p>
                    Oui, nous avons développé le site en adoptant une approche centrée sur les appareils mobiles. Cela garantit une expérience utilisateur optimale, que vous utilisiez un smartphone, une tablette ou un ordinateur de bureau. Vous pourrez profiter de la plateforme de streaming sportif où que vous soyez.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
