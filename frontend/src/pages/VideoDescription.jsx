import React from "react";
import NavBar from "../components/NavBar/NavBar";
import DescriptionVideo from "../components/DescriptionVideo";
import SmallPlayer from "../components/LectureVideo/SmallPlayer";

function VideoDescription() {
  return (
    <div className="bg-black">
      <NavBar />
      <div className="bg-black flex flex-col w-[50%] m-auto">
        <SmallPlayer />
        <DescriptionVideo />
      </div>
    </div>
  );
}

export default VideoDescription;
