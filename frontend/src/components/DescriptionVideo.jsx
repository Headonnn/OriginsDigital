import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillPlayFill, BsShareFill } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import VideoContext from "../../contexts/VideoContext";

function DescriptionVideo() {
  const { dataVideo } = useContext(VideoContext);
  const params = useParams();

  if (!dataVideo || !dataVideo[params.id]) {
    return <div>Loading...</div>;
  }

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const currentPageUrl = window.location.href;

  return (
    <div>
      <div className="description-video-container h-auto flex flex-col max-w-full overflow-hidden">
        {/* Titre */}
        <div className="text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mt-10">
            {dataVideo[params.id].title}
          </h1>
        </div>
        {/* Description */}
        <div className="text-white mb-8">
          <h2 className="text-base md:text-lg overflow-y-auto">
            {dataVideo[params.id].description}
          </h2>
        </div>
        {/* Catégorie */}
        <div className="text-white mb-1">
          <h4 className="text-sm md:text-base font-medium">
            Catégorie : Surf, Documentaire
          </h4>
        </div>
        {/* Durée */}
        <div className="text-white mb-1">
          <h5 className="text-sm md:text-base font-medium">Durée: 52 min</h5>
        </div>
        {/* Date de publication */}
        <div className="text-white mb-[1rem]">
          <h6 className="text-sm md:text-base font-medium mb-6">
            Date de publication : {dataVideo[params.id].date.substring(0, 10)}
          </h6>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center mb-9">
          <Link to={`/watch/${params.id}`}>
            <div className=" hidden sm:flex items-center gap-[16px] border bg-black text-white rounded-xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
              <BsFillPlayFill /> Lecture
            </div>
            <div className="sm:hidden flex items-center gap-[16px] border bg-black text-white rounded-2xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
              <BsFillPlayFill />
            </div>
          </Link>
        </div>
        <div className="flex items-center mb-9">
          <div
            className={` ${
              isClicked
                ? "hidden"
                : "hidden sm:flex items-center gap-[16px] border rounded-xl mb-[16px] p-[12px] cursor-pointer bg-black text-white hover:bg-white hover:text-black"
            }`}
            onChange={handleClick}
          >
            <BsShareFill /> Partager
          </div>

          <div
            className={` ${
              isClicked
                ? "hidden"
                : "sm:hidden flex items-center gap-[16px] border bg-black text-white rounded-2xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition"
            }`}
            onChange={handleClick}
          >
            <BsShareFill />
          </div>

          <div
            className={` ${
              isClicked
                ? "sm:flex items-center gap-[16px] border rounded-xl mb-[8px] sm:mb-[16px] p-[5px] sm:p-[8px] cursor-pointer animate-fade-down animate-once animate-duration-500 animate-ease-linear animate-normal"
                : "hidden"
            }`}
            onChange={handleClick}
          >
            <EmailShareButton url={currentPageUrl}>
              <EmailIcon size={28} round />
            </EmailShareButton>
            <TwitterShareButton url={currentPageUrl}>
              <TwitterIcon size={28} round />
            </TwitterShareButton>
            <FacebookShareButton url={currentPageUrl}>
              <FacebookIcon size={28} round />
            </FacebookShareButton>
            <WhatsappShareButton url={currentPageUrl}>
              <WhatsappIcon size={28} round />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionVideo;
