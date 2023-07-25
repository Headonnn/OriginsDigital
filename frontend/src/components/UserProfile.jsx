import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SlPencil } from "react-icons/sl";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import NavBar from "./NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";

function UserProfile() {
  const { dataLogin, setDataLogin } = useContext(LoginContext);
  const [passwordInput, setPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const deleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${dataLogin.id}`, {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ password, id: dataLogin.id }),
      })
      .then(() => {
        localStorage.removeItem("token");
        setDataLogin(undefined);
        navigate("/");
      })
      .catch((error) => console.error(error, "OMG ERROR"));
  };

  return (
    <>
      <NavBar />

      <div className="flex gap-8 flex-col border-white px-10 mx-auto max-w-xs md:max-w-md my-10 rounded-[31px]shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <h2 className=" text-2xl md:text-4xl font-extrabold text-center mb-10 ">
          Votre profil
        </h2>
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
                    className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black py-1 px-3 transition"
                  >
                    Modifier
                  </button>
                </NavLink>
              )}
              <SlPencil className="md:hidden cursor-pointer my-4 mr-3 w-6 h-6" />
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
                    className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black py-1 px-3 transition"
                  >
                    Modifier
                  </button>
                </NavLink>
              )}
              <SlPencil className="md:hidden cursor-pointer my-4 mr-3 w-6 h-6" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-300">Mot de passe :</h3>
                <p className="text-white">* * * * * * * *</p>
              </div>
            </div>

            {passwordInput ? (
              <form>
                <div>
                  <label htmlFor="password" className="ml-1 text-red-500">
                    Veuillez confirmer avec votre mot de passe :
                  </label>
                  <input
                    type="password"
                    className="w-full text-blue-800 mb-5"
                    placeholder="*****"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <div className="flex justify-around">
                    <button
                      type="button"
                      onClick={() => setPasswordInput(!passwordInput)}
                      className="hidden md:block mx-auto bg-gradient-to-r text-center md:w-1/3 from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-2 sm:px-4 rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={() => setPasswordInput(!passwordInput)}
                      className="block md:hidden mx-auto text-center text-xl md:w-1/3 text-white py-3 px-3 border-2 border-blue-500 hover:border-blue-700 rounded-full "
                    >
                      <FaTimes />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => deleteUser(e)}
                      className="hidden md:block mx-auto bg-gradient-to-r text-center md:w-1/3 from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-2 px-1 sm:px-4 rounded-md"
                    >
                      Confirmer
                    </button>
                    <button
                      type="button"
                      onClick={(e) => deleteUser(e)}
                      className="block md:hidden mx-auto text-center text-xl md:w-1/3 text-white py-3 px-3 border-2 border-red-500 hover:border-red-700 rounded-full "
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <h3>Supprimer le compte :</h3>
                <button
                  type="button"
                  onClick={() => setPasswordInput(!passwordInput)}
                  className="hidden md:block border border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide py-1 px-3 transition"
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordInput(!passwordInput)}
                  className="md:hidden border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide py-1 px-3 transition"
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
              </div>
            )}
          </>
        ) : null}

        <div className="">
          <NavLink to="/">
            <button
              type="button"
              className="w-full mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-3"
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
