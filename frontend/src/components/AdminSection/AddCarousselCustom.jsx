import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import SearchVideos from "../SearchVideos";
import AddVideoCarousel from "./AddVideoCarousel";
import VideoContext from "../../../contexts/VideoContext";

function AddCarousselCustom() {
  const { dataVideo } = useContext(VideoContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [carousel, setCarousel] = useState({
    name: "",
    visibility: "all",
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

      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between items-center md:w-3/4 w-11/12">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/section/access")}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/section/access")}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <div>
              <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
                Carousel personnalisé
              </h2>
            </div>
          </div>

          <form>
            <div className="mt-6 flex flex-wrap">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="inputFieldName">Nom :</label>
                <input
                  type="text"
                  id="inputFieldName"
                  name="name"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  placeholder="Nom du caroussel..."
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
          <h3 className="mt-6">Videos :</h3>
          <SearchVideos handleSearchChange={handleSearchChange} />
          <div className="px-3">
            <AddVideoCarousel
              vidCarousel={vidCarousel}
              filtre={filtre}
              setVidCarousel={setVidCarousel}
            />
          </div>
          <div className="flex justify-center mt-12">
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

export default AddCarousselCustom;
