import React from "react";
import { Link } from "react-router-dom";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar";

function AdminMode() {
  const handleButtonClick = () => {
    // Logique du bouton ici
  };

  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 pb-16 mx-auto my-10 xl:p-0shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <p className="text-white text-2xl py-12">Mode Admin</p>
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-36 md:space-y-16 mx-5">
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <Link to="/admin/video_list">
                <ButtonOrange
                  onClick={handleButtonClick}
                  className="w-full flex-grow"
                >
                  Administration des vidéos
                </ButtonOrange>
              </Link>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <ButtonOrange
                onClick={handleButtonClick}
                className="w-full flex-grow"
              >
                Administration des catégories
              </ButtonOrange>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <Link to="/admin/section">
                <ButtonOrange
                  onClick={handleButtonClick}
                  className="w-full flex-grow"
                >
                  Administration des sections
                </ButtonOrange>
              </Link>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <Link to="/admin/permission">
                <ButtonOrange
                  onClick={handleButtonClick}
                  className="w-full flex-grow"
                >
                  Administration des utilisateurs
                </ButtonOrange>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMode;
