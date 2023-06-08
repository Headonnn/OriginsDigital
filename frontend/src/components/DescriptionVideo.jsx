import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import VideoContext from "../../contexts/VideoContext";

function DescriptionVideo() {
  const { dataVideo } = useContext(VideoContext);
  const params = useParams();


  if (!dataVideo || !dataVideo[params.id]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center ">
      <div className="description-video-container  h-auto flex flex-col  items-start px-4 md:px-20 lg:px-40 max-w-full overflow-hidden">
        {/* Titre */}
        <div className="text-white font-poppins mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mt-10">
            {dataVideo[params.id].title}
          </h1>
        </div>
        {/* Description */}
        <div className="text-white font-poppins mb-8">
          <h2 className="text-base md:text-lg overflow-y-auto">
            {dataVideo[params.id].description}
          </h2>
        </div>
        {/* Catégorie */}
        <div className="text-white font-poppins mb-1">
          <h4 className="text-sm md:text-base font-medium">
            Catégorie : Surf, Documentaire
          </h4>
        </div>
        {/* Durée */}
        <div className="text-white font-poppins mb-1">
          <h5 className="text-sm md:text-base font-medium">Durée: 52 min</h5>
        </div>
        {/* Date de publication */}
        <div className="text-white font-poppins mb-1">
          <h6 className="text-sm md:text-base font-medium mb-6">
            Date de publication : {dataVideo[params.id].date}
          </h6>
        </div>
      </div>
      <div className="flex  items-center">
        <Link to={`/watch/${params.id}`}>
          <div className=" flex   items-center gap-[16px]  bg-white text-black rounded-xl  mb-[16px] p-[12px] cursor-pointer">
            <BsFillPlayFill /> Lecture
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DescriptionVideo;
