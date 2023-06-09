import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";
import VideoContext from "../../contexts/VideoContext";
// import LoginId from "../components/LoginId";

function HomePage() {
  const { dataVideo } = useContext(VideoContext);
  const sections = [
    { id: 0, type: "Hero" },
    { id: 1, type: "CarouselNouveautés" },
    { id: 2, type: "CarouselAll" },
  ];
  const [isFiltered, setIsFiltered] = useState(false);
  console.warn(isFiltered);
  return (
    <>
      <NavBar />
      {dataVideo.length > 0 && (
        <div>
          {sections.map((e) => {
            if (e.type === "Hero") {
              return (
                <div key={e.id}>
                  <Hero />
                </div>
              );
            }
            if (e.type === "CarouselAll") {
              return (
                <div key={e.id}>
                  <CarouselAll
                    isFiltered={false}
                    setIsFiltered={setIsFiltered}
                  />
                </div>
              );
            }
            return (
              <div key={e.id}>
                <CarouselAll isFiltered setIsFiltered={setIsFiltered} />
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </>
  );
}

export default HomePage;
