import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";
import VideoContext from "../../../contexts/VideoContext";
import NavBar from "../NavBar/NavBar";
import SearchVideos from "../SearchVideos";

function ManageVideos() {
  const { dataVideo, setDataVideo } = useContext(VideoContext);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filtre, setFiltre] = useState([]);
  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };
  useEffect(() => {
    const dataTemp = dataVideo;
    const filteredVideo = dataTemp.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltre(filteredVideo);
  }, [search, dataVideo]);
  const updateVideoList = () => {
    axios
      .get("http://localhost:5002/videos")
      .then((res) => setDataVideo(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateVideoList();
  }, [dataVideo]);

  const deleteVideo = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5002/videos/${id}/delete`)
      .then((res) => {
        console.warn(res.data);
        updateVideoList();
      })
      .catch((error) => console.error(error));
  };

  const isFreemium = (id) => {
    const updatedSatutFreemium = dataVideo.map((video) => {
      if (video.id === id) {
        const videoStatutFreemium = !video.is_freemium;
        const updatedVideo = {
          ...video,
          is_freemium: videoStatutFreemium,
        };
        axios
          .put(`http://localhost:5002/videos/${id}/is_freemium`, {
            isFreemium: videoStatutFreemium,
          })
          .then((res) => {
            console.warn(res.data);
          })
          .catch((error) => console.error(error));

        return updatedVideo;
      }
      return video;
    });
    console.warn(updatedSatutFreemium);
  };

  const videoDetails = filtre.map((video) => {
    return (
      <tr
        className="hover:bg-gray-50 hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>
          <div className="">{video.title}</div>
        </td>
        <td className="text-sm text-center">
          <button
            type="button"
            onClick={() => isFreemium(video.id)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={
                video.is_freemium
                  ? `h-6 w-6 cursor-pointer text-yellow-400`
                  : `h-6 w-6 cursor-pointer`
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 2l2.29 7.47h7.71l-5.89 4.28 2.32 7.5L12 17.71l-7.14 4.54 2.32-7.5L2 9.47h7.71L12 2z"
              />
            </svg>
          </button>
        </td>
        <td>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={(e) => deleteVideo(e, video.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <Link to={`/admin/videos/${video.id}/edit`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </Link>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between items-center md:w-2/3 w-3/4">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/")}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
              Liste des vidéos
            </h2>
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="w-full">
              <SearchVideos handleSearchChange={handleSearchChange} />
            </div>

            <button
              type="button"
              className="hidden md:block border hover:bg-white tracking-wide hover:text-black w-1/4 py-2 px-3 transition"
            >
              <Link to="/admin/add_video">Ajouter une video</Link>
            </button>
            <button
              type="button"
              className="md:hidden border  hover:bg-white tracking-wide hover:text-black py-2 px-2 transition"
            >
              <Link to="/admin/add_video">
                <AiOutlinePlus />
              </Link>
            </button>
          </div>

          <div className="flex justify-center">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="py-4 md:text-lg text-md">ID</th>
                  <th className="py-4 md:text-lg text-md">Titre</th>
                  <th className="py-4 md:text-lg text-md text-center">
                    Freemium
                  </th>
                </tr>
              </thead>
              <tbody className="">{videoDetails}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageVideos;
