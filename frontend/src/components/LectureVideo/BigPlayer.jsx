import React, { useContext } from "react";
import ReactPlayer from "react-player";

import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import VideoContext from "../../../contexts/VideoContext";

function BigPlayer() {
  const params = useParams();
  const { dataVideo } = useContext(VideoContext);
  return (
    <div className="player-wrapper relative">
      <Link to={`/description/${params.id}`}>
        <div className="absolute left-1 top-1 text-white cursor-pointer hover:scale-105 transition">
          <BsArrowLeft size={30} />
        </div>
      </Link>
      <ReactPlayer
        url={dataVideo[params.id].url}
        controls
        width="100vw"
        height="100vh"
      />
    </div>
  );
}

export default BigPlayer;
