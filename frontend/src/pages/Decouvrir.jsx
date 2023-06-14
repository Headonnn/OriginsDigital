import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import VideoContext from "../../contexts/VideoContext";

function Decouvrir() {
  const [search, setSearch] = useState("");
  const [isFiltered, setIsFiltered] = useState([]);
  const { dataVideo } = useContext(VideoContext);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const filteredVideo = dataVideo.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setIsFiltered(filteredVideo);
  }, [dataVideo, search]);

  return (
    <div>
      <NavBar />
      <SearchBar handleSearchChange={handleSearchChange} />
      <div className="flex justify-center gap-12 flex-wrap my-5">
        {isFiltered.map((video) => {
          return (
            <div key={video.id} className="w-60 hover:scale-105 transition">
              <h3 className="text-white">{video.title}</h3>
              <Link to={`/description/${video.id - 1}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg h-44 w-68"
                />
              </Link>
            </div>
          );
        })}
        {isFiltered.map((video) => {
          return (
            <div key={video.id} className="w-60 hover:scale-105 transition">
              <h3 className="text-white">{video.title}</h3>
              <Link to={`/description/${video.id - 1}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg h-44 w-68"
                />
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
