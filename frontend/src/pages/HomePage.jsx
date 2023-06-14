import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CarouselAll from "../components/CarouselAll";
import Footer from "../components/Footer";
import VideoContext from "../../contexts/VideoContext";
// import LoginId from "../components/LoginId";

function HomePage() {
  const { dataVideo } = useContext(VideoContext);
const [isFiltered,setIsFiltered]=useState(true)
  const [sections,setSections] = useState([
    { id: 0, type: "Hero" },
    { id: 1, type: "CarouselDate" },
    { id: 2, type: "CarouselAll" },
  ]);
  

  return (
    <>
 
      
      {dataVideo.length > 0 && (
        <div>
          {sections.map((e,i) => {  
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
                  <CarouselAll isFiltered section={sections[i]}/>
                </div>
              );
            }
            return (
              <div key={e.id}>
                <CarouselAll isFiltered={false} section={sections[i]} />
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
