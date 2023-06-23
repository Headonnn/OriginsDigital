import React, { useState, useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiLeftArrow } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

import ButtonOrange from "../components/ButtonOrange";

function AdminSection() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/sections`)
      .then((res) => res.json())
      .then((result) => setSections(result))
      .catch((error) => console.error(error));
  }, []);

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
              <Link to="/admin/">
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

          <h1 className="text-white text-center font-poppins pt-6 underline">
            Liste des sections du site
          </h1>
          <div className="mt-10">
            <div className="flex flex-col mt-4">
              <div className="flex items-center mt-4">
                <div className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1">
                  Hero
                </div>
                <AiFillEdit className="text-blue-500 ml-2 cursor-pointer" />
              </div>

              {sections.map((section) => (
                <div className="flex items-center mt-4">
                  <div
                    key={section.id}
                    className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                  >
                    {section.title}
                  </div>
                  <AiFillEdit className="text-blue-500 ml-2 cursor-pointer" />
                  <AiFillDelete className="text-red-500 ml-2 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link to="/admin/section/access" className="flex justify-center">
              <BsPlusCircle className="text-white text-5xl mt-16 cursor-pointer" />
            </Link>
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md mt-8"
          >
            Validation
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSection;
