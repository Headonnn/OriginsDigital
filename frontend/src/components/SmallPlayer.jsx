import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import VideoContext from "../../contexts/VideoContext";

function SmallPlayer() {
  const { dataVideo } = useContext(VideoContext);
  const params = useParams();
  return (
    <div className="flex justify-center bg-black">
      <ReactPlayer url={dataVideo[params.id].url} controls width="50%" />
    </div>
  );
}

export default SmallPlayer;
