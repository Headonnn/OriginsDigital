import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import NavBar from "../components/NavBar";
import ButtonOrange from "../components/ButtonOrange";

function AdminCarousselCustom() {
  const [sections] = useState([
    { id: "titre", icon: AiFillEdit, type: "section" },
  ]);

  const handleDelete = () => {
    // Logique pour supprimer la section
  };

  const handleAdd = () => {
    // Logique pour ajouter une nouvelle section
  };

  const handleSizeChange = () => {
    // Logique pour gérer le changement de taille
  };

  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start min-h-screen pt-10 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-8/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-4 sm:px-7 md:h-[6rem] md:px-6 md:py-6 flex items-center justify-center relative">
            <div className="absolute left-0 top-[50%] transform -translate-y-1/2">
              <Link to="/admin/section/access">
                <BiLeftArrow
                  className="text-xl mr-2"
                  style={{ color: "white" }}
                />
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <ButtonOrange
                className="w-full flex-grow"
                style={{ cursor: "default" }}
                disabled
              >
                <div className="flex items-center justify-center h-full">
                  Caroussel Custom
                </div>
              </ButtonOrange>
            </div>
          </div>

          <h1 className="text-white text-center font-poppins pt-10 sm:pt-16 underline">
            Liste des vidéos du caroussel :
          </h1>
          <div className="flex flex-col items-start justify-start pt-20 sm:pt-16 w-full px-14 sm:px-8 md:px-20 lg:px-32 gap-2">
            <div className="flex items-start justify-between w-full">
              <p>GP de monaco</p>
              <AiFillDelete
                className="text-white ml-2 cursor-pointer"
                onClick={() => handleDelete("monaco")} // Remplacez "monaco" par l'ID de la section
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <p>Lucarlsen vs popov chess.com</p>
              <AiFillDelete
                className="text-white ml-2 cursor-pointer"
                onClick={() => handleDelete("lucarlsen")} // Remplacez "lucarlsen" par l'ID de la section
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <p>Escalade</p>
              <AiFillDelete
                className="text-white ml-2 cursor-pointer"
                onClick={() => handleDelete("escalade")} // Remplacez "escalade" par l'ID de la section
              />
            </div>
          </div>
          <Link to="/admin/add/video" className="flex justify-center">
            <BsPlusCircle className="text-white text-5xl mt-16 cursor-pointer" />
          </Link>
          <div className="mt-14 flex items-center justify-center flex-wrap">
            <div className="flex items-center justify-center w-full px-10 sm:px-8 md:px-20 lg:px-32 gap-2">
              <label htmlFor="inputFieldName">Nom</label>
              <input
                type="text"
                id="inputFieldName"
                className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                placeholder={sections[0].id}
                aria-label={sections[0].id}
              />
            </div>
            <div className="flex items-center justify-center w-full px-10 sm:px-8 md:px-20 lg:px-32 gap-2 mt-6">
              <label htmlFor="selectSize">Taille</label>
              <select
                id="selectSize"
                className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md"
                onChange={handleSizeChange}
              >
                <option value="petit">Petit</option>
                <option value="moyen">Moyen</option>
                <option value="grand">Grand</option>
              </select>
            </div>
            <div className="flex items-center justify-center w-full px-10 sm:px-8 md:px-20 lg:px-32 gap-2 mt-6">
              <button
                type="button"
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md"
                onClick={handleAdd}
              >
                Validation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCarousselCustom;
