import React from "react";
import { Link } from "react-router-dom";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar/NavBar";

function AdminMode() {
  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <div className="flex flex-col items-center md:space-y-16 mx-5">
          <Link to="/admin/video_list">
            <ButtonOrange className="w-full flex-grow">
              Administration des vidéos
            </ButtonOrange>
          </Link>

          <ButtonOrange className="w-full flex-grow">
            Administration des catégories
          </ButtonOrange>

          <Link to="/admin/section">
            <ButtonOrange className="w-full flex-grow">
              Administration des sections
            </ButtonOrange>
          </Link>

          <Link to="/admin/permission">
            <ButtonOrange className="w-full flex-grow">
              Administration des utilisateurs
            </ButtonOrange>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminMode;
