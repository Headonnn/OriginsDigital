import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import VideoContext from "../../../contexts/VideoContext";
import SearchVideos from "../SearchVideos";

function ManageHero() {
  const navigate = useNavigate();
  const { dataVideo } = useContext(VideoContext);
  const [inHero, setInHero] = useState("");

  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState([]);

  const checkHero = () => {
    if (dataVideo.length !== 0) {
      setInHero(dataVideo.filter((e) => e.is_in_hero === 1)[0].id);
    }
  };
  useEffect(() => {
    checkHero();
  }, [dataVideo]);
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
  }, [search, dataVideo, inHero]);

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
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between items-center mb-4 md:w-3/5 w-9/12">
            <div>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <div>
              <h2 className=" text-2xl md:text-4xl font-extrabold">
                Admin Hero
              </h2>
            </div>
          </div>
          <h1 className="text-white w-full py-6">
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
                <tbody className="">
                  {filtre.map((video) => {
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
                  })}
                </tbody>
              </table>
            </form>
          </div>
          <div className="flex justify-center my-8">
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

export default ManageHero;
