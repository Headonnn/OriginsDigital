import React, { useState, useEffect, useMemo } from "react";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";

function App() {
  const [dataVideo, setDataVideo] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/videos`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5002/category`)
      .then((res) => res.json())
      .then((result) => setCategorie(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5002/users`)
      .then((res) => res.json())
      .then((result) => setDataUser(result))
      .catch((error) => console.error(error));
  }, []);

  const contextValue = useMemo(
    () => ({
      dataVideo,
      setDataVideo,
      categorie,
      setCategorie,
      dataUser,
      setDataUser,
    }),
    [dataVideo, setDataVideo, categorie, setCategorie, dataUser, setDataUser]
  );

  return (
    <VideoContext.Provider value={contextValue}>
      <Router />
    </VideoContext.Provider>
  );
}

export default App;
