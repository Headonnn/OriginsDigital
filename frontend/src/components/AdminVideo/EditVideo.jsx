import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-tailwindcss-select";
import { BsArrowReturnLeft } from "react-icons/bs";
import api from "../../../contexts/api";
import NavBar from "../NavBar/NavBar";
import VideoContext from "../../../contexts/VideoContext";
import UploadWidget from "./UploadWidget";

function EditVideo() {
  const navigate = useNavigate();
  const [vidUploaded, setVidUploaded] = useState(false);
  const [thumbUploaded, setThumbUploaded] = useState(false);
  const { categorie } = useContext(VideoContext);
  const [isClicked, setIsClicked] = useState(false);
  const [videoSelected, setVideoSelected] = useState("");
  const [fileSelected, setFileSelected] = useState("");
  const [categories, setCategories] = useState([]);
  const [videoFile, setVideoFile] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [editVideo, setEditVideo] = useState(false);
  const [editThumb, setEditThumb] = useState(false);
  const { id } = useParams();
  const [video, setVideo] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
    is_freemium: false,
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

  const toggleFreemium = () => {
    setVideo((vid) => ({
      ...vid,
      is_freemium: !vid.is_freemium,
    }));
  };

  useEffect(() => {
    api
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("cette video n'existe pas");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  }, [id]);

  useEffect(() => {
    setVideoFile(video.url);
    setThumbnailFile(video.thumbnail);
  }, [video]);

  const fetchData = async () => {
    try {
      const data = await api.get(
        `${import.meta.env.VITE_BACKEND_URL}/videos_category/get_category/${id}`
      );

      const newCate = data.data.map((cat) => {
        return {
          ...cat,
          label: cat.name,
          value: cat.name,
          id: cat.category_id,
        };
      });

      setCategories(newCate);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    e.persist();
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const updateVideo = async (e) => {
    e.preventDefault();

    if ((!thumbUploaded && videoSelected) || (!vidUploaded && fileSelected)) {
      return;
    }
    const date = new Date(video.date);
    const data = {
      title: video.title,
      url: videoFile,
      description: video.description,
      thumbnail: thumbnailFile,
      is_freemium: video.is_freemium,
      is_in_hero: video.is_in_hero,
      date: date.toISOString().slice(0, 19).replace("T", " "),
    };
    await api
      .put(`${import.meta.env.VITE_BACKEND_URL}/videos/${id}/edit`, data)
      .then(() => setIsClicked(!isClicked))
      .catch((err) => console.error(err));

    await api
      .delete(`${import.meta.env.VITE_BACKEND_URL}/videos_category/${id}`)
      .catch((err) => console.error(err));

    if (categories) {
      categories.forEach((cat) => {
        api
          .post(`${import.meta.env.VITE_BACKEND_URL}/videos_category`, {
            categoryId: cat.id,
            videoId: id,
          })
          .catch((err) => console.warn(err));
      });
    }
  };

  return (
    <>
      <NavBar />

      {isClicked ? (
        <div className="h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-16 px-8 max-w-md text-white rounded-[31px]">
            <p className="pt-8 pb-16 text-lg md:text-2xl ">
              La vidéo a bien été modifiée !
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
            <div className="flex justify-between items-center md:w-2/3 w-4/5">
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
                Modifier une vidéo
              </h2>
            </div>
            <form className="mt-6 flex flex-col" onSubmit={updateVideo}>
              <label htmlFor="videoLink" className="text-white flex flex-col">
                Lien de la vidéo*
              </label>
              <div className="flex justify-between">
                <div className="truncate mb-4">{video.url}</div>
                <div
                  onClick={() => setEditVideo(true)}
                  onKeyDown={() => setEditVideo(true)}
                  role="presentation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              {editVideo && (
                <UploadWidget
                  accept="video/*"
                  name="url"
                  id="videoLink"
                  setVideoFile={setVideoFile}
                  vidUploaded={vidUploaded}
                  setVidUploaded={setVidUploaded}
                  videoSelected={videoSelected}
                  setVideoSelected={setVideoSelected}
                  fileSelected={fileSelected}
                  setFileSelected={setFileSelected}
                />
              )}
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
                {" "}
              </label>
              Thumbail*
              <div className="flex justify-between">
                <div className="truncate mb-4">{video.thumbnail}</div>
                <div
                  onClick={() => setEditThumb(true)}
                  onKeyDown={() => setEditThumb(true)}
                  role="presentation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>
              {editThumb && (
                <UploadWidget
                  accept="image/png, image/jpeg"
                  name="thumbnail"
                  id="videoThumbnail"
                  setThumbnailFile={setThumbnailFile}
                  thumbUploaded={thumbUploaded}
                  setThumbUploaded={setThumbUploaded}
                  fileSelected={fileSelected}
                  setFileSelected={setFileSelected}
                  videoSelected={videoSelected}
                  setVideoSelected={setVideoSelected}
                />
              )}
              <label
                htmlFor="togglePremium"
                className="text-white flex items-center gap-8 mt-6"
              >
                Vidéo Freemium ?
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 cursor-pointer"
                  checked={video.is_freemium ? "checked" : ""}
                  onChange={() => toggleFreemium()}
                  onKeyPress={() => toggleFreemium()}
                  aria-label="Toggle Premium"
                />
              </label>
              <button
                type="submit"
                className="w-1/4 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-12"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default EditVideo;
