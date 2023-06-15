import React, { useContext, useState } from "react";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";
import VideoContext from "../../contexts/VideoContext";

function HomePage() {
  const { dataVideo } = useContext(VideoContext);

  const [sections] = useState([
    { id: 0, type: "Hero" },
    { id: 1, type: "CarouselDate" },
    { id: 2, type: "CarouselAll" },
  ]);

  return (
    <>
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
            if (e.type === "CarouselDate") {
              return (
                <div key={e.id}>
                  <CarouselAll isFiltered />
                </div>
              );
            }
            return (
              <div key={e.id}>
                <CarouselAll isFiltered={false} />
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
