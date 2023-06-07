import React, { useContext } from "react";
import ReactPlayer from "react-player";
import VideoContext from "../../contexts/VideoContext";

function SmallPlayer() {
  const { currentVideo } = useContext(VideoContext);

  return (
    <div>
      <ReactPlayer
        url={currentVideo.url}
        controls
        width="384px"
        height="216px"
      />
    </div>
  );
}

export default SmallPlayer;
