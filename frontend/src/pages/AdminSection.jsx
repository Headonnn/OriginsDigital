import React, { useState } from "react";
import { BsArrowLeft, BsPlusCircle } from "react-icons/bs";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ButtonOrange from "../components/ButtonOrange";

function AdminSection() {
  const [sections] = useState([
    { id: "hero", icon: AiFillEdit, type: "section" },
    { id: "caroussel1", icon: AiFillEdit, type: "section" },
    { id: "caroussel2", icon: AiFillEdit, type: "section" },
    { id: "pub", icon: AiFillEdit, type: "section" },
    { id: "caroussel_categorie", icon: AiFillEdit, type: "section" },
  ]);

  const handleDelete = () => {
    // Logique pour supprimer la section
  };

  const handleEdit = () => {
    // Logique pour éditer la section
  };

  const handleAdd = () => {
    // Logique pour ajouter une nouvelle section
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
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-10 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7 max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center justify-center relative">
            <div className="absolute left-0 top-[50%] transform -translate-y-1/2">
              <BsArrowLeft className="text-white w-5 h-5 md:w-6 md:h-6 font-bold cursor-pointer" />
            </div>

            <div className="flex items-center justify-center ">
              <ButtonOrange
                className="w-full flex-grow"
                style={{ cursor: "default" }}
                disabled
              >
                <div className="flex items-center justify-center h-full">
                  Administration des sections
                </div>
              </ButtonOrange>
            </div>
          </div>

          <h1 className="text-white text-center font-poppins pt-6 underline">
            Liste des sections par ordre
          </h1>
          <div className="mt-10">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center mt-4">
                <input
                  type="text"
                  className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                  placeholder={section.id}
                  aria-label={section.id}
                />
                <AiFillEdit
                  className="text-blue-500 ml-2 cursor-pointer"
                  onClick={() => handleEdit(section.id)}
                />
                <AiFillDelete
                  className="text-red-500 ml-2 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <BsPlusCircle className="text-white text-5xl mt-16 cursor-pointer" />
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-8"
            onClick={handleAdd}
          >
            Validation
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminSection;