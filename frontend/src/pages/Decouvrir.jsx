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
import LoginContext from "../../contexts/LoginContext";

function Decouvrir({ isMaListe }) {
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState([]);
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [dataFavorites, setDataFavorites] = useState([]);
  const { dataVideo, setDataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);

  const compareVideos = (a, b) => {
    if (a.is_freemium === 0 && b.is_freemium === 1) {
      return -1;
    }
    if (a.is_freemium === 1 && b.is_freemium === 0) {
      return 1;
    }
    return 0;
  };

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
    if (isMaListe) {
      filteredVideo = filteredVideo.filter((e) => dataFavorites.includes(e.id));
    }
    setIsFiltered(filteredVideo.sort(compareVideos));
  }, [dataVideo, search, filtreCategorie, isMaListe, dataFavorites]);

  useEffect(() => {
    if (filtreCategorie === "") {
      axios
        .get(`http://localhost:5002/videos`)
        .then((result) => setDataVideo(result.data.sort(compareVideos)))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`http://localhost:5002/videos/filtre/${filtreCategorie}`)
        .then((result) => {
          setDataVideo(result.data.sort(compareVideos));
        })
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
      <div className="flex justify-center gap-8 flex-wrap mt-5 mb-20">
        {isFiltered.length === 0 && (
          <div className="text-white">
            Aucune vidéo ne correspond à vos critères de recherche
          </div>
        )}
        {isFiltered.map((video) => {
          return (
            <div
              className={`${
                video.is_freemium && !dataLogin
                  ? "opacity-60 relative"
                  : "relative"
              }`}
              key={video.id}
            >
              <div className="w-60 hover:scale-110 transition text-white ">

                <Link to={`/description/${video.id}`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg h-44 w-68"
                  />
                </Link>


                <div className="flex flex-col justify-between absolute bg-black hover:h-full hover:justify-center p-1 duration-200 transform bottom-0 bg-opacity-60 text-white w-full h-1/2">
                  <div className="text-md pl-1">{video.title}</div>

                  {video.is_freemium && !dataLogin ? (
                    <div className=" flex items-center text-2xl  w-1/2 gap-4 px-2 py-1 rounded-xl cursor-pointer transition">
                      <BsInfoCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                      <BsPlayCircle className="hover:bg-white  hover:text-black hover:rounded-2xl" />
                      <BsPlusCircle className="hover:bg-white  hover:text-black hover:rounded-2xl" />
                    </div>
                  ) : (
                    <div className=" flex items-center text-2xl  w-1/2 gap-4 px-2 py-1 rounded-xl cursor-pointer transition">
                      <Link to={`/description/${video.id}`}>
                        <BsInfoCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                      </Link>
                      <Link to={`/watch/${video.id}`}>
                        <BsPlayCircle className="hover:bg-white  hover:text-black hover:rounded-2xl" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddToList(video.id)}
                      >
                        {!dataFavorites.includes(parseInt(video.id, 10)) ? (
                          <BsPlusCircle
                            id={video.id}
                            className="hover:bg-white  hover:text-black hover:rounded-2xl"
                          />
                        ) : (
                          <BsCheckCircle
                            id={video.id}
                            className="hover:bg-white  hover:text-black hover:rounded-2xl"
                          />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
