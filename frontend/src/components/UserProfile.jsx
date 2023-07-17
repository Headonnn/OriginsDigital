import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SlPencil } from "react-icons/sl";
import axios from "axios";
import NavBar from "./NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";

function UserProfile() {
  const { dataLogin, setDataLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const deleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5002/users/${dataLogin.id}`)
      .then((res) => {
        console.warn(res.data);
        localStorage.removeItem("token");
        setDataLogin(undefined);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-br from-blue-900 flex gap-8 flex-col px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <h2 className="text-white text-xl text-center ">Votre profil</h2>
        {dataLogin ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-300">Prénom, nom :</h3>
                <p className="text-white">
                  {dataLogin.firstname} {dataLogin.lastname}
                </p>
              </div>
              {dataLogin.id && (
                <NavLink to={`/updateuserprofile/${dataLogin.id}/edit`}>
                  <button
                    type="button"
                    className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black  py-1 px-3 transition"
                  >
                    Modifier
                  </button>
                </NavLink>
              )}
              <SlPencil className="md:hidden cursor-pointermy-4 mr-3 w-6 h-6" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-300">Email :</h3>
                <p className="text-white">{dataLogin.email}</p>
              </div>
              {dataLogin.id && (
                <NavLink to={`/updateuserprofile/${dataLogin.id}/edit`}>
                  <button
                    type="button"
                    className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black  py-1 px-3 transition"
                  >
                    Modifier
                  </button>
                </NavLink>
              )}
              <SlPencil className="md:hidden cursor-pointermy-4 mr-3 w-6 h-6" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-300">Mot de passe :</h3>
                <p className="text-white">* * * * * * * *</p>
              </div>
              {dataLogin.id && (
                <NavLink to={`/updateuserprofile/${dataLogin.id}/edit`}>
                  <button
                    type="button"
                    className="hidden md:block  border hover:bg-white tracking-wide text-white hover:text-black  py-1 px-3 transition"
                  >
                    [WIP]
                  </button>
                </NavLink>
              )}
              <SlPencil className="md:hidden cursor-pointer my-4 mr-3 w-6 h-6" />
            </div>

            <div className="flex justify-between items-center">
              <h3>Supprimer le compte :</h3>
              {dataLogin.id && (
                <>
                  <button
                    type="button"
                    onClick={(e) => deleteUser(e, dataLogin.id)}
                    className="hidden md:block border border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide py-1 px-3 transition"
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    onClick={(e) => deleteUser(e, dataLogin.id)}
                    className="md:hidden  border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide py-1 px-3 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </>
        ) : null}

        <div className="mt-10">
          <NavLink to="/">
            <button
              type="button"
              className="bg-gradient-to-r from-red-600 to-orange-500 rounded-md px-3 py-3 border-black w-full"
            >
              Retour à l'accueil
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
