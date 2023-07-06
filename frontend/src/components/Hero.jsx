import React, { useState, useContext } from "react";
import {
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
  BsFillPlayFill,
  BsInfoCircle,
} from "react-icons/bs";

import { Link } from "react-router-dom";

import ReactPlayer from "react-player";
import VideoContext from "../../contexts/VideoContext";
import NavBar from "./NavBar/NavBar";

function Hero() {
  const { dataVideo } = useContext(VideoContext);
  const [sound, setSound] = useState(false);
  if (dataVideo === undefined) return null;

  return (
    dataVideo.length > 0 && (
      <div className="w-full h-[80vh] relative shadow-inner">
        <ReactPlayer
          url={dataVideo[4].url}
          playing
          loop
          muted={!sound}
          width="100%"
          height="100%"
        />
        <div className="absolute top-0 z-50 w-full ">
          <NavBar />
        </div>

        <div className="absolute top-0 px-10 pb-10 w-full h-full">
          <div className="h-full flex justify-between text-white">
            <div className=" flex flex-col  justify-end">
              <h1 className="text-5xl mb-10">{dataVideo[4].title}</h1>
              <div className="flex flex-row w-full gap-4 ">
                <Link to="/watch/4">
                  <div className=" flex items-center  gap-[16px] border bg-white text-black rounded-xl  mb-[16px] p-[12px] cursor-pointer hover:bg-black hover:text-white transition">
                    <BsFillPlayFill /> Lecture
                  </div>
                </Link>
                <Link to="/description/4">
                  <div className=" flex items-center  gap-[16px] border bg-[#9ca3af]/80 text-black rounded-xl  mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                    <BsInfoCircle /> Infos
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="flex h-full text-5xl cursor-pointer items-end m "
              onClick={() => setSound(!sound)}
              onKeyDown={() => setSound(!sound)}
              role="presentation"
            >
              {sound && <BsFillVolumeUpFill />}
              {!sound && <BsFillVolumeMuteFill />}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Hero;
