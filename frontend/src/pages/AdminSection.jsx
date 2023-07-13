import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";

function AdminSection() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const uploadSections = () => {
    fetch(`http://localhost:5002/sections`)
      .then((res) => res.json())
      .then((result) => setSections(result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    uploadSections();
  }, []);
  const handleDelete = (e, carouselCustomId, carouselCategoryId) => {
    e.preventDefault();
    if (carouselCustomId) {
      axios
        .delete(`http://localhost:5002/carousel_custom/${carouselCustomId}`)
        .then((res) => {
          console.warn(res.data);
          uploadSections();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(`http://localhost:5002/carousel_category/${carouselCategoryId}`)
        .then((res) => {
          console.warn(res.data);
          uploadSections();
        })
        .catch((err) => console.error(err));
    }
  };
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);
  const handleDragStart = (index) => {
    dragItem.current = index;
  };
  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };
  const handleSort = () => {
    const tempsections = [...sections];
    const draggedItemContent = tempsections.splice(dragItem.current, 1)[0];
    tempsections.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSections(tempsections);
  };
  useEffect(() => {
    sections.forEach((e, index) => {
      axios
        .put(`http://localhost:5002/sections/${e.id}`, { ordre: index + 1 })
        .then((res) => {
          console.warn(res.data);
        })
        .catch((err) => console.error(err));
    });
  }, [sections]);

  return (
    <>
      <NavBar />
      <div className="p-5 pt-20 pb-20">
        <div className="bg-gradient-to-br from-blue-900 mx-auto flex flex-col py-6 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7 max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between ">
            <div>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
              >
                Retour
              </button>
            </div>
            <div>
              <h2 className="text-lg text-center md:text-2xl ">
                Admin Homepage
              </h2>
            </div>
            <div className="flex justify-center">
              <Link to="/admin/section/access">
                <div
                  className="border hover:bg-white 
               tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
                >
                  Ajouter une section
                </div>
              </Link>
            </div>
          </div>

          <h1 className="text-white w-full px-7  font-poppins pt-6 underline">
            Modifiez la structure de la page d'accueil :
          </h1>
          <div className="mt-10 flex w-full  justify-center">
            <div className="flex flex-col ">
              <div className="flex items-center mt-4">
                <div className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1">
                  Hero
                </div>
                <Link to="/admin/hero">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
              </div>

              {sections.map((section, index) => (
                <div
                  className="flex items-center mt-4  cursor-grab"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault}
                  key={section.id}
                >
                  <div className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1">
                    {section.name ? section.name[0] : section.carousel.name}
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>

                  <div
                    role="presentation"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        section.carousel_custom_id,
                        section.carousel_category_id
                      )
                    }
                    onKeyDown={(e) =>
                      handleDelete(
                        e,
                        section.carousel_custom_id,
                        section.carousel_category_id
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 cursor-pointer ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSection;
