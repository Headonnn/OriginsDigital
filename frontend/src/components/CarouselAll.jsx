import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import {
  BsInfoCircle,
  BsPlayCircle,
  BsPlusCircle,
  BsCheckCircle,
} from "react-icons/bs";
import LoginContext from "../../contexts/LoginContext";

import VideoContext from "../../contexts/VideoContext";

function CarouselAll({ dataSection }) {
  const [dataFavorites, setDataFavorites] = useState([]);
  const { dataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);

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

  useEffect(() => {
    fetchFavorites();
    console.warn(dataVideo);
  }, []);

  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  const handleDateNouv = (videodate) => {
    if (videodate) {
      const test = new Date();
      const te = test.setDate(test.getDate() - 7);
      const dateParts = videodate.split("-");
      const vid = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2].substr(0, 2),
        dateParts[2].substr(3, 2),
        dateParts[2].substr(6, 2),
        dateParts[2].substr(9, 2)
      );
      const vide = Date.parse(vid);
      return te - vide <= 0;
    }
    return false;
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

  return (
    dataVideo.length > 0 && (
      <div className="carousel md:mx-6 lg:mx-6 bg-neutral-950 my-9 mx-10">
        <h2 className="text-md md:text-lg text-white font-light py-3 ml-4">
          {dataSection.name ? dataSection.name[0] : dataSection.carousel.name}
        </h2>

        <Carousel
          responsive={responsive}
          arrows
          draggable
          swipeable
          infinite
          keyBoardControl
        >
          {dataSection &&
            dataVideo
              .filter((e, i) => {
                if (dataSection.carousel.max_number) {
                  return i < dataSection.carousel.max_number;
                }
                return e;
              })
              .filter((e) =>
                dataSection.name === "Nouveautés"
                  ? handleDateNouv(e.date)
                  : dataSection.videos
                      .map((el) => Object.values(el)[0])
                      .includes(e.id)
              )
              .map((video) => {
                return (
                  <div
                    key={video.id}
                    className={`${
                      video.is_freemium && !dataLogin
                        ? "carousel-item m-1 opacity-60 relative"
                        : "carousel-item m-1 relative"
                    }`}
                  >
                    <div className="hover:scale-105 duration-200 text-white ">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-40 w-96"
                      />

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
                              {!dataFavorites.includes(
                                parseInt(video.id, 10)
                              ) ? (
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
        </Carousel>
      </div>
    )
  );
}

CarouselAll.propTypes = {
  dataSection: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.number.isRequired, PropTypes.string.isRequired)
      .isRequired
  ).isRequired,
};

export default CarouselAll;
