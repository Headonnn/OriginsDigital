import React from "react";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";

function AdminSectionAccess() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-10 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7 w-full md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between relative">
            <div className="px-7  w-full md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between ">
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
                >
                  Retour
                </button>
              </div>
              <div>
                <h2 className="text-lg text-center md:text-2xl ">
                  Admin HomePage
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center pt-20">
            <h1 className="text-white text-center font-poppins  underline">
              Choix de la section à créer :
            </h1>
            <Link to="/admin/caroussel/custom" className="flex justify-center">
              <button
                type="button"
                className="bg-gradient-to-r from-white hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-14 w-80 h-16  cursor-pointer"
              >
                Caroussel custom
              </button>
            </Link>
            <Link
              to="/admin/caroussel/category"
              className="flex justify-center"
            >
              <button
                type="button"
                className="bg-gradient-to-r from-white hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-14 w-80 h-16  cursor-pointer"
              >
                Caroussel catégorie
              </button>
            </Link>
            <button
              type="button"
              className="bg-gradient-to-r from-white hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-14 w-80 h-16  cursor-pointer"
            >
              Pub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSectionAccess;
