import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import NavBar from "../components/NavBar/NavBar";
import ButtonOrange from "../components/ButtonOrange";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";

function AdminAddVideo() {
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState([]);
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const { dataVideo, setDataVideo } = useContext(VideoContext);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeCategory = (e) => {
    setFiltreCategorie(e.target.value);
  };

  useEffect(() => {
    const filteredVideo = dataVideo.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );

    setIsFiltered(filteredVideo);
  }, [dataVideo, search, filtreCategorie]);

  useEffect(() => {
    if (filtreCategorie === "") {
      fetch(`http://localhost:5002/videos`)
        .then((res) => res.json())
        .then((result) => setDataVideo(result))
        .catch((error) => console.error(error));
    } else {
      fetch(`http://localhost:5002/videos/filtre/${filtreCategorie}`)
        .then((res) => res.json())
        .then((result) => setDataVideo(result))
        .catch((error) => console.error(error));
    }
  }, [setDataVideo, filtreCategorie]);

  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start min-h-screen pt-10 sm:w-10/12 md:w-9/12 lg:w-7/12 xl:w-8/12  shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-4 sm:px-7 md:h-[6rem] md:px-6 md:py-6 flex items-center justify-center relative">
            <div className="absolute left-0 top-[50%] transform -translate-y-1/2" />
            <Link to="/admin/caroussel/custom">
              <BiLeftArrow
                className="text-xl mr-2"
                style={{ color: "white" }}
              />
            </Link>
            <div className="flex items-center justify-center">
              <ButtonOrange
                className="w-full flex-grow"
                style={{ cursor: "default" }}
                disabled
              >
                <div className="flex items-center justify-center h-full">
                  Ajouter des vidéos
                </div>
              </ButtonOrange>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start pt-20 sm:pt-16 w-full px-14 sm:px-8 md:px-20 lg:px-32 gap-2" />
          <div className="mt-14 flex items-center justify-center flex-wrap">
            <div className="flex items-center justify-center w-full px-10 sm:px-8 md:px-20 lg:px-32 gap-2">
              <label htmlFor="inputFieldName">Filtre catégorie</label>
              <input
                type="text"
                id="inputFieldName"
                className="bg-white text-black w-full md:w-80 h-10 px-4 py-2 rounded-md mb-1"
                placeholder="Filtre catégorie"
                aria-label="Filtre catégorie"
              />
            </div>
            <div className="flex items-center justify-center w-full px-10 sm:px-8 md:px-20 lg:px-32 gap-2 mt-6">
              <label htmlFor="selectSize">Label for selectSize</label>
              {/* Add your select input component here */}
            </div>
          </div>
          <SearchBar
            handleSearchChange={handleSearchChange}
            handleChangeCategory={handleChangeCategory}
          />
          <div className="flex justify-center gap-12 flex-wrap my-5">
            {isFiltered.map((video) => {
              return (
                <div className="group">
                  <div
                    key={video.id}
                    className="w-60 hover:scale-110 transition text-white "
                  >
                    <h3>{video.title}</h3>
                    <Link to={`/description/${video.id - 1}`}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="rounded-lg h-44 w-68"
                      />
                    </Link>
                    <div className="hidden p-3 group-hover:block group-hover:absolute group-hover:bg-black">
                      <div className="flex justify-between items-center">
                        <p>Date : </p>
                        {video.date}
                        <p>Durée : </p>
                        {video.length}
                      </div>
                      {video.description}
                    </div>
                  </div>
                </div>
              );
            })}
            {isFiltered.map((video) => {
              return (
                <div key={video.id} className="w-60 hover:scale-105 transition">
                  <h3 className="text-white">{video.title}</h3>
                  <Link to={`/description/${video.id - 1}`}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="rounded-lg h-44 w-68"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddVideo;
