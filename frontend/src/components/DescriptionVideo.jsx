import React from "react";

function DescriptionVideo() {
  return (
    <div className="description-video-container bg-black h-auto flex flex-col justify-center items-start px-4 md:px-20 lg:px-40 max-w-full overflow-hidden">
      {/* Titre */}
      <div className="text-white font-poppins mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mt-10">
          L'ile d'Oahu, le paradis du surf
        </h1>
      </div>
      {/* Description */}
      <div className="text-white font-poppins mb-8">
        <h2 className="text-base md:text-lg overflow-y-auto">
          L'île d'Oahu est l'une des îles principales de l'archipel d'Hawaï et
          est réputée pour être le paradis du surf. Située dans l'océan
          Pacifique, elle offre des conditions de surf exceptionnelles tout au
          long de l'année, attirant des surfeurs du monde entier. La côte nord
          d'Oahu est célèbre pour ses vagues spectaculaires, en particulier
          pendant la saison hivernale, lorsque des swells massifs génèrent des
          conditions de surf épiques. Des spots légendaires tels que Waimea Bay,
          Pipeline et Sunset Beach sont réputés pour leurs vagues puissantes et
          creuses, attirant les surfeurs professionnels et les passionnés de
          surf. La côte sud d'Oahu offre également de belles opportunités de
          surf, .......
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
