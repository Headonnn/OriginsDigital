import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />

      <CarouselAll />
      <Footer />
    </>
  );
}

export default HomePage;
