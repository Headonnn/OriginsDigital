import React, { useState, useEffect } from "react";
import { BsPlusCircle } from "react-icons/bs";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
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
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900  mx-auto relative flex flex-col items-center justify-start h-screen pt-10 sm:w-10/12 lg:w-9/12 xl:w-10/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7  w-full md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between ">
            <div>
              <h2 className="text-lg text-center md:text-2xl ">
                Admin Homepage
              </h2>
            </div>
            <div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
              >
                Retour
              </button>
            </div>
          </div>

          <h1 className="text-white w-full px-7  font-poppins pt-6 underline">
            Modifiez la structure de la page d'accueil :
          </h1>
          <div className="mt-10">
            <div className="flex flex-col mt-4">
              <div className="flex items-center mt-4">
                <div className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1">
                  Hero
                </div>
                <AiFillEdit className="text-blue-500 ml-2 cursor-pointer" />
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
                  <AiFillEdit
                    id={section.id}
                    className="text-blue-500 ml-2 cursor-pointer"
                  />
                  <AiFillDelete
                    id={section.id}
                    onClick={(e) =>
                      handleDelete(
                        e,
                        section.carousel_custom_id,
                        section.carousel_category_id
                      )
                    }
                    className="text-red-500 ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link to="/admin/section/access" className="flex justify-center">
              <BsPlusCircle className="text-white text-5xl mt-16 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSection;
