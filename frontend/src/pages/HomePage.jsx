import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";

function HomePage() {
  const [dataSection, setDataSection] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/sections`)
      .then((res) => {
        setDataSection(res.data);
        console.warn("sections : ", res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("erreur en recupérant les sections");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  }, []);

  return (
    <>
      {dataSection.length > 0 && (
        <div>
          <Hero />

          {dataSection.map((e) => (
            <CarouselAll dataSection={e} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
