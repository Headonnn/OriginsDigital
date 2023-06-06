import React from "react";
import ReactPlayer from "react-player";
import Carousel from "react-multi-carousel";
import skate from "../assets/videos/skate.mp4";
import surf from "../assets/videos/surf.mp4";
import "react-multi-carousel/lib/styles.css";

function CarouselAll() {
  const arr = [
    {
      title: "Surfing is cool",
      source: surf,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="carousel mx-auto">
      <h2 className="text-2xl font-semibold mb-6 ml-4">Toutes les videos</h2>
      <Carousel
        responsive={responsive}
        arrows
        draggable
        swipeable
        infinite={false}
        autoPlay={false}
        autoPlaySpeed={3000}
        containerClass="carousel-container"
      >
        {arr.map((video) => {
          return (
            <div className="carousel-item relative m-4">
              <ReactPlayer
                url={video.source}
                controls
                width="384px"
                height="216px"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselAll;
