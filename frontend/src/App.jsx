import React, { useState, useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";
import LoginContext from "../contexts/LoginContext";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";
import Footer from "./components/Footer";

function App() {
  const [dataVideo, setDataVideo] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [videoCategorie, setVideoCategorie] = useState([]);
  const [dataUser, setDataUser] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:5002/videos`)
      .then((res) => res.json())
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5002/categories`)
      .then((res) => res.json())
      .then((result) => setCategorie(result))
      .catch((error) => console.error(error));
  }, []);
  /* eslint-disable */
  useEffect(() => {
    if (!dataUser) {
      console.warn("App log !datauser");
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) return console.warn("app log !token");
      const decoded = jwtDecode(token.token);
      console.warn("app log jwtdecode", decoded);
      setDataUser(decoded.cargo);
    }
  }, []);
  /* eslint-disable */
  const contextValue = useMemo(
    () => ({
      dataVideo,
      setDataVideo,
      categorie,
      setCategorie,
      videoCategorie,
      setVideoCategorie,
      dataUser,
      setDataUser,
    }),
    [
      dataVideo,
      setDataVideo,
      categorie,
      setCategorie,
      videoCategorie,
      setVideoCategorie,
      dataUser,
      setDataUser,
    ]
  );

  return (
    <div className="max-w-screen-xl m-auto min-h-screen flex flex-col">
      <VideoContext.Provider value={contextValue}>
        <LoginContext.Provider value={contextValue}>
          <div className="flex-grow">
            <Router />
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </LoginContext.Provider>
      </VideoContext.Provider>
    </div>
  );
}

export default App;
