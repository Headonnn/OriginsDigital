import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BsFillPlayFill,
  BsShareFill,
  BsPlusLg,
  BsCheckLg,
} from "react-icons/bs";
import axios from "axios";
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
import LoginContext from "../../contexts/LoginContext";

function DescriptionVideo() {
  const { dataVideo } = useContext(VideoContext);
  const { dataLogin } = useContext(LoginContext);
  const [categ, setCateg] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [dataFavorites, setDataFavorites] = useState([]);
  const [dataDesc, setDataDesc] = useState(undefined);
  const params = useParams();
  const currentPageUrl = window.location.href;

  const fetchFavorites = () => {
    if (dataLogin) {
      axios
        .get(`http://localhost:5002/favorites/${dataLogin.id}`)
        .then((res) => {
          setDataFavorites(res.data);
          console.warn(res.data);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 404) {
              console.error("pas de favorites pour cet user");
            }
            if (err.response.status === 500) {
              console.error(err);
            }
          }
        });
    }
  };
  const handleAddToList = (clickedVideo) => {
    if (!dataFavorites.includes(parseInt(clickedVideo, 10))) {
      axios
        .post(`http://localhost:5002/favorites/add`, {
          userId: dataLogin.id,
          videoId: clickedVideo,
        })
        .then(() => {
          setDataFavorites([...dataFavorites, clickedVideo]);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .delete(
          `http://localhost:5002/favorites/${dataLogin.id}/${clickedVideo}`
        )
        .then(() => {
          let tmp = [...dataFavorites];
          tmp = tmp.filter((vid) => vid !== clickedVideo);
          setDataFavorites(tmp);
        })
        .catch((err) => console.error(err));
    }
  };
  useEffect(() => {
    fetchFavorites();

    setDataDesc(
      dataVideo.filter((e) => e.id === parseInt(params.id, 10) + 1)[0]
    );
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5002/videos_category/get_category/${
          parseInt(params.id, 10) + 1
        }`
      )
      .then((res) => {
        setCateg(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  if (!dataVideo || !dataDesc) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="description-video-container h-auto flex flex-col max-w-full overflow-hidden">
        {/* Titre */}
        <div className="text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mt-10">
            {dataDesc.title}
          </h1>
        </div>
        {/* Description */}
        <div className="text-white mb-8">
          <h2 className="text-base md:text-lg overflow-y-auto">
            {dataDesc.description}
          </h2>
        </div>
        {/* Catégorie */}
        <div className="text-white mb-1 flex gap-1">
          Catégorie :{" "}
          {categ.map((e) => {
            return (
              <h4 className="text-sm md:text-base font-medium">{e.name} </h4>
            );
          })}
        </div>

        {/* Date de publication */}
        <div className="text-white mb-[1rem]">
          <h6 className="text-sm md:text-base font-medium mb-6">
            Date de publication :{" "}
            {dataDesc.date && dataDesc.date.substring(0, 10)}
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
        <button
          className="flex items-center mb-9 "
          onClick={() => handleAddToList(parseInt(params.id, 10) + 1)}
          type="button"
        >
          {!dataFavorites.includes(parseInt(params.id, 10) + 1) ? (
            <>
              <div className=" hidden sm:flex items-center gap-[16px] border bg-black text-white rounded-xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                <BsPlusLg /> Ajouter à ma liste
              </div>
              <div className="sm:hidden flex items-center gap-[16px] border bg-black text-white rounded-2xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                <BsPlusLg />
              </div>
            </>
          ) : (
            <>
              <div className=" hidden sm:flex items-center gap-[16px] border bg-black text-white rounded-xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                <BsCheckLg /> Supprimer de ma liste
              </div>
              <div className="sm:hidden flex items-center gap-[16px] border bg-black text-white rounded-2xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition">
                <BsCheckLg />
              </div>
            </>
          )}
        </button>
        <div className="flex items-center mb-9">
          <button
            type="button"
            className={` ${
              isClicked
                ? "hidden"
                : "hidden sm:flex items-center gap-[16px] border rounded-xl mb-[16px] p-[12px] cursor-pointer bg-black text-white hover:bg-white hover:text-black"
            }`}
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <BsShareFill /> Partager
          </button>

          <button
            type="button"
            className={` ${
              isClicked
                ? "hidden"
                : "sm:hidden flex items-center gap-[16px] border bg-black text-white rounded-2xl mb-[16px] p-[12px] cursor-pointer hover:bg-white hover:text-black transition"
            }`}
            onClick={handleClick}
            onKeyDown={handleClick}
          >
            <BsShareFill />
          </button>
          <button
            type="button"
            className={` ${
              isClicked
                ? "sm:flex items-center gap-[16px] border rounded-xl mb-[8px] sm:mb-[16px] p-[5px] sm:p-[8px] cursor-pointer animate-fade-down animate-once animate-duration-500 animate-ease-linear animate-normal"
                : "hidden"
            }`}
            onClick={handleClick}
            onKeyDown={handleClick}
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
          </button>
        </div>
      </div>
    </div>
  );
}

export default DescriptionVideo;
