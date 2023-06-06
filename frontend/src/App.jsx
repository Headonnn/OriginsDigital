import React from "react";
import Router from "./navigation/Router";
import NavBar from "./components/NavBar";
import CarouselAll from "./components/CarouselAll";

function App() {
  return (
    <>
      <NavBar />
      <Router />
      <CarouselAll />
    </>

  );
}

export default App;
