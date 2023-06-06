import React, { useState, useEffect } from "react";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsFillPlayFill,
  BsInfoCircle,
} from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Hero() {
  const test = [
    {
      url: "https://images.unsplash.com/photo-1506316940527-4d1c138978a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      name: "Magnifique video de velo",
    },
    {
      url: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VyZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Magnifique video de surf",
    },
    {
      url: "https://images.unsplash.com/photo-1595971649687-0901985665a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGV0YW5xdWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      name: "Magnifique video de petanque",
    },
  ];
  const [index, setIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? test.length - 1 : index - 1;
    setIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = index === test.length - 1;
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
    <div className="absolute left-0 right-0 h-[40vh] w-full m-auto  group ">
      <div
        style={{ backgroundImage: `url(${test[index].url})` }}
        className="w-full h-full  bg-center bg-cover duration-500"
      >
        <div className="flex h-[85%] gap-[10%] justify-center items-end  ">
          <div className=" flex gap-[16px] justify-around items-center py-2  bg-white text-black rounded-xl px-2 ">
            <BsFillPlayFill /> Lecture
          </div>
          <div className=" py-2 gap-[16px] flex justify-around items-center bg-black/50 text-white rounded-xl px-2 ">
            <BsInfoCircle />
            Plus d'infos
          </div>
        </div>
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center">
        <div className=" py-2 absolute  bottom-0">
          <div className="flex justify-center">
            {test.map((e, i) => (
              <div
                role="presentation"
                key={test[i].url}
                onClick={() => setIndex(i)}
                onKeyDown={() => setIndex(i)}
                className={index === i ? "text-white" : "text-black/20"}
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
