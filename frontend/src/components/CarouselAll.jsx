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

import VideoContext from "../../contexts/VideoContext";

function CarouselAll({ dataSection }) {
  const [dataFavorites, setDataFavorites] = useState([]);
  const { dataVideo } = useContext(VideoContext);

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

  useEffect(() => {
    fetchFavorites();
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
      <div className="carousel mx-auto bg-neutral-950 my-20">
        <h2 className="text-lg text-white font-light py-6 ml-4">
          {dataSection.name ? dataSection.name[0] : dataSection.carousel.name}
        </h2>

        <Carousel
          responsive={responsive}
          arrows
          draggable
          swipeable
          infinite
          keyBoardControl
          containerClass="carousel-container"
        >
          {dataSection &&
            dataVideo
              .filter((e) =>
                dataSection.name === "Nouveautés"
                  ? handleDateNouv(e.date)
                  : dataSection.videos
                      .map((el) => Object.values(el)[0])
                      .includes(e.id)
              )
              .map((video) => {
                return (
                  <div className="group">
                    <div
                      key={video.id}
                      className="carousel-item relative m-4 hover:scale-105 transition"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-52 w-88"
                      />

                      <div className="hidden group-hover:block group-hover:absolute bg-black transform top-2/3 bg-opacity-60 text-white w-full h-5/6">
                        <div className="text-md">{video.title}</div>
                        <div className=" flex items-center text-2xl  w-1/2 gap-4 px-2 py-1 rounded-xl transition">
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
                              <BsPlusCircle
                                id={video.id}
                                className="hover:bg-white hover:text-black hover:rounded-2xl"
                              />
                            ) : (
                              <BsCheckCircle
                                id={video.id}
                                className="hover:bg-white hover:text-black hover:rounded-2xl"
                              />
                            )}
                          </button>
                        </div>
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
