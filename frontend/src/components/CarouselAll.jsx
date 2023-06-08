import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import VideoContext from "../../contexts/VideoContext";

function CarouselAll() {
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
  console.warn(dataVideo.thumbnail);
  return (
    dataVideo.length > 0 && (
      <div className="carousel mx-auto bg-neutral-950">
        <h2 className="Poppins text-2xl text-white font-light py-6 ml-4">
          Toutes les videos
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
          {dataVideo.map((video) => {
            return (
              <Link to="/description">
                <div
                  key={video.id}
                  className="carousel-item relative m-4 hover:scale-105 transition"
                >
                  <img src={video.thumbnail} alt={video.title} />
                </div>
              </Link>
            );
          })}
        </Carousel>
      </div>
    )
  );
}

export default CarouselAll;
