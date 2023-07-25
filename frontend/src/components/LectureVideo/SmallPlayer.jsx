import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import VideoContext from "../../../contexts/VideoContext";

function SmallPlayer() {
  const navigate = useNavigate();
  const { dataVideo } = useContext(VideoContext);
  const params = useParams();

  if (!dataVideo || !dataVideo[params.id]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col ">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hidden  md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition md:my-8"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none "
        >
          <BsArrowReturnLeft />
        </button>
      </div>
      <div className="flex justify-center bg-black relative">
        <ReactPlayer url={dataVideo[params.id].url} controls />
      </div>
    </div>
  );
}

export default SmallPlayer;
