import React from "react";
import { useNavigate } from "react-router-dom";
import AddVideo from "../components/AdminSection/AddVideo";
import NavBar from "../components/NavBar/NavBar";

function AdminHero() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="p-5 pt-20 pb-20">
        <div className="bg-gradient-to-br from-blue-900 mx-auto flex flex-col py-6 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px] px-6">
          <div className="   md:h-[6rem] flex items-center justify-between w-full ">
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
              <h2 className="text-lg text-center md:text-2xl ">Admin Hero</h2>
            </div>
          </div>

          <AddVideo />
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHero;
