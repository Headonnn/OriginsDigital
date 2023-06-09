import React from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DescriptionVideo from "../components/DescriptionVideo";
import SmallPlayer from "../components/SmallPlayer";

function VideoDescription() {
  return (
    <div className="bg-black">
      <NavBar />
      <div className="bg-black flex flex-col w-[50%] m-auto">
        <SmallPlayer />
        <DescriptionVideo />
      </div>

      <Footer />
    </div>
  );
}

export default VideoDescription;
