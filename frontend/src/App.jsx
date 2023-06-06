import React from "react";
import Router from "./navigation/Router";
import NavBar from "./components/NavBar";
import CarouselAll from "./components/CarouselAll";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Router />
      <CarouselAll />
      <Footer />
    </>
  );
}

export default App;
