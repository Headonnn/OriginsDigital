import React from "react";
import PropTypes from "prop-types";

function SearchVideos({ handleSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center md:gap-12 text-black ">
      <div className="md:w-80 w-full md:my-8 my-2">
        <div className="flex items-center w-full h-10 focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            onChange={handleSearchChange}
            className="peer h-full w-full border-none pr-2 focus:ring-0"
            type="text"
            id="search"
            placeholder="Rechercher une vidéo..."
          />
        </div>
      </div>
    </div>
  );
}

SearchVideos.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
};

export default SearchVideos;
