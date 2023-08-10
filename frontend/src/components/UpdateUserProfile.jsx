import React, { useEffect, useContext, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ApiContext from "../../contexts/ApiContext";
import LoginContext from "../../contexts/LoginContext";
import NavBar from "./NavBar/NavBar";

function UpdateUserProfile() {
  const { dataLogin, setDataLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [isClicked, setIsClicked] = useState(false);

  const fetchUser = () => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/users/${dataLogin.id}`)
      .then((res) => {
        setDataLogin(res.data);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("PB UseEff UpdateUser");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  };
  useEffect(() => {
    if (dataLogin) {
      fetchUser();
    }
  }, [id]);

  const [user, setUser] = useState({
    firstname: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = (e) => {
    e.preventDefault();

    const data = {
      firstname: user.firstname || dataLogin.firstname,
      lastname: user.lastname || dataLogin.lastname,
      email: user.email || dataLogin.email,
      password: user.password,
      id,
    };

    ApiContext.put(
      `${import.meta.env.VITE_BACKEND_URL}/users/${data && data.id}/edit`,
      data
    )
      .then(() => {
        ApiContext.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${data.id}/modify`
        ).then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            ApiContext.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
            const decoded = jwtDecode(localStorage.getItem("token"));
            setDataLogin(decoded);
          } else {
            throw new Error("throw-error level, Error during login attempt");
          }
        });
        setIsClicked(!isClicked);
      })
      .catch((err) => console.error(err));
  };

  return isClicked ? (
    <>
      <NavBar />

      <div className="flex flex-col items-center px-10 py-8 mx-auto max-w-xs md:max-w-md my-10 text-center text-white">
        <h2 className="flex items-center gap-12 pb-6">Félicitations !</h2>
        <p className="pb-8">Votre compte à été modifié avec succès.</p>
        <NavLink to="/userprofile">
          <button
            type="button"
            className="w-full mx-auto border-2 border-white text-white py-2 px-4  my-3"
          >
            Retour
          </button>
        </NavLink>
      </div>
    </>
  ) : (
    <>
      <NavBar />

      {dataLogin?.id && (
        <div className="flex gap-8 flex-col border-white px-10 mx-auto max-w-xs md:max-w-md my-10 rounded-[31px]shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <h2 className=" text-2xl md:text-4xl font-extrabold text-center mb-10 ">
            Modifier votre profil
          </h2>
          {dataLogin && (
            <form onSubmit={updateUser}>
              <div>
                <label htmlFor="email" className="text-gray-300">
                  Rappelez-nous votre prénom ?
                </label>
                <input
                  onChange={handleInput}
                  defaultValue={dataLogin.firstname}
                  name="firstname"
                  type="text"
                  required
                  className="w-full text-blue-800 mb-5"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-300">
                  Rappelez-nous votre nom ?
                </label>
                <input
                  onChange={handleInput}
                  defaultValue={dataLogin.lastname}
                  name="lastname"
                  type="text"
                  required
                  className="w-full text-blue-800 mb-5"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-300">
                  Rappelez-nous votre email ?
                </label>
                <input
                  onChange={handleInput}
                  defaultValue={dataLogin.email}
                  name="email"
                  type="email"
                  required
                  className="w-full text-blue-800 mb-5"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-300">
                  Veuillez confirmer avec votre mot de passe
                </label>
                <input
                  onChange={handleInput}
                  defaultValue={dataLogin.password}
                  placeholder="*****"
                  name="password"
                  type="password"
                  required
                  className="w-full text-blue-800 mb-5"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-5"
                >
                  Je valide
                </button>
              </div>
              <button
                type="button"
                onClick={() => navigate("../userprofile")}
                className="border w-full hover:bg-white tracking-wide text-white hover:text-black py-1 px-3 transition"
              >
                Annuler
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default UpdateUserProfile;
