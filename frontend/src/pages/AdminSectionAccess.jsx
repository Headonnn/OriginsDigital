import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar/NavBar";

function AdminSectionAccess() {
  const navigate = useNavigate();

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
          <div className="text-lg text-center md:text-2xl">Admin HomePage</div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-center font-poppins underline py-8">
            Choix de la section à créer :
          </h1>
          <div className="w-full flex items-center justify-center flex-grow">
            <div className="w-full max-w-xs">
              <Link
                to="/admin/caroussel/custom"
                className="flex justify-center my-2"
              >
                <ButtonOrange className="w-full rounded-sm flex-shrink-0">
                  Caroussel custom
                </ButtonOrange>
              </Link>
              <Link
                to="/admin/caroussel/category"
                className="flex justify-center my-2"
              >
                <ButtonOrange className="w-full rounded-sm flex-shrink-0">
                  Caroussel catégorie
                </ButtonOrange>
              </Link>
              <Link to="/admin/pub" className="flex justify-center my-2">
                <ButtonOrange className="w-full rounded-sm flex-shrink-0">
                  Pub
                </ButtonOrange>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSectionAccess;
