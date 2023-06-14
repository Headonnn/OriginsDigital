import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ButtonOrange from "../components/ButtonOrange";

function AdminUpload() {
  const [isPremium, setIsPremium] = useState(false);

  const handlePremiumChange = () => {
    setIsPremium(!isPremium);
  };

  const handleDelete = () => {
    // Logique pour supprimer la vidéo
  };

  return (
    <>
      <NavBar />
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
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start pt-16 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7 max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center justify-center relative">
            <button type="button" className="focus:outline-none cursor-pointer">
              <BsArrowLeft className="text-white w-5 h-5 md:w-6 md:h-6 font-bold mr-2" />
            </button>
            <ButtonOrange
              className="w-full flex-grow"
              style={{ cursor: "default" }}
              disabled
            >
              Administration des vidéos
            </ButtonOrange>
          </div>
          <h1 className="text-white text-center font-poppins pt-6 underline">
            Ajouter une vidéo
          </h1>
          <div className="flex flex-col items-center mt-6">
            <label htmlFor="videoLink" className="text-white">
              Lien de la vidéo
              <input
                id="videoLink"
                type="text"
                className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-4"
                placeholder="Lien de la vidéo"
                aria-label="Lien de la vidéo"
              />
            </label>

            <label htmlFor="videoTitle" className="text-white">
              Titre
            </label>
            <input
              id="videoTitle"
              type="text"
              className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-4"
              placeholder="Titre"
              aria-label="Titre"
            />
            <label htmlFor="videoCategories" className="text-white">
              Catégories
            </label>
            <input
              id="videoCategories"
              type="text"
              className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-4"
              placeholder="Catégories"
              aria-label="Catégories"
            />
            <label htmlFor="videoDescription" className="text-white">
              Description
            </label>
            <textarea
              id="videoDescription"
              className="bg-white text-black w-full md:w-80 h-40 px-4 py-2 rounded-md mb-4"
              placeholder="Description"
              aria-label="Description"
            />
            <div
              className={`flex items-center ${
                isPremium ? "text-green-500" : "text-red-500"
              }`}
            >
              <h2 className="text-white font-poppins font-bold mr-2 underline">
                Vidéo premium ?
              </h2>
              <div
                role="button"
                tabIndex={0}
                className={`w-4 h-4 rounded-full border-2 ${
                  isPremium
                    ? "bg-green-500 border-green-500"
                    : "bg-red-500 border-red-500"
                } cursor-pointer`}
                onClick={handlePremiumChange}
                onKeyPress={handlePremiumChange}
                aria-label="Toggle Premium"
              />
            </div>
            <button
              type="button"
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-6"
            >
              Ajouter
            </button>
            <hr className="bg-orange-500 h-1 w-full mt-6" />
            <h3 className="text-white text-center font-poppins underline pt-8">
              Supprimer une vidéo
            </h3>
            <AiFillDelete
              className={`text-white text-4xl mt-4 cursor-pointer h-20 ${
                isPremium ? "text-green-500" : ""
              }`}
              onClick={handleDelete}
              role="button"
              tabIndex={0}
              aria-label="Supprimer la vidéo"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminUpload;
