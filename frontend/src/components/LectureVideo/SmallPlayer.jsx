import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import VideoContext from "../../../contexts/VideoContext";

function SmallPlayer() {
  const { dataVideo } = useContext(VideoContext);
  const params = useParams();

  if (!dataVideo || !dataVideo[params.id]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center bg-black my-9">
      <ReactPlayer url={dataVideo[params.id].url} controls />
    </div>
  );
}

export default SmallPlayer;
