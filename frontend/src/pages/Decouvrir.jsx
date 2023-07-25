import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsInfoCircle,
  BsPlayCircle,
  BsPlusCircle,
  BsCheckCircle,
} from "react-icons/bs";
import {
  AiOutlineCalendar,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
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
  const [nouveau, setNouveau] = useState(false);
  const [ancien, setAncien] = useState(false);
  const [categ, setCateg] = useState([]);
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
      setFiltreCategorie("");
    } else {
      setIsMaListe(false);
      setFiltreCategorie("");
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
    let vidCateg = [-1];
    if (categ) {
      vidCateg = categ.map((e) => e.id);
    }

    let filteredVideo = [];
    filteredVideo = dataTemp
      .filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
      .filter((e) => vidCateg.includes(e.id));

    if (isMaListe) {
      filteredVideo = dataTemp.filter((e) => dataFavorites.includes(e.id));
    }

    setIsFiltered(filteredVideo.sort(compareVideos));
  }, [
    dataVideo,
    search,
    isMaListe,
    dataFavorites,
    location,
    filtreCategorie,
    categ,
  ]);

  useEffect(() => {
    if (
      filtreCategorie === "" ||
      filtreCategorie === "9" ||
      filtreCategorie === "7"
    ) {
      axios
        .get(`http://localhost:5002/videos`)
        .then((result) => setCateg(result.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`http://localhost:5002/videos/filtre/${filtreCategorie}`)
        .then((result) => {
          setCateg(result.data);
        })
        .catch((error) => console.error(error));
    }
  }, [setDataVideo, filtreCategorie, location]);
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
      {isMaListe ? (
        <div className="max-w-2xl mx-auto text-center  text-white my-12">
          <h2 className="mb-4 text-4xl font-extrabold text-center ">
            Ma liste
          </h2>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center  text-white mt-12 md:my-12">
          <h2 className="mb-4 text-4xl font-extrabold text-center ">
            Découvrir
          </h2>
        </div>
      )}
      {!isMaListe && (
        <div className="max-w-5xl flex flex-col mx-auto">
          <div>
            <SearchBar
              handleSearchChange={handleSearchChange}
              handleChangeCategory={handleChangeCategory}
            />
          </div>
          <div>
            <div className="flex gap-2 mb-12 ml-8 md:ml-0 ">
              {nouveau ? (
                <>
                  <div
                    className="text-black md:block hidden border-white bg-white border  rounded-md p-2 cursor-pointer"
                    onClick={handleNouveau}
                    onKeyDown={handleNouveau}
                    role="presentation"
                  >
                    Les plus récentes
                  </div>{" "}
                  <div
                    className="text-black md:hidden block border-white bg-white border  rounded-md p-2 cursor-pointer"
                    onClick={handleNouveau}
                    onKeyDown={handleNouveau}
                    role="presentation"
                  >
                    <div className="flex items-center gap-2 text-xl ">
                      <AiOutlineCalendar /> <AiOutlineArrowUp />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-white  md:block hidden border-white bg-black border rounded-md p-2 cursor-pointer"
                    onClick={handleNouveau}
                    onKeyDown={handleNouveau}
                    role="presentation"
                  >
                    Les plus récentes
                  </div>
                  <div
                    className="text-white md:hidden block  border-white bg-black border rounded-md p-2 cursor-pointer"
                    onClick={handleNouveau}
                    onKeyDown={handleNouveau}
                    role="presentation"
                  >
                    <div className="flex items-center gap-2  text-xl">
                      <AiOutlineCalendar /> <AiOutlineArrowUp />
                    </div>
                  </div>
                </>
              )}
              {alphabet ? (
                <div
                  className="text-black bg-white border-white border rounded-md p-2 cursor-pointer"
                  onClick={handleAlphabet}
                  onKeyDown={handleAlphabet}
                  role="presentation"
                >
                  A-Z
                </div>
              ) : (
                <div
                  className="text-white border-white  border rounded-md p-2 cursor-pointer"
                  onClick={handleAlphabet}
                  onKeyDown={handleAlphabet}
                  role="presentation"
                >
                  A-Z
                </div>
              )}
              {ancien ? (
                <>
                  <div
                    className="text-black md:block hidden border-white bg-white border rounded-md p-2 cursor-pointer"
                    onClick={handleAncien}
                    onKeyDown={handleAncien}
                    role="presentation"
                  >
                    Les plus anciennes
                  </div>
                  <div
                    className="text-black block md:hidden border-white bg-white border rounded-md p-2 cursor-pointer"
                    onClick={handleAncien}
                    onKeyDown={handleAncien}
                    role="presentation"
                  >
                    <div className="flex items-center gap-2 text-xl ">
                      <AiOutlineCalendar /> <AiOutlineArrowDown />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-white hidden md:block border-white border rounded-md p-2 cursor-pointer"
                    onClick={handleAncien}
                    onKeyDown={handleAncien}
                    role="presentation"
                  >
                    Les plus anciennes
                  </div>
                  <div
                    className="text-white block md:hidden border-white border rounded-md p-2 cursor-pointer"
                    onClick={handleAncien}
                    onKeyDown={handleAncien}
                    role="presentation"
                  >
                    <div className="flex items-center gap-2 text-xl ">
                      <AiOutlineCalendar /> <AiOutlineArrowDown />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-8 flex-wrap mt-8 mb-20">
        {isFiltered.length === 0 && (
          <div className="text-white">
            Aucune vidéo ne correspond à vos critères de recherche
          </div>
        )}

        {isFiltered
          .filter((e) => {
            if (filtreCategorie === "9") {
              return e.is_freemium === 0;
            }
            return e;
          })
          .map((video) => {
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
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg h-44 w-68"
                  />

                  <div className="flex flex-col justify-between absolute bg-black bottom-0  p-1 bg-opacity-60 text-white w-full h-3/5">
                    <div className="text-md pl-1">{video.title}</div>

                    {!video.is_freemium || dataLogin ? (
                      <div className=" flex items-center text-2xl   w-1/2 gap-4 px-2 py-1 rounded-xl transition">
                        <Link to={`/description/${video.id - 1}`}>
                          <BsInfoCircle className="hover:bg-white hover:text-black cursor-pointer hover:rounded-2xl" />
                        </Link>
                        <Link to={`/watch/${video.id - 1}`}>
                          <BsPlayCircle className="hover:bg-white  hover:text-black cursor-pointer hover:rounded-2xl" />
                        </Link>
                        {dataLogin && (
                          <button
                            type="button"
                            onClick={() => handleAddToList(video.id)}
                          >
                            {!dataFavorites.includes(parseInt(video.id, 10)) ? (
                              <BsPlusCircle
                                id={video.id}
                                className="hover:bg-white  hover:text-black cursor-pointer hover:rounded-2xl"
                              />
                            ) : (
                              <BsCheckCircle
                                id={video.id}
                                className="hover:bg-white  hover:text-black cursor-pointer hover:rounded-2xl"
                              />
                            )}
                          </button>
                        )}
                      </div>
                    ) : null}
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
