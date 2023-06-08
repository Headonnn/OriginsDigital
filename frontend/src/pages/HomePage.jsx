import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";
import VideoContext from "../../contexts/VideoContext";

function HomePage() {
  const { dataVideo } = useContext(VideoContext);
  const sections = ["Hero", "CarouselNouveautés", "CarouselAll"];
  const [isFiltered, setIsFiltered] = useState(false);
  console.warn(isFiltered);
  return (
    <>
      <NavBar />
      {dataVideo.length > 0 && (
        <div>
          {sections.map((e) => {
            if (e === "Hero") {
              return (
                <div>
                  <Hero />
                </div>
              );
            }
            if (e === "CarouselAll") {
              return (
                <div>
                  <CarouselAll
                    isFiltered={false}
                    setIsFiltered={setIsFiltered}
                  />
                </div>
              );
            }
            return (
              <div>
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
