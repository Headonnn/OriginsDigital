import React, { useState } from "react";
import PropTypes from "prop-types";

function BlockFAQ({ question, reponse }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-4 mt-8 text-sm md:text-md">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsClicked(!isClicked)}
        onKeyDown={() => setIsClicked(!isClicked)}
        className="duration-300 bg-black text-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 focus:outline-none hover:text-black"
      >
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
        >
          <span className="flex text-md font-semibold">{question}</span>

          <svg
            className={`${
              isClicked
                ? "w-6 h-6 duration-300 rotate-180"
                : "w-6 h-6 duration-300 "
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`${
            isClicked
              ? "px-4 pb-5 duration-300 sm:px-6 sm:pb-6"
              : "px-4 pb-5 sm:px-6 sm:pb-6  hidden"
          }`}
        >
          <p>{reponse}</p>
        </div>
      </div>
    </div>
  );
}

BlockFAQ.propTypes = {
  question: PropTypes.string.isRequired,
  reponse: PropTypes.string.isRequired,
};

export default BlockFAQ;
