import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function UploadWidget({
  accept,
  name,
  id,
  setThumbnailFile,
  setVideoFile,
  thumbUploaded,
  setThumbUploaded,
  vidUploaded,
  setVidUploaded,
  thumbnailSelected,
  setThumbnailSelected,
  videoSelected,
  setVideoSelected,
}) {
  const [loading, setLoading] = useState("");

  const uploadFile = () => {
    const formData = new FormData();
    if (id === "thumbnailFile") {
      formData.append("file", thumbnailSelected);
    } else {
      formData.append("file", videoSelected);
    }

    formData.append("upload_preset", "erowiy6p");
    setLoading("chargement...");

    axios
      .post("http://api.cloudinary.com/v1_1/dgux3vxri/upload", formData)
      .then((res) => {
        if (id === "thumbnailFile") {
          setThumbnailFile(res.data.url);
          setLoading("envoyé !");
          setThumbUploaded(!thumbUploaded);
        } else {
          setVideoFile(res.data.url);
          setLoading("envoyé !");
          setVidUploaded(!vidUploaded);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <input
        type="file"
        className="bg-white text-black w-3/4 pl-1 py-2 rounded-md"
        multiple={false}
        onChange={(e) => {
          if (id !== "thumbnailFile") {
            setVideoSelected(e.target.files[0]);
          } else {
            setThumbnailSelected(e.target.files[0]);
          }
        }}
        accept={accept}
        name={name}
        id={id}
      />

      {((id !== "thumbnailFile" && videoSelected) ||
        (id === "thumbnailFile" && thumbnailSelected)) &&
      loading === "" ? (
        <button
          className="border hover:bg-white tracking-wide hover:text-black  py-1 px-3 text-sm md:px-6  md:text-lg transition"
          onClick={uploadFile}
          type="button"
        >
          Upload
        </button>
      ) : null}
      {loading !== "" && (
        <div className="tracking-wide py-1 px-3 text-sm md:px-6  md:text-lg ">
          {loading}{" "}
        </div>
      )}
    </div>
  );
}

UploadWidget.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  setThumbnailFile: PropTypes.func,
  setVideoFile: PropTypes.func,
  thumbUploaded: PropTypes.bool.isRequired,
  setThumbUploaded: PropTypes.func.isRequired,
  vidUploaded: PropTypes.bool.isRequired,
  setVidUploaded: PropTypes.func.isRequired,
  thumbnailSelected: PropTypes.objectOf(PropTypes.object()),
  setThumbnailSelected: PropTypes.func.isRequired,
  videoSelected: PropTypes.objectOf(PropTypes.object()),
  setVideoSelected: PropTypes.func.isRequired,
};

export default UploadWidget;
