import React, { useState, useEffect, useMemo } from "react";
import { LoginContext } from "../contexts/LoginContext";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";
import Footer from "./components/Footer";

function App() {
  const [dataVideo, setDataVideo] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [videoCategorie, setVideoCategorie] = useState([]);
  const [dataUser, setDataUser] = useState([]);

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
      videoCategorie,
      setVideoCategorie,
    }),
    [
      dataVideo,
      setDataVideo,
      categorie,
      setCategorie,
      dataUser,
      setDataUser,
      videoCategorie,
      setVideoCategorie,
    ]
  );

  const [loggedIn, setLoggedIn] = useState(false);
  const login = () => {
    setLoggedIn(true);
  };
  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };
  const loginContextValue = useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
      login,
      logout,
    }),
    [loggedIn, setLoggedIn]
  );

  return (
    <div className="max-w-screen-2xl m-auto min-h-screen flex flex-col">
      <VideoContext.Provider value={contextValue}>
        <LoginContext.Provider value={loginContextValue}>
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
