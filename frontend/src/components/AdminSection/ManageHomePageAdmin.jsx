import React, { useState, useEffect } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../../contexts/ApiContext";
import NavBar from "../NavBar/NavBar";

function ManageHomePageAdmin() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [vis, setVis] = useState("all");
  const handleVis = (e) => {
    setVis(e.target.value);
  };
  const uploadSections = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/sections`)
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
      ApiContext.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/carousel_custom/${carouselCustomId}`
      )
        .then(() => uploadSections())
        .catch((err) => console.error(err));
    } else {
      ApiContext.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/carousel_category/${carouselCategoryId}`
      )
        .then(() => uploadSections())
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
      ApiContext.put(`${import.meta.env.VITE_BACKEND_URL}/sections/${e.id}`, {
        ordre: index + 1,
      }).catch((err) => console.error(err));
    });
  }, [sections]);

  return (
    <>
      <NavBar />
      <div className="max-w-screen-lg mx-auto my-12 ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between items-center md:w-3/4 w-11/12 pb-12">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/")}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/")}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
              Gérer la page d'accueil
            </h2>
          </div>
          <div className="flex items-end w-full justify-between">
            <div className="text-black ">
              <h1 className="text-white">Visible par : </h1>

              <select name="visibility" onChange={handleVis}>
                <option id="all" value="all">
                  ...
                </option>
                <option id="connected" value="connected">
                  Utilisateurs connectés
                </option>
                <option id="disconnected" value="disconnected">
                  Utilisateurs déconnectés
                </option>
              </select>
            </div>
            <div>
              <button
                type="button"
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-2 px-3 transition"
              >
                <Link to="/admin/section/access">Ajouter une section</Link>
              </button>
              <button
                type="button"
                className="md:hidden border  hover:bg-white tracking-wide hover:text-black py-2 px-2 transition"
              >
                <Link to="/admin/section/access">
                  <AiOutlinePlus />
                </Link>
              </button>
            </div>
          </div>

          <h3 className="text-white w-full text-sm md:text-lg pt-12 ">
            <span className="font-semibold">Drag and drop :</span> modifiez la
            structure de la page d'accueil.
          </h3>
          <div className="flex gap-10">
            <div className="mt-10 flex w-full md:w-2/3">
              <div className=" w-full">
                <div className="flex items-center mr-8 ">
                  <div className="bg-white text-black h-10 px-4 py-2 w-full rounded-md mb-1">
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

                {sections
                  .filter((e) =>
                    vis !== "all"
                      ? e.visibility === vis || e.visibility === "all"
                      : e
                  )
                  .map((section, index) => (
                    <div
                      className="flex items-center mt-4  cursor-grab "
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onTouchStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleSort}
                      onTouchEnd={handleSort}
                      onDragOver={(e) => e.preventDefault}
                      key={section.id}
                    >
                      <div className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1">
                        {section.name ? section.name[0] : section.carousel.name}
                      </div>

                      <Link
                        to={
                          section.carousel_custom_id
                            ? `/admin/edit/carousel/${section.carousel.id}`
                            : `/admin/edit/carousel_cat/${section.carousel.id}`
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </Link>
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
      </div>
    </>
  );
}

export default ManageHomePageAdmin;
