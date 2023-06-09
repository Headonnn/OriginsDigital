import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import VideoContext from "../../contexts/VideoContext";

function CarouselAll({ isFiltered }) {
  const { dataVideo } = useContext(VideoContext);

  const responsive = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
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
  };

  return (
    dataVideo.length > 0 && (
      <div className="carousel mx-auto bg-neutral-950">
        <h2 className="Poppins text-2xl text-white font-light py-6 ml-4">
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
            .map((video, index) => {
              return (
                <div
                  key={video.id}
                  className="carousel-item relative m-4 hover:scale-105 transition"
                >
                  <Link to={`/description/${index}`}>
                    <img src={video.thumbnail} alt={video.title} />
                  </Link>
                </div>
              );
            })}
        </Carousel>
      </div>
    )
  );
}

export default CarouselAll;
CarouselAll.propTypes = {
  isFiltered: PropTypes.bool.isRequired,
};
