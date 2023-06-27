import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BsInfoCircle,
  BsPlayCircle,
  BsPlusCircle,
  BsCheckCircle,
} from "react-icons/bs";
import axios from "axios";
import PropTypes from "prop-types";
import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";

function Decouvrir({ isMaListe }) {
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState([]);
  const [filtreCategorie, setFiltreCategorie] = useState("");

  const [dataFavorites, setDataFavorites] = useState([]);
  const { dataVideo, setDataVideo } = useContext(VideoContext);

  const fetchFavorites = () => {
    axios
      .get(`http://localhost:5002/favorites/2`)
      .then((res) => {
        setDataFavorites(res.data);
        console.warn(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("pas de favorites pour cet user");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  };
  const handleAddToList = (clickedVideo) => {
    if (!dataFavorites.includes(parseInt(clickedVideo, 10))) {
      axios
        .post(`http://localhost:5002/favorites/add`, {
          userId: 2,
          videoId: clickedVideo,
        })
        .then(() => {
          setDataFavorites([...dataFavorites, clickedVideo]);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(`http://localhost:5002/favorites/2/${clickedVideo}`)
        .then(() => {
          let tmp = [...dataFavorites];
          tmp = tmp.filter((vid) => vid !== clickedVideo);
          setDataFavorites(tmp);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeCategory = (e) => {
    setFiltreCategorie(e.target.value);
  };

  useEffect(() => {
    let filteredVideo = dataVideo.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    console.warn(filteredVideo);
    console.warn(dataFavorites);
    if (isMaListe) {
      filteredVideo = filteredVideo.filter((e) => dataFavorites.includes(e.id));
    }
    console.warn("liste", filteredVideo);
    setIsFiltered(filteredVideo);
  }, [dataVideo, search, filtreCategorie, isMaListe, dataFavorites]);

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
        {isFiltered.length === 0 && (
          <div className="text-white">
            Aucune vidéo ne correspond à vos critères de recherche
          </div>
        )}
        {isFiltered.map((video) => {
          return (
            <div className="group" key={video.id}>
              <div className="w-60 hover:scale-110 transition text-white ">
                <Link to={`/description/${video.id - 1}`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg h-44 w-68"
                  />
                </Link>
                <div className="hidden group-hover:block group-hover:absolute bg-black transform bottom-0 bg-opacity-60 w-full ">
                  <div className="text-md">{video.title}</div>
                  <div className=" flex items-center text-2xl  w-1/2 gap-4 px-2 py-1 rounded-xl cursor-pointer transition">
                    <Link to={`/description/${video.id - 1}`}>
                      <BsInfoCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                    </Link>
                    <Link to={`/watch/${video.id - 1}`}>
                      <BsPlayCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAddToList(video.id)}
                    >
                      {!dataFavorites.includes(parseInt(video.id, 10)) ? (
                        <BsPlusCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                      ) : (
                        <BsCheckCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                      )}
                    </button>
                  </div>
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
Decouvrir.propTypes = {
  isMaListe: PropTypes.bool.isRequired,
};
export default Decouvrir;
