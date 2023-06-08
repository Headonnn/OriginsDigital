import React, { useState, useEffect, useMemo } from "react";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";

function App() {
  const [dataVideo, setDataVideo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/video`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  const contextValue = useMemo(
    () => ({ dataVideo, setDataVideo }),
    [dataVideo, setDataVideo]
  );

  return (
    <VideoContext.Provider value={contextValue}>
      <Router />
    </VideoContext.Provider>
  );
}

export default App;
