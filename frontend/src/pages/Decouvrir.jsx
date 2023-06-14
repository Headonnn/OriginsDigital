import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";

function Decouvrir() {
  const { dataVideo } = useContext(VideoContext);
  return (
    <div>
      <NavBar />
      <SearchBar />
      <div className="flex justify-center gap-12 flex-wrap my-5">
        {dataVideo.map((video) => {
          return (
            <div key={video.id} className="w-60 hover:scale-105 transition">
              <Link to={`/description/${video.id - 1}`}>
                <img src={video.thumbnail} alt={video.title} />
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Decouvrir;
