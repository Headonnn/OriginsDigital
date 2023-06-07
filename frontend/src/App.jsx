import React, { useState } from "react";
import VideoContext from "../contexts/VideoContext";
import Router from "./navigation/Router";

function App() {
  const [currentUrl, setCurrentUrl] = useState("");
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <VideoContext.Provider value={{ currentUrl, setCurrentUrl }}>
      <Router />
    </VideoContext.Provider>
  );
}

export default App;
