import React, { useState, useEffect, useMemo } from "react";
import jwtDecode from "jwt-decode";
import LoginContext from "../contexts/LoginContext";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";
import Footer from "./components/Footer";
import api from "../contexts/api";

function App() {
  const [dataLogin, setDataLogin] = useState(undefined);
  const { href } = window.location;
  const [dataVideo, setDataVideo] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [videoCategorie, setVideoCategorie] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos`)
      .then((result) => setDataVideo(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((result) => setCategorie(result))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((result) => setDataUser(result.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (token) {
      const decoded = jwtDecode(token);
      setDataLogin(decoded.cargo);
    } else {
      setDataLogin(undefined);
    }
  }, [href]);

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
