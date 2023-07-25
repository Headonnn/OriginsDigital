import React, { useState, useContext, useEffect } from "react";
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
  const [mobile, setMobile] = useState(false);
  if (dataVideo === undefined) return null;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);
  return (
    dataVideo.length > 0 && (
      <div className="w-full relative shadow-inner">
        {!mobile ? (
          <ReactPlayer
            url={dataVideo.filter((e) => e.is_in_hero === 1)[0].url}
            playing
            loop
            muted={!sound}
            width="100%"
            height="100%"
          />
        ) : (
          <img
            alt="hero"
            className="h-[35vh]"
            src={dataVideo.filter((e) => e.is_in_hero === 1)[0].thumbnail}
          />
        )}
        <div className="absolute top-0 z-50 w-full ">
          <NavBar />
        </div>

        <div className="absolute top-0 md:px-10 md:pb-10 w-full h-full">
          <div className="h-full  flex justify-between text-white">
            <div className=" flex flex-col justify-end w-full">
              <h1 className="md:text-5xl text-center md:text-left md:mb-10 text-2xl mb-5">
                {dataVideo.filter((e) => e.is_in_hero === 1)[0].title}
              </h1>
              <div className="flex flex-row  gap-4 justify-center md:justify-normal ">
                <Link
                  to={`/watch/${
                    dataVideo.filter((e) => e.is_in_hero === 1)[0].id - 1
                  }`}
                >
                  <div className=" flex items-center  text-xs md:text-base p-2 gap-1 md:gap-[16px] border bg-white text-black rounded-md  md:mb-[16px] md:p-[12px] cursor-pointer hover:bg-black hover:text-white transition">
                    <BsFillPlayFill /> Lecture
                  </div>
                </Link>
                <Link
                  to={`/description/${
                    dataVideo.filter((e) => e.is_in_hero === 1)[0].id - 1
                  }`}
                >
                  <div className=" flex  items-center p-2 text-xs md:text-base md:gap-[16px] border border-[#9ca3af]/80 bg-[#9ca3af]/80 text-black rounded-md gap-4  mb-5 md:mb-[16px] md:p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                    <BsInfoCircle /> Infos
                  </div>
                </Link>
              </div>
            </div>
            {!mobile && (
              <div
                className="flex h-full text-5xl cursor-pointer items-end m "
                onClick={() => setSound(!sound)}
                onKeyDown={() => setSound(!sound)}
                role="presentation"
              >
                {sound && <BsFillVolumeUpFill />}
                {!sound && <BsFillVolumeMuteFill />}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Hero;
