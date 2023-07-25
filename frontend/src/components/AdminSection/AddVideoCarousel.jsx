import React from "react";
import { PropTypes } from "prop-types";

function AddVideoCarousel({ vidCarousel, setVidCarousel, filtre }) {
  const handleAdd = (e) => {
    const target = e.target.id;
    const { checked } = e.target;
    setVidCarousel({ ...vidCarousel, [target]: checked });
  };

  const videoDetails = filtre.map((video) => {
    let check = false;
    if (vidCarousel) {
      let selected = Object.entries(vidCarousel).filter((el) => el[1] === true);
      selected = selected.map((el) => parseInt(el[0], 10));
      check = !!selected.includes(video.id);
    }
    return (
      <tr
        className="hover:bg-gray-50  hover:text-black transition"
        key={video.id}
      >
        <td>{video.id}</td>
        <td>{video.title}</td>
        <td className="text-sm text-right">
          <input
            type="checkbox"
            id={video.id}
            name={video.title}
            onChange={(e) => handleAdd(e)}
            checked={check}
          />
        </td>
        <td />
      </tr>
    );
  });

  return (
    <div className="    w-full gap-2">
      <form>
        <table className=" text-left w-full text-sm">
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
AddVideoCarousel.propTypes = {
  vidCarousel: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  setVidCarousel: PropTypes.func.isRequired,
  filtre: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.bool, PropTypes.number, PropTypes.string)
  ),
};
export default AddVideoCarousel;
