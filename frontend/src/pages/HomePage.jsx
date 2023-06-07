import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";
import VideoContext from "../../contexts/VideoContext";

function HomePage() {
  const { dataVideo } = useContext(VideoContext);
  return (
    <>
      <NavBar />
      {dataVideo.length > 0 && (
        <div>
          <Hero />
          <CarouselAll />
        </div>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
