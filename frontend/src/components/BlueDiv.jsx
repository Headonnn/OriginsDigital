import React from "react";
import PropTypes from "prop-types";

function BlueDiv({ children }) {
  return (
    <div className="bg-gradient-to-br px-26 mx-6 from-blue-900 via-blue-900 to-022340 relative flex flex-col items-center justify-center text-white rounded-[31px] w-full h-screen">
      <div className="flex flex-col items-center space-y-4">{children}</div>
    </div>
  );
}

BlueDiv.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlueDiv;
