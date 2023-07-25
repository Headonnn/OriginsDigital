import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";

function AddSection() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between items-center md:w-8/12 w-10/12 mb-10">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/section")}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/section")}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
              Ajouter une section
            </h2>
          </div>
          <div className="flex flex-col items-stretch gap-6 md:space-y-10 text-white max-w-screen-md mx-auto mb-8">
            <div>
              <Link
                to="/admin/caroussel/custom"
                className="flex justify-center my-2"
              >
                <button
                  type="button"
                  className="text-sm md:text-lg  font-semibold duration-300 mb-6 w-full bg-black  text-white border border-gray-200 py-6 px-8 shadow-lg cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
                >
                  Caroussel personnalisé
                </button>
              </Link>
              <Link
                to="/admin/caroussel/category"
                className="flex justify-center my-2"
              >
                <button
                  type="button"
                  className="text-sm md:text-lg  font-semibold duration-300 mb-6 w-full bg-black  text-white border border-gray-200 py-6 px-8 shadow-lg cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
                >
                  Caroussel de catégorie
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSection;
