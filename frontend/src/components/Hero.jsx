import React, { useState, useContext } from "react";
import { BsFillPlayFill, BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";

import VideoContext from "../../contexts/VideoContext";

function Hero() {
  const { dataVideo } = useContext(VideoContext);

  if (dataVideo === undefined) return null;

  const [index, setIndex] = useState(0);

  return (
    dataVideo.length > 0 && (
      <div className=" h-[50vh] w-full m-auto  group ">
        <div
          style={{ backgroundImage: `url(${dataVideo[index].thumbnail})` }}
          className="w-full h-full  bg-center bg-cover duration-500 p-[16px]"
        >
          <div className="flex flex-col-reverse h-[100%]  ">
            <div className="flex justify-center ">
              {dataVideo.map((e, i) => (
                <div
                  role="presentation"
                  key={dataVideo[i].url}
                  onClick={() => setIndex(i)}
                  onKeyDown={() => setIndex(i)}
                  className={
                    index === i
                      ? "text-white cursor-pointer"
                      : "text-black/20 cursor-pointer"
                  }
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
            <div className="flex grow items-center justify-between">
              <div className="flex grow justify-center items-end h-[100%] gap-[20%]">
                <Link to={`/watch/${index}`}>
                  <div className=" flex hover:bg-gray-300 hidden md:block tracking-wide  items-center gap-[16px]  bg-white text-black rounded-xl  mb-[16px] py-3 px-5 cursor-pointer transition">
                    <BsFillPlayFill /> Lecture
                  </div>
                </Link>
                <Link to={`/description/${index}`}>
                  <div className="flex items-center hidden md:block tracking-wide hover:bg-black/80 gap-[16px] bg-black/50 text-white rounded-xl  mb-[16px] py-3 px-5  cursor-pointer transition">
                    <BsInfoCircle />
                    Plus d'infos
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Hero;
