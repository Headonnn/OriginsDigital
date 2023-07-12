import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-tailwindcss-select";
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

    const data = {
      title: video.title,
      url: videoFile,
      description: video.description,
      thumbnail: thumbnailFile,
    };

    let videoID = 0;
    await axios
      .post(`http://localhost:5002/videos`, data)
      .then((res) => {
        videoID = res.data.insertId;
        setIsClicked(!isClicked);
      })
      .catch((err) => console.warn(err));

    categories.map((cat) =>
      axios
        .post(`http://localhost:5002/videos_category`, {
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
          .put(`http://localhost:5002/videos/${id}/is_freemium`, {
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
          <div className="bg-gradient-to-br from-blue-900 flex flex-col items-center justify-center py-16 px-8 max-w-md text-white rounded-[31px]">
            <p className="pt-8 pb-16 text-lg md:text-2xl ">
              La vidéo a bien été ajoutée !
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/video_list")}
                className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
          <div className="bg-gradient-to-br from-blue-900 mx-auto flex flex-col py-6 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
            <div className="px-2 md:px-7 max-w-md md:w-auto md:max-w-none md:h-[6rem] md:py-6 flex items-center justify-between ">
              <div>
                <h2 className="text-lg md:text-2xl">Ajouter une vidéo</h2>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6 md:text-lg transition"
                >
                  Retour
                </button>
              </div>
            </div>
            <form
              className="mt-6 flex flex-col px-3 md:px-6"
              onSubmit={saveVideo}
            >
              <label htmlFor="videoLink" className="text-white flex flex-col">
                Fichier vidéo *
              </label>
              <UploadWidget
                accept="video/*"
                name="url"
                id="videoLink"
                setVideoFile={setVideoFile}
              />

              <label htmlFor="videoTitle" className="text-white flex flex-col">
                Titre*
                <input
                  type="text"
                  name="title"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  placeholder="Titre"
                  value={video.title}
                  onChange={handleInput}
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
                Thumbnail*
                <UploadWidget
                  accept="image/png, image/jpeg"
                  name="thumbnail"
                  id="videoThumbnail"
                  setThumbnailFile={setThumbnailFile}
                />
              </label>

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
