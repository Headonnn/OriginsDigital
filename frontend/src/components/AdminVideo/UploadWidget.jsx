import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function UploadWidget({
  accept,
  name,
  id,
  setThumbnailFile,
  setVideoFile,
  isUploaded,
  setIsUploaded,
  setIsChosen,
  isChosen,
}) {
  const [fileSelected, setFileSelected] = useState("");
  const [urlFile, setUrlFile] = useState("");
  const [loading, setLoading] = useState("");

  console.warn(urlFile);
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", "erowiy6p");
    setLoading("chargement...");

    axios
      .post("http://api.cloudinary.com/v1_1/dgux3vxri/upload", formData)
      .then((res) => {
        setUrlFile(res.data.url);
        if (id === "videoThumbnail") {
          setThumbnailFile(res.data.url);
          setLoading("envoyé !");
          setIsUploaded(!isUploaded);
        } else {
          setVideoFile(res.data.url);
          setLoading("envoyé !");
          setIsUploaded(!isUploaded);
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
          setFileSelected(e.target.files[0]);
        }}
        accept={accept}
        name={name}
        id={id}
        onClick={() => setIsChosen(true)}
      />

      {isChosen && loading === "" ? (
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
  setIsUploaded: PropTypes.func.isRequired,
  setIsChosen: PropTypes.func.isRequired,
  isChosen: PropTypes.bool.isRequired,
  isUploaded: PropTypes.bool.isRequired,
};

export default UploadWidget;
