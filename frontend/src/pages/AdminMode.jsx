import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import NavBar from "../components/NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";

function AdminMode() {
  const { dataLogin } = useContext(LoginContext);

  return dataLogin?.is_admin ? (
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
  ) : (
    <>
      <NavBar />
      <div className="min-h-screen p-5 relative overflow-hidden">
        <div className="relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 text-white">
          <h2 className="text-3xl flex justify-center md:text-3xl pb-8 font-bold mt-10">
            ACCES REFUSE
          </h2>
          <p className="pb-8">Vous n'êtes pas admin</p>
          <NavLink to="/">
            <button
              type="button"
              className="border hover:bg-white tracking-wide lg:block hidden hover:text-black py-2 px-6 transition"
            >
              j'avoue
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMode;
