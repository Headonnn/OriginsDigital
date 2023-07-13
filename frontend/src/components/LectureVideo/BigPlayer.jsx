import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player";

import { BsArrowLeft } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import VideoContext from "../../../contexts/VideoContext";

function BigPlayer() {
  const navigate = useNavigate();
  const params = useParams();
  const { dataVideo } = useContext(VideoContext);
  const [dataDesc, setDataDesc] = useState(undefined);
  useEffect(
    () =>
      setDataDesc(
        dataVideo.filter((e) => e.id === parseInt(params.id, 10) + 1)[0]
      ),
    []
  );
  return (
    <div className="player-wrapper relative">
      <div
        onClick={() => navigate(-1)}
        onKeyDown={() => navigate(-1)}
        role="presentation"
        className="absolute left-1 top-1 text-white cursor-pointer hover:scale-105 transition"
      >
        <BsArrowLeft size={30} />
      </div>

      {dataDesc && (
        <ReactPlayer url={dataDesc.url} controls width="100vw" height="100vh" />
      )}
    </div>
  );
}

export default BigPlayer;
