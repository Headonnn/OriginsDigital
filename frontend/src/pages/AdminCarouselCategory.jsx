import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import VideoContext from "../../contexts/VideoContext";
import NavBar from "../components/NavBar/NavBar";

function AdminCarouselCategory() {
  const navigate = useNavigate();
  const { categorie } = useContext(VideoContext);

  const [carousel, setCarousel] = useState(undefined);

  const handleInput = (e) => {
    e.persist();
    setCarousel({ ...carousel, [e.target.name]: e.target.value });
  };

  const handleSub = async (e) => {
    e.preventDefault();

    const data = {
      category: carousel.category,
      maxNumber: carousel.max_number,
    };
    let section = { carousel_category_id: null, ordre: null };
    await axios
      .post(`http://localhost:5002/carousel_category`, data)
      .then((res) => {
        section = { ...section, carousel_category_id: res.data.insertId };
      })
      .catch((err) => console.warn(err));

    await axios
      .get(`http://localhost:5002/sections/ordre`)
      .then((res) => {
        section = { ...section, ordre: res.data[0][res.data.length].ordre + 1 };
      })
      .catch((err) => console.warn(err));
    if (!section.ordre) {
      section.ordre = 2;
    }
    const dataSec = {
      ordre: section.ordre,
      carouselCategoryId: section.carousel_category_id,
      title: "categorie",
    };
    await axios
      .post(`http://localhost:5002/sections/category`, dataSec)

      .catch((err) => console.warn(err));

    navigate("/admin/section");
  };

  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col p-10 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-8/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-4 sm:px-7 md:h-[6rem] md:px-6 md:py-6 flex  justify-center relative">
            <div className="px-7  w-full md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between ">
              <div>
                <h2 className="text-lg text-center md:text-2xl ">
                  Carousel par catégories
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
          </div>

          <form>
            <div className="mt-14 flex justify-center flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="inputFieldName">Catégorie :</label>
                <select
                  name="category"
                  className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                  onChange={handleInput}
                >
                  {categorie.map((e) => (
                    <option name="category" value={e.id} id={e.id}>
                      {e.name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="inputFieldName">Max :</label>
                <input
                  type="text"
                  name="max_number"
                  className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                  onChange={handleInput}
                />
              </div>
            </div>
          </form>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md"
              onClick={handleSub}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCarouselCategory;
