import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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

      <Footer />
    </div>
  );
}

export default Decouvrir;
