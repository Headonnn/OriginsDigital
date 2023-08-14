import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import api from "../../../contexts/api";
import NavBar from "../NavBar/NavBar";
import VideoContext from "../../../contexts/VideoContext";
import SearchVideos from "../SearchVideos";

function EditCarousel() {
  const navigate = useNavigate();
  const { dataVideo } = useContext(VideoContext);
  const [vidCarousel, setVidCarousel] = useState(undefined);
  const [sections, setSections] = useState([]);
  const [carousel, setCarousel] = useState({
    name: "",
    visibility: "",
  });
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState([]);
  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };
  useEffect(() => {
    const dataTemp = dataVideo;
    const filteredVideo = dataTemp.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltre(filteredVideo);
  }, [search, dataVideo]);
  const handleAdd = (e) => {
    const target = e.target.id;
    const { checked } = e.target;
    setVidCarousel({ ...vidCarousel, [target]: checked });
  };
  const handleInput = (e) => {
    e.persist();
    setCarousel({ ...carousel, [e.target.name]: e.target.value });
  };

  const params = useParams();
  const fetchSections = async () => {
    try {
      const data = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/sections`
      );
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
    if (sections.videos) {
      const section = sections.videos.map((video) => video.video_id);

      const baseVid = { [section[0]]: true };
      section.forEach((e) => {
        baseVid[e] = true;
      });

      setVidCarousel(baseVid);
      setCarousel({
        ...carousel,
        name: sections.carousel.name,
        visibility: sections.visibility,
      });
    }
  }, [sections]);
  const videoDetails = filtre.map((video) => {
    let check = false;
    if (vidCarousel) {
      let selected = Object.entries(vidCarousel).filter((el) => el[1] === true);
      selected = selected.map((el) => parseInt(el[0], 10));
      check = !!selected.includes(video.id);
    }

    return (
      <tr
        className="hover:bg-gray-50  hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>{video.title}</td>
        <td className="text-sm text-right">
          <input
            type="checkbox"
            id={video.id}
            name={video.title}
            onChange={(e) => handleAdd(e)}
            checked={check}
          />
        </td>
        <td />
      </tr>
    );
  });

  const handleSub = async (e) => {
    e.preventDefault();
    const data = { name: carousel.name };
    const dataVis = { visibility: carousel.visibility };
    await api
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/carousel_custom/${
          sections.carousel.id
        }`,
        data
      )
      .catch((err) => console.error(err));
    await api
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/sections/${
          sections.id
        }/visibility`,
        dataVis
      )
      .catch((err) => console.error(err));
    await api
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/videos_carousel/${
          sections.carousel.id
        }`
      )
      .catch((err) => console.error(err));

    let selected = Object.entries(vidCarousel).filter((el) => el[1] === true);
    selected = selected.map((el) => parseInt(el[0], 10));
    let vidToPost = [];
    vidToPost = selected.map((el) => ({
      ...vidToPost,
      videoId: el,
      carouselId: sections.carousel.id,
    }));

    vidToPost.forEach((el) => {
      api
        .post(`${import.meta.env.VITE_BACKEND_URL}/videos_carousel`, el)
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
          <div className="flex justify-between items-center mb-4 md:w-5/6 w-full">
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
            <h2 className=" text-lg md:text-4xl font-extrabold text-center ">
              Modifier un caroussel personnalisé
            </h2>
          </div>

          <form>
            <div className="mt-6 flex flex-wrap ">
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="inputFieldName">Nom :</label>
                <input
                  type="text"
                  id="inputFieldName"
                  name="name"
                  className="bg-white text-black w-full  h-10 px-4 py-2 rounded-md mb-1"
                  placeholder="nom du carousel"
                  onChange={handleInput}
                  value={carousel.name}
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
          </form>
          <div className="flex gap-2 items-end">
            <h1 className="text-white   font-poppins   pt-10 ">Videos :</h1>
          </div>
          <SearchVideos handleSearchChange={handleSearchChange} />
          <div className="    w-full gap-2">
            <form>
              <table className=" text-left w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-lg">ID</th>
                    <th className="px-6 py-4 text-lg">Titre</th>
                  </tr>
                </thead>
                <tbody className="">{videoDetails}</tbody>
              </table>
            </form>
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

export default EditCarousel;
