import React, { useState, useEffect, useContext } from "react";
import ApiContext from "../../contexts/ApiContext";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import VideoContext from "../../contexts/VideoContext";
import LoginContext from "../../contexts/LoginContext";

function HomePage() {
  const [dataSection, setDataSection] = useState([]);
  const { setDataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/videos`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/sections`)
      .then((res) => {
        setDataSection(res.data);
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
              return <CarouselAll dataSection={e} key={e.id} />;
            }
            if (e.visibility === "connected") {
              if (dataLogin) {
                return <CarouselAll dataSection={e} key={e.id} />;
              }
              return null;
            }
            if (e.visibility === "disconnected") {
              if (!dataLogin) {
                return <CarouselAll dataSection={e} key={e.id} />;
              }
              return null;
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
