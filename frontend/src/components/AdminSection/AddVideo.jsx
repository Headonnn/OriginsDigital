import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import VideoContext from "../../../contexts/VideoContext";

function AddVideo({ vidCarousel, setVidCarousel }) {
  const { dataVideo } = useContext(VideoContext);

  const handleAdd = (e) => {
    const target = e.target.id;
    const { checked } = e.target;
    setVidCarousel({ ...vidCarousel, [target]: checked });
  };

  const videoDetails = dataVideo.map((video) => {
    return (
      <tr
        className="hover:bg-gray-50 hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>{video.title}</td>
        <td className="text-sm text-center">
          <input
            type="checkbox"
            id={video.id}
            name={video.title}
            onChange={(e) => handleAdd(e)}
          />
        </td>
        <td />
      </tr>
    );
  });

  return (
    <div className=" flex flex-col items-start justify-start  w-full gap-2">
      <form>
        <table className="border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="px-6 py-4 text-lg">ID</th>
              <th className="px-6 py-4 text-lg">Titre</th>
            </tr>
          </thead>
          <tbody className="">{videoDetails}</tbody>
        </table>
      </form>
    </div>
  );
}
AddVideo.propTypes = {
  vidCarousel: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  setVidCarousel: PropTypes.func.isRequired,
};
export default AddVideo;
