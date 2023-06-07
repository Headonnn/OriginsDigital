import React, { useState, useEffect, useContext } from "react";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsFillPlayFill,
  BsInfoCircle,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";

import VideoContext from "../../contexts/VideoContext";

function Hero() {
  const { dataVideo, setCurrentUrl } = useContext(VideoContext);

  if (dataVideo === undefined) return null;

  const [index, setIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? dataVideo.length - 1 : index - 1;
    setIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = index === dataVideo.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [index]);

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
              <div className="  flex-none -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              <div className="flex grow justify-center items-end h-[100%] gap-[20%]">
                <div className=" flex   items-center gap-[16px]  bg-white text-black rounded-xl  mb-[16px] p-[12px] cursor-pointer">
                  <BsFillPlayFill /> Lecture
                </div>
                <Link to="/description">
                  <div
                    className="    flex items-center gap-[16px] bg-black/50 text-white rounded-xl  mb-[16px] p-[12px] cursor-pointer"
                    onClick={() => setCurrentUrl(dataVideo[index].url)}
                    onKeyDown={() => setCurrentUrl(dataVideo[index].url)}
                    role="presentation"
                  >
                    <BsInfoCircle />
                    Plus d'infos
                  </div>
                </Link>
              </div>
              <div className=" flex-none -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Hero;
