import React, { useState, useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";
import LoginContext from "../contexts/LoginContext";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";
import Footer from "./components/Footer";
import ApiContext from "../contexts/ApiContext";

function App() {
  const [dataLogin, setDataLogin] = useState(undefined);
  const [dataVideo, setDataVideo] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [videoCategorie, setVideoCategorie] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/videos`)
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((result) => setCategorie(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((result) => setDataUser(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!dataLogin) {
      const token = localStorage.getItem("token");

      ApiContext.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (!token) {
        return;
      }
      const decoded = jwtDecode(token);
      setDataLogin(decoded.cargo);
    }
  }, []);

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
      dataLogin,
      setDataLogin,
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
      dataLogin,
      setDataLogin,
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
