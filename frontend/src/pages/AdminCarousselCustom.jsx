import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import NavBar from "../components/NavBar/NavBar";
import SearchVideos from "../components/SearchVideos";
import AddVideo from "../components/AdminSection/AddVideo";
import VideoContext from "../../contexts/VideoContext";

function AdminCarousselCustom() {
  const { dataVideo } = useContext(VideoContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [carousel, setCarousel] = useState({
    name: "",
  });

  const [vidCarousel, setVidCarousel] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState([]);
  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };
  const handleInput = (e) => {
    e.persist();
    setCarousel({ ...carousel, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const dataTemp = dataVideo;
    const filteredVideo = dataTemp.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltre(filteredVideo);
  }, [search, dataVideo]);
  const handleSub = async (e) => {
    e.preventDefault();
    if (!carousel.name) {
      setError("*Ce champ est obligatoire");
      console.warn(error);
      return;
    }
    const data = {
      name: carousel.name,
    };
    let section = { carousel_custom_id: null, ordre: null };
    await axios
      .post(`http://localhost:5002/carousel_custom`, data)
      .then((res) => {
        section = { ...section, carousel_custom_id: res.data.insertId };
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
      carouselCustomId: section.carousel_custom_id,
      title: carousel.name,
      visibility: carousel.visibility,
    };
    await axios
      .post(`http://localhost:5002/sections/custom`, dataSec)

      .catch((err) => console.warn(err));
    let selected = Object.entries(vidCarousel).filter((el) => el[1] === true);
    selected = selected.map((el) => parseInt(el[0], 10));
    let vidToPost = [];
    vidToPost = selected.map((el) => ({
      ...vidToPost,
      videoId: el,
      carouselId: section.carousel_custom_id,
    }));

    vidToPost.forEach((el) => {
      axios
        .post(`http://localhost:5002/videos_carousel`, el)
        .then((res) => {
          console.warn(res.data);
        })
        .catch((err) => console.warn(err));
    });
    navigate("/admin/section");
  };

  return (
    <>
      <NavBar />

      <div className="p-5 pt-20 pb-20">
        <div className="bg-gradient-to-br from-blue-900 my-10 flex flex-col px-6 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
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
              <h2 className="text-lg text-center md:text-2xl ">
                Carousel personnalisé
              </h2>
            </div>
          </div>

          <form>
            <div className="mt-6 flex   flex-wrap">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="inputFieldName">Nom :</label>
                <input
                  type="text"
                  id="inputFieldName"
                  name="name"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  placeholder="nom du carousel"
                  aria-label=""
                  value={carousel.name}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="inputFieldName">Visibilité :</label>
                <select
                  name="visibility"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  onChange={handleInput}
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
          </form>

          <div className="flex gap-2 items-end">
            <h1 className="text-white   font-poppins mt-6  ">Videos :</h1>
          </div>
          <SearchVideos handleSearchChange={handleSearchChange} />
          <AddVideo
            vidCarousel={vidCarousel}
            filtre={filtre}
            setVidCarousel={setVidCarousel}
          />
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

export default AdminCarousselCustom;
