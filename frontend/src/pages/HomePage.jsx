import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import VideoContext from "../../contexts/VideoContext";
import LoginContext from "../../contexts/LoginContext";

function HomePage() {
  const [dataSection, setDataSection] = useState([]);
  const { setDataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);
  useEffect(() => {
    fetch(`http://localhost:5002/videos`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);
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
    <div className="mb-20">
      {dataSection.length > 0 && (
        <div>
          <Hero />

          {dataSection.map((e) => {
            if (e.visibility === "all") {
              return <CarouselAll dataSection={e} />;
            }
            if (e.visibility === "connected") {
              if (dataLogin) {
                return <CarouselAll dataSection={e} />;
              }
              return <div />;
            }
            if (e.visibility === "disconnected") {
              if (!dataLogin) {
                return <CarouselAll dataSection={e} />;
              }
              return <div />;
            }
            return <div />;
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
