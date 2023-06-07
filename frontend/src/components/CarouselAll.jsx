import React from "react";
import Carousel from "react-multi-carousel";
import skate from "../assets/videos/skate.mp4";
import surf from "../assets/videos/surf.mp4";
import parapente from "../assets/videos/parapente.mp4";
import "react-multi-carousel/lib/styles.css";

function CarouselAll() {
  const arr = [
    {
      title: "Surfing is cool",
      source: surf,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Paraglide is cool",
      source: parapente,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
    {
      title: "Skating is cool",
      source: skate,
      thumbnail:
        "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/5/1/mqgjwevxveuc6fcqvdfc/carissa-moore-surf-vague-tahiti",
      duration: 0.07,
      description:
        "The best Lorem Ipsum Generator in all the sea! Heave this scurvy copyfiller fer yar next adventure and cajol yar clients into walking the plank with ev'ry layout! Configure above, then get yer pirate ipsum...own the high seas, arg!",
    },
  ];

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
        {arr.map((video) => {
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
