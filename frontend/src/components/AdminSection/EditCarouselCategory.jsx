import React, { useContext, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import VideoContext from "../../../contexts/VideoContext";
import NavBar from "../NavBar/NavBar";

function EditCarouselCategory() {
  const params = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState(undefined);
  const { categorie } = useContext(VideoContext);

  const [carousel, setCarousel] = useState({ category: "", max_number: 0 });

  const handleInput = (e) => {
    e.persist();
    setCarousel({ ...carousel, [e.target.name]: e.target.value });
  };
  const fetchSections = async () => {
    try {
      const data = await axios.get(`http://localhost:5002/sections`);
      const section = data.data.filter(
        (e) => e.carousel.id === parseInt(params.id, 10)
      )[0];

      setSections(section);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (sections) {
      const init = {
        category: sections.carousel.category_id,
        max_number: sections.carousel.max_number,
        visibility: sections.visibility,
      };

      setCarousel(init);
    }
  }, [sections]);
  const handleSub = async (e) => {
    e.preventDefault();

    const data = {
      category: carousel.category,
      maxNumber: carousel.max_number,
    };

    await axios
      .put(`http://localhost:5002/carousel_category/${params.id}`, data)

      .catch((err) => console.warn(err));

    const dataVis = {
      visibility: carousel.visibility,
    };
    await axios
      .put(`http://localhost:5002/sections/${sections.id}/visibility/`, dataVis)

      .catch((err) => console.warn(err));
    navigate("/admin/section");
  };

  return (
    <>
      <NavBar />
      <div className="p-5 pt-20 pb-20">
        <div className="bg-gradient-to-br from-blue-900 my-10 flex flex-col px-6 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-7 max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center justify-between ">
            <div className="   md:h-[6rem] flex items-center justify-between ">
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
            <div>
              <h2 className="text-lg text-center md:text-2xl ">
                Carousel par catégories
              </h2>
            </div>
          </div>

          <form>
            <div className="mt-6 px-3 md:px-6  flex-col justify-center flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="inputFieldName">Catégorie :</label>
                <select
                  name="category"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  onChange={handleInput}
                  value={carousel.category}
                >
                  {categorie.map((e) => (
                    <option name="category" value={e.id} id={e.id}>
                      {e.name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="inputFieldName">Nombre max de vidéos :</label>
                <input
                  type="text"
                  name="max_number"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  onChange={handleInput}
                  value={carousel.max_number}
                />
              </div>
              <div className=" flex flex-col">
                <div className="flex w-full flex-col ">
                  <label htmlFor="inputFieldName">Visibilité :</label>
                  <select
                    name="visibility"
                    className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                    onChange={handleInput}
                    value={carousel.visibility}
                  >
                    <option name="visibility" id="visibility" value="all">
                      Tous les utilisateurs
                    </option>
                    <option name="visibility" id="visibility" value="connected">
                      Utilisateurs connectés
                    </option>
                    <option
                      name="visibility"
                      id="visibility"
                      value="disconnected"
                    >
                      Utilisateurs non connectés
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </form>

          <div className="flex  mt-4 ml-8 justify-center">
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

export default EditCarouselCategory;
