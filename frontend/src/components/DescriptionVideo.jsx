import React, { useContext } from "react";
import VideoContext from "../../contexts/VideoContext";

function DescriptionVideo() {
  const { currentVideo } = useContext(VideoContext);
  return (
    <div className="description-video-container bg-black h-auto flex flex-col justify-center items-start px-4 md:px-20 lg:px-40 max-w-full overflow-hidden">
      {/* Titre */}
      <div className="text-white font-poppins mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mt-10">
          {currentVideo.title}
        </h1>
      </div>
      {/* Description */}
      <div className="text-white font-poppins mb-8">
        <h2 className="text-base md:text-lg overflow-y-auto">
          {currentVideo.description}
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
          Date de publication : 01.01.23
        </h6>
      </div>
    </div>
  );
}

export default DescriptionVideo;
