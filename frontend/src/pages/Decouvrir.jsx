import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsInfoCircle,
  BsPlayCircle,
  BsPlusCircle,
  BsCheckCircle,
} from "react-icons/bs";

import axios from "axios";

import NavBar from "../components/NavBar/NavBar";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";
import LoginContext from "../../contexts/LoginContext";

function Decouvrir() {
  const [isMaListe, setIsMaListe] = useState(false);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState([]);
  const [filtreCategorie, setFiltreCategorie] = useState("");
  const [dataFavorites, setDataFavorites] = useState([]);
  const { dataVideo, setDataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);
  const [alphabet, setAlphabet] = useState(false);
  const [nouveau, setNouveau] = useState(true);
  const [ancien, setAncien] = useState(false);
  const compareVideos = (a, b) => {
    if (a.is_freemium === 0 && b.is_freemium === 1) {
      return -1;
    }
    if (a.is_freemium === 1 && b.is_freemium === 0) {
      return 1;
    }
    return 0;
  };
  const handleNouveau = () => {
    const filtreDate = isFiltered.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });

    setIsFiltered(filtreDate);

    setNouveau(true);
    setAncien(false);
    setAlphabet(false);
  };
  const fetchFavorites = () => {
    if (dataLogin) {
      axios
        .get(`http://localhost:5002/favorites/${dataLogin.id}`)
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
    }
  };
  const handleAddToList = (clickedVideo) => {
    if (!dataFavorites.includes(parseInt(clickedVideo, 10))) {
      axios
        .post(`http://localhost:5002/favorites/add`, {
          userId: dataLogin.id,
          videoId: clickedVideo,
        })
        .then(() => {
          setDataFavorites([...dataFavorites, clickedVideo]);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(
          `http://localhost:5002/favorites/${dataLogin.id}/${clickedVideo}`
        )
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
    if (location.pathname === "/ma_liste") {
      setIsMaListe(true);

      handleNouveau();
    } else {
      setIsMaListe(false);
    }
  }, [location, dataLogin]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeCategory = (e) => {
    setFiltreCategorie(e.target.value);
  };

  useEffect(() => {
    const dataTemp = dataVideo;
    let filteredVideo = dataTemp.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    if (isMaListe) {
      filteredVideo = filteredVideo.filter((e) => dataFavorites.includes(e.id));
    }
    setIsFiltered(filteredVideo.sort(compareVideos));
  }, [dataVideo, search, filtreCategorie, isMaListe, dataFavorites, location]);

  useEffect(() => {
    if (filtreCategorie === "") {
      axios
        .get(`http://localhost:5002/videos`)
        .then((result) => setIsFiltered(result.data.sort(compareVideos)))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`http://localhost:5002/videos/filtre/${filtreCategorie}`)
        .then((result) => {
          setIsFiltered(result.data.sort(compareVideos));
        })
        .catch((error) => console.error(error));
    }
  }, [setDataVideo, filtreCategorie]);
  const handleAlphabet = () => {
    const filtreTemp = isFiltered.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setIsFiltered(filtreTemp);
    setAlphabet(true);
    setNouveau(false);
    setAncien(false);
  };

  const handleAncien = () => {
    const filtreDate = isFiltered.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });

    setIsFiltered(filtreDate);

    setNouveau(false);
    setAncien(true);
    setAlphabet(false);
  };
  return (
    <div>
      <NavBar />
      {!isMaListe ? (
        <SearchBar
          handleSearchChange={handleSearchChange}
          handleChangeCategory={handleChangeCategory}
        />
      ) : (
        <div className="flex gap-2 px-2">
          {alphabet ? (
            <div
              className="text-black bg-white border-white border-2 rounded-md p-2 cursor-pointer"
              onClick={handleAlphabet}
              onKeyDown={handleAlphabet}
              role="presentation"
            >
              A-Z
            </div>
          ) : (
            <div
              className="text-white border-white  border-2 rounded-md p-2 cursor-pointer"
              onClick={handleAlphabet}
              onKeyDown={handleAlphabet}
              role="presentation"
            >
              A-Z
            </div>
          )}
          {nouveau ? (
            <div
              className="text-black  border-white bg-white border-2 rounded-md p-2 cursor-pointer"
              onClick={handleNouveau}
              onKeyDown={handleNouveau}
              role="presentation"
            >
              Les plus récentes
            </div>
          ) : (
            <div
              className="text-white  border-white bg-black border-2 rounded-md p-2 cursor-pointer"
              onClick={handleNouveau}
              onKeyDown={handleNouveau}
              role="presentation"
            >
              Les plus récentes
            </div>
          )}
          {ancien ? (
            <div
              className="text-black  border-white bg-white border-2 rounded-md p-2 cursor-pointer"
              onClick={handleAncien}
              onKeyDown={handleAncien}
              role="presentation"
            >
              Les plus anciennes
            </div>
          ) : (
            <div
              className="text-white  border-white border-2 rounded-md p-2 cursor-pointer"
              onClick={handleAncien}
              onKeyDown={handleAncien}
              role="presentation"
            >
              Les plus anciennes
            </div>
          )}
        </div>
      )}

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
                <Link to={`/description/${video.id - 1}`}>
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
                      <Link to={`/description/${video.id - 1}`}>
                        <BsInfoCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                      </Link>
                      <Link to={`/watch/${video.id - 1}`}>
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
export default Decouvrir;
