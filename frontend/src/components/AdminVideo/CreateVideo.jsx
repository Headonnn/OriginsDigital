import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-tailwindcss-select";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import VideoContext from "../../../contexts/VideoContext";
import UploadWidget from "./UploadWidget";

function CreateVideo() {
  const { dataVideo, categorie } = useContext(VideoContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [videoFile, setVideoFile] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [vidUploaded, setVidUploaded] = useState(false);
  const [thumbUploaded, setThumbUploaded] = useState(false);
  const [videoSelected, setVideoSelected] = useState("");
  const [fileSelected, setFileSelected] = useState("");

  const [video, setVideo] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  const options = categorie.map((cate) => ({
    value: cate.name,
    label: cate.name,
    id: cate.id,
  }));

  const handleChangeCategories = (value) => {
    console.warn("value:", value);
    setCategories(value);
  };

  const handleInput = (e) => {
    e.persist();
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const saveVideo = async (e) => {
    e.preventDefault();
    if (!vidUploaded || !thumbUploaded) {
      return;
    }
    const data = {
      title: video.title,
      url: videoFile,
      description: video.description,
      thumbnail: thumbnailFile,
    };

    let videoID = 0;
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/videos`, data)
      .then((res) => {
        videoID = res.data.insertId;
        setIsClicked(!isClicked);
      })
      .catch((err) => console.warn(err));

    categories.map((cat) =>
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/videos_category`, {
          categoryId: cat.id,
          videoId: videoID,
        })

        .catch((err) => console.warn(err))
    );
  };

  const isFreemium = (id) => {
    const updatedSatutFreemium = dataVideo.map((vid) => {
      if (vid.id === id) {
        const videoStatutFreemium = !vid.is_freemium;
        const updatedVideo = {
          ...vid,
          is_freemium: videoStatutFreemium,
        };
        axios
          .put(`${import.meta.env.VITE_BACKEND_URL}/videos/${id}/is_freemium`, {
            isFreemium: videoStatutFreemium,
          })
          .then((res) => {
            console.warn(res.data);
          })
          .catch((err) => console.error(err));

        return updatedVideo;
      }
      return video;
    });
    console.warn(updatedSatutFreemium);
  };

  return (
    <>
      <NavBar />
      {isClicked ? (
        <div className="h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-16 px-8 max-w-md text-white rounded-[31px]">
            <p className="pt-8 pb-16 text-lg md:text-2xl ">
              La vidéo a bien été ajoutée !
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/video_list")}
                className="border text-white tracking-wide py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto ">
          <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
            <div className="flex justify-between items-center md:w-2/3 w-3/4">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/admin/video_list")}
                  className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/video_list")}
                  className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
                >
                  <BsArrowReturnLeft />
                </button>
              </div>
              <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
                Ajouter une vidéo
              </h2>
            </div>
            <form className="mt-6 flex flex-col " onSubmit={saveVideo}>
              <label htmlFor="videoLink" className="text-white flex flex-col">
                Fichier vidéo *
              </label>
              <UploadWidget
                accept="video/*"
                name="url"
                id="videoLink"
                setVideoFile={setVideoFile}
                thumbUploaded={thumbUploaded}
                setThumbUploaded={setThumbUploaded}
                vidUploaded={vidUploaded}
                setVidUploaded={setVidUploaded}
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                videoSelected={videoSelected}
                setVideoSelected={setVideoSelected}
              />

              <label htmlFor="videoTitle" className="text-white flex flex-col ">
                Titre*
                <input
                  type="text"
                  name="title"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  placeholder="Titre"
                  value={video.title}
                  onChange={handleInput}
                  required
                  maxLength={150}
                />
              </label>

              <label
                htmlFor="videoCategories"
                className="text-white flex flex-col mb-4"
              >
                Catégories
                <Select
                  value={categories}
                  options={options}
                  onChange={handleChangeCategories}
                  isMultiple="true"
                  isSearchable
                  name="category"
                  noOptionsMessage="Catégorie inexistante"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md"
                  placeholder="Catégories"
                  aria-label="Catégories"
                />
              </label>

              <label
                htmlFor="videoDescription"
                className="text-white flex flex-col"
              >
                Description
                <textarea
                  className="bg-white text-black w-full h-40 px-4 py-2 rounded-md mb-4"
                  name="description"
                  placeholder="Description"
                  value={video.description}
                  onChange={handleInput}
                />
              </label>

              <label
                htmlFor="videoThumbnail"
                className="text-white flex flex-col"
              >
                Thumbnail*{" "}
              </label>
              <UploadWidget
                accept="image/png, image/jpeg"
                name="thumbnail"
                id="videoThumbnail"
                setThumbnailFile={setThumbnailFile}
                thumbUploaded={thumbUploaded}
                setThumbUploaded={setThumbUploaded}
                vidUploaded={vidUploaded}
                setVidUploaded={setVidUploaded}
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                videoSelected={videoSelected}
                setVideoSelected={setVideoSelected}
              />

              <label
                htmlFor="togglePremium"
                className="text-white flex items-center gap-8 mt-6"
              >
                Vidéo Freemium ?
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 cursor-pointer"
                  onClick={() => isFreemium(video.id)}
                  onKeyPress={() => isFreemium(video.id)}
                  aria-label="Toggle Premium"
                />
              </label>

              <button
                type="submit"
                className="w-1/2 md:w-1/4 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-12"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateVideo;
