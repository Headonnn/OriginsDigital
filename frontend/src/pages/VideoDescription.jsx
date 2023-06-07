import React from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DescriptionVideo from "../components/DescriptionVideo";
import SmallPlayer from "../components/SmallPlayer";

function VideoDescription() {
  return (
    <>
      <NavBar />
      <SmallPlayer />

      <DescriptionVideo />
      <Footer />
    </>
  );
}

export default VideoDescription;
