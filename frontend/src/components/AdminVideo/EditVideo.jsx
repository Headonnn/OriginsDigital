import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-tailwindcss-select";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import VideoContext from "../../../contexts/VideoContext";
import UploadWidget from "./UploadWidget";

function EditVideo() {
  const navigate = useNavigate();
  const { categorie } = useContext(VideoContext);
  const [isClicked, setIsClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [videoFile, setVideoFile] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
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
  const [error, setError] = useState("");

  const toggleFreemium = () => {
    setVideo((vid) => ({
      ...vid,
      is_freemium: !vid.is_freemium,
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5002/videos/${id}`)
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
      const data = await axios.get(
        `http://localhost:5002/videos_category/get_category/${id}`
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
    if (!video.title || !video.url || !video.thumbnail) {
      setError("*Ce champ est obligatoire");
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
    await axios
      .put(`http://localhost:5002/videos/${id}/edit`, data)
      .then((res) => {
        console.warn(res.data);
        setIsClicked(!isClicked);
      })
      .catch((err) => console.error(err));

    await axios
      .delete(`http://localhost:5002/videos_category/${id}`)

      .catch((err) => console.error(err));

    if (categories) {
      categories.forEach((cat) => {
        axios
          .post(`http://localhost:5002/videos_category`, {
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
            <p className="text-white pt-8 pb-16 text-lg md:text-2xl ">
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
        <div className="loginid-container bg-black min-h-screen my-12 overflow-hidden">
          <div className="mx-auto flex flex-col sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
            <div className="flex justify-between px-3 items-center md:w-2/3 w-3/4 mb-6">
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
            <form className="mt-6 flex flex-col px-3" onSubmit={updateVideo}>
              <label htmlFor="videoLink" className="text-white flex flex-col">
                Lien de la vidéo*
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
                <span className="text-orange-600 pb-3">{error}</span>
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
                Thumbail*
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
