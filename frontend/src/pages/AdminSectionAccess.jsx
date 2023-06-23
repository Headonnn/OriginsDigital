import React from "react";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar/NavBar";

function AdminSectionAccess() {
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
              <Link to="/admin/section">
                <BiLeftArrow
                  className="text-xl mr-2"
                  style={{ color: "white" }}
                />
              </Link>
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

            <button
              type="button"
              className="bg-gradient-to-r from-white hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-14 w-80 h-16  cursor-pointer"
            >
              Caroussel catégorie
            </button>
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
