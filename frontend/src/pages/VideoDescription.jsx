import React from "react";
import NavBar from "../components/NavBar/NavBar";
import DescriptionVideo from "../components/DescriptionVideo";
import SmallPlayer from "../components/LectureVideo/SmallPlayer";

function VideoDescription() {
  return (
    <div className="bg-black">
      <NavBar />
      <div className="mx-auto flex flex-col p-4 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <SmallPlayer />
        <DescriptionVideo />
      </div>
    </div>
  );
}

export default VideoDescription;
