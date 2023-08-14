import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function AdminMode() {
  return (
    <div>
      <NavBar />
      <section className="px-6 md:px-8 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="mb-4 text-2xl md:text-4xl font-extrabold text-center mt-12">
            Mode Administrateur
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center md:text-xl text-md">
            En tant qu'administrateur, vous pouvez gérer les sections suivantes:
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-6 md:space-y-10 text-white max-w-screen-md mx-auto mb-8">
          <div className="md:flex justify-between">
            <Link to="/admin/video_list" className="w-2/5">
              <button
                type="button"
                className="text-sm md:text-lg font-semibold duration-300 mb-6 w-full bg-black text-white border border-gray-200 py-6 px-8 shadow-lg cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
              >
                Gérer les vidéos
              </button>
            </Link>
            <Link to="/admin/category_list" className="w-2/5">
              <button
                type="button"
                className="text-sm md:text-lg font-semibold duration-300 w-full bg-black text-white border border-gray-200 shadow-lg py-6 px-8 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
              >
                Gérer les catégories
              </button>
            </Link>
          </div>
          <div className="md:flex w-full justify-between">
            <Link to="/admin/section" className="w-2/5">
              <button
                type="button"
                className="text-sm md:text-lg font-semibold duration-300 mb-6 w-full bg-black text-white border border-gray-200 shadow-lg py-6 px-8 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
              >
                Gérer la page d'accueil
              </button>
            </Link>
            <Link to="/admin/user_list" className="w-2/5">
              <button
                type="button"
                className="text-sm md:text-lg font-semibold duration-300 w-full bg-black text-white border border-gray-200 shadow-lg py-6 px-8 cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
              >
                Gérer les utilisateurs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminMode;
