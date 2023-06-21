import React, { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  BsInfoCircle,
  BsPlayCircle,
  BsPlusCircle,
  BsCheckCircle,
} from "react-icons/bs";

import VideoContext from "../../contexts/VideoContext";

function CarouselAll({ isFiltered }) {
  const { dataVideo } = useContext(VideoContext);
  const [isInTheList, SetisInTheList] = useState(false);

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

  const handleAddToList = () => {
    SetisInTheList(!isInTheList);
  };

  return (
    dataVideo.length > 0 && (
      <div className="carousel mx-auto bg-neutral-950 my-20">
        <h2 className="text-lg text-white font-light py-6 ml-4">
          {isFiltered ? "Nouveautés" : "Toutes les videos"}
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
          {dataVideo
            .filter((e) => {
              if (isFiltered) {
                return handleDateNouv(e.date);
              }
              return e;
            })
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
                      <div className="text-lg">{video.title}</div>
                      <div className=" flex items-center text-2xl  w-1/2 gap-4 px-2 py-1 text-black rounded-xl cursor-pointer text-white transition">
                        <Link to={`/description/${video.id - 1}`}>
                          <BsInfoCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                        </Link>
                        <Link to={`/watch/${video.id - 1}`}>
                          <BsPlayCircle className="hover:bg-white hover:text-black hover:rounded-2xl" />
                        </Link>
                        <button type="button" onClick={handleAddToList}>
                          {!isInTheList ? (
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
        </Carousel>
      </div>
    )
  );
}

CarouselAll.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
};

export default CarouselAll;
