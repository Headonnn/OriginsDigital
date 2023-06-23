import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function CreateVideo() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [video, setVideo] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  const [error, setError] = useState("");

  const handleInput = (e) => {
    e.persist();
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const saveVideo = (e) => {
    e.preventDefault();
    if (!video.title || !video.url || !video.thumbnail) {
      setError("*Ce champ est obligatoire");
      return;
    }
    const data = {
      title: video.title,
      url: video.url,
      description: video.description,
      thumbnail: video.thumbnail,
    };
    axios
      .post(`http://localhost:5002/videos`, data)
      .then((res) => {
        console.warn(res.data);
        setIsClicked(!isClicked);
      })
      .catch((err) => console.warn(err));
  };

  const [isPremium, setIsPremium] = useState(false);

  const handlePremiumChange = () => {
    setIsPremium(!isPremium);
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
          <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto flex flex-col py-6 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
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
                Lien de la vidéo*
                <input
                  type="text"
                  name="url"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  placeholder="Lien de la vidéo"
                  value={video.url}
                  onChange={handleInput}
                />
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

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
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

              <label
                htmlFor="videoCategories"
                className="text-white flex flex-col"
              >
                Catégories
                <input
                  type="text"
                  name="category"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
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
                Thumbail*
                <input
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  name="thumbnail"
                  placeholder="thumbail"
                  value={video.thumbnail}
                  onChange={handleInput}
                />
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

              <label
                htmlFor="togglePremium"
                className="text-white flex items-center gap-8 mt-6"
              >
                Vidéo Freemium ?
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 cursor-pointer"
                  onClick={handlePremiumChange}
                  onKeyPress={handlePremiumChange}
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
