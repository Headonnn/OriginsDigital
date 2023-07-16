import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import VideoContext from "../../contexts/VideoContext";
import SearchVideos from "../components/SearchVideos";

function AdminHero() {
  const navigate = useNavigate();
  const { dataVideo } = useContext(VideoContext);
  const [inHero, setInHero] = useState(
    dataVideo.filter((e) => e.is_in_hero === 1)[0].id
  );
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState([]);
  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };
  const handleHero = (id) => {
    setInHero(id);
  };
  useEffect(() => {
    const dataTemp = dataVideo;
    const filteredVideo = dataTemp.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltre(filteredVideo);
  }, [search, dataVideo]);
  const videoDetails = filtre.map((video) => {
    return (
      <tr
        className="hover:bg-gray-50  hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>{video.title}</td>
        <td className="text-sm text-right">
          <input
            type="radio"
            id={video.id}
            checked={video.id === inHero}
            name={video.title}
            onChange={() => handleHero(video.id)}
          />
        </td>
        <td />
      </tr>
    );
  });

  const handleValidate = async () => {
    await axios.put(
      `http://Localhost:5002/videos/${
        dataVideo.filter((e) => e.is_in_hero === 1)[0].id
      }/hero`,
      { isHero: false }
    );
    await axios.put(`http://Localhost:5002/videos/${inHero}/hero`, {
      isHero: true,
    });
    navigate(-1);
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
              <h2 className="text-lg text-center md:text-2xl ">Admin Hero</h2>
            </div>
          </div>
          <h1 className="text-white w-full px-7  font-poppins pt-6 underline">
            Choisissez la vidéo du héro :
          </h1>
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
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md"
              onClick={handleValidate}
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHero;
