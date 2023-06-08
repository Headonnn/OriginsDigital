import React, { useState, useEffect } from "react";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";

function App() {
  const [currentVideo, setCurrentVideo] = useState(undefined);

  const [dataVideo, setDataVideo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5002/video`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <VideoContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ dataVideo, setDataVideo, currentVideo, setCurrentVideo }}
    >
      <Router />
    </VideoContext.Provider>
  );
}

export default App;
