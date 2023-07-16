import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";
import UnauthorizedMsg from "../components/UnauthorizedMsg";

function AdminMode() {
  const { dataLogin } = useContext(LoginContext);

  return (
    <div>
      <NavBar />
      {dataLogin?.is_admin ? (
        <div className="bg-gradient-to-br from-blue-900 flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="flex flex-col items-stretch space-y-8 md:space-y-10 mx-5">
            <Link to="/admin/video_list">
              <ButtonOrange className="w-full flex-grow rounded-sm md:rounded-md">
                Gérer les vidéos
              </ButtonOrange>
            </Link>
            <Link to="/admin/category_list">
              <ButtonOrange className="w-full flex-grow rounded-sm md:rounded-md">
                Gérer les catégories
              </ButtonOrange>
            </Link>
            <Link to="/admin/section">
              <ButtonOrange className="w-full flex-grow rounded-md">
                Gérer la page d'accueil
              </ButtonOrange>
            </Link>

            <Link to="/admin/user_list">
              <ButtonOrange className="w-full flex-grow rounded-md">
                Gérer les utilisateurs
              </ButtonOrange>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <UnauthorizedMsg />
        </div>
      )}
    </div>
  );
}

export default AdminMode;
