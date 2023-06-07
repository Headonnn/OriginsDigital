import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselAll() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/video`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error));
  }, []);

  console.warn(data);

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

  return (
    <div className="carousel mx-auto bg-neutral-950">
      <h2 className="Poppins text-2xl text-white font-light py-6 ml-4">
        Toutes les videos
      </h2>
      <Carousel
        responsive={responsive}
        arrows
        draggable
        swipeable
        infinite={false}
        keyBoardControl
        containerClass="carousel-container"
      >
        {data.map((video) => {
          return (
            <div className="carousel-item relative m-4">
              <img src={video.thumbnail} alt={video.title} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselAll;
