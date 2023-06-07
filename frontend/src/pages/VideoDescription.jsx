import React from "react";
import Hero from "../components/Hero";
import Router from "../navigation/Router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DescriptionVideo from "../components/DescriptionVideo";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <Router />
      <DescriptionVideo />
      <Footer />
    </>
  );
}

export default App;
