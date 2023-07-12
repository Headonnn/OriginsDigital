import React from "react";
import PropTypes from "prop-types";

function ButtonOrange({ onClick, children }) {
  return (
    <button
      type="button"
      className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-regular text-base font-poppins text-md rounded-md px-3 py-3 border border-black hover:outline-none hover:border-blue-500 w-full md:w-[12rem] md:h-[3.5rem]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

ButtonOrange.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonOrange;
