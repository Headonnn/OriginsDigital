import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";

function Decouvrir() {
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
    <div>
      <NavBar />
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
  );
}

export default Decouvrir;
