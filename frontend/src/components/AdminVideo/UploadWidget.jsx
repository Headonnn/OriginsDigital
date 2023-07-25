import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
  fileSelected,
  setFileSelected,
  videoSelected,
  setVideoSelected,
}) {
  const [urlFile, setUrlFile] = useState("");
  const [loading, setLoading] = useState("");

  console.warn(urlFile);
  const uploadFile = () => {
    const formData = new FormData();
    if (id === "videoThumbnail") {
      formData.append("file", videoSelected);
    } else {
      formData.append("file", fileSelected);
    }

    formData.append("upload_preset", "erowiy6p");
    setLoading("chargement...");

    axios
      .post("http://api.cloudinary.com/v1_1/dgux3vxri/upload", formData)
      .then((res) => {
        setUrlFile(res.data.url);
        if (id === "videoThumbnail") {
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
          if (id !== "videoThumbnail") {
            setFileSelected(e.target.files[0]);
          } else {
            setVideoSelected(e.target.files[0]);
          }
        }}
        accept={accept}
        name={name}
        id={id}
      />

      {((id !== "videoThumbnail" && fileSelected) ||
        (id === "videoThumbnail" && videoSelected)) &&
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
  setThumbnailFile: PropTypes.func.isRequired,
  setVideoFile: PropTypes.func.isRequired,
  thumbUploaded: PropTypes.bool.isRequired,
  setThumbUploaded: PropTypes.func.isRequired,
  vidUploaded: PropTypes.bool.isRequired,
  setVidUploaded: PropTypes.func.isRequired,
  fileSelected: PropTypes.string.isRequired,
  setFileSelected: PropTypes.func.isRequired,
  videoSelected: PropTypes.string.isRequired,
  setVideoSelected: PropTypes.func.isRequired,
};

export default UploadWidget;
