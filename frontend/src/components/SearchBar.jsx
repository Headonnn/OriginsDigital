import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";

function SearchBar({ handleSearchChange, handleChangeCategory }) {
  const [categ, setCateg] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((res) => setCateg(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center  mb-8 mt-12 gap-8 ">
      <div className="w-80 md:w-1/3 ">
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
      <select
        className="h-10 focus:ring-0 cursor-pointer "
        onChange={handleChangeCategory}
      >
        <option value="">Catégories</option>
        {categ.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

SearchBar.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleChangeCategory: PropTypes.func.isRequired,
};

export default SearchBar;
