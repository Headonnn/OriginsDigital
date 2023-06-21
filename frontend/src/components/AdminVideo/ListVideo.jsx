import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";
import VideoContext from "../../../contexts/VideoContext";
import NavBar from "../NavBar";

function ListVideo() {
  const { dataVideo } = useContext(VideoContext);

  const deleteVideo = (e, id) => {
    e.preventDefault();

    const clicked = e.currentTarget;
    clicked.innerText = "Suppression...";

    axios
      .delete(`http://localhost:5002/videos/${id}/delete`)
      .then((res) => {
        console.warn(res.data);
        clicked.closest("tr").remove();
      })
      .catch((error) => console.error(error));
  };

  const videoDetails = dataVideo.map((video) => {
    return (
      <tr
        className="hover:bg-gray-50 hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>{video.title}</td>
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
      <div className="loginid-container bg-black p-5 mt-10 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 to-022340 mx-auto flex flex-col px-3 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-3">
            <div className="flex justify-between items-center pb-20">
              <Link to="/admin/">
                <BiLeftArrow
                  className="text-xl mr-2"
                  style={{ color: "white" }}
                />
              </Link>
              <h2 className="text-2xl">Liste des vidéos</h2>
              <div>
                <button
                  type="button"
                  className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-6 transition"
                >
                  <Link to="/admin/video_create">Ajouter une video</Link>
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-lg">ID</th>
                    <th className="px-6 py-4 text-lg">Title</th>
                  </tr>
                </thead>
                <tbody className="">{videoDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListVideo;
