import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../../contexts/LoginContext";
import NavBar from "./NavBar/NavBar";

function UpdateUserProfile() {
  const { dataLogin, setDataLogin } = useContext(LoginContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (dataLogin) {
      axios
        .get(`http://localhost:5002/users/${dataLogin.id}`)
        .then((res) => setDataLogin(res.data))
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
      firstname: user.firstname,
      email: user.email,
      password: user.password,
      id,
    };

    axios
      .put(`http://localhost:5002/users/${data && data.id}/edit`, data)
      .then((res) => {
        console.warn(res.data, "OK conslog UpdateUser");
        setDataLogin(res.data);
        setIsClicked(!isClicked);
        localStorage.removeItem("token");
        setDataLogin(undefined);
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavBar />

      {dataLogin?.id && (
        <div className=" flex gap-8 flex-col border border-white px-10 py-8 mx-auto sm:max-w-md my-10 rounded-[31px]shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <button
            type="button"
            onClick={() => navigate("../userprofile")}
            className="border hover:bg-white tracking-wide text-white hover:text-black py-1 px-3 transition"
          >
            Retour
          </button>
          <h2 className=" text-white text-xl text-center">
            Mettez votre profil à jour :
          </h2>

          <form onSubmit={updateUser}>
            <div>
              <label htmlFor="email" className="text-gray-300">
                Prénom
              </label>
              <input
                onChange={handleInput}
                defaultValue={dataLogin.firstname}
                placeholder={dataLogin.firstname}
                name="firstname"
                type="text"
                required
                className="w-full text-blue-800 mb-5"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-300">
                Email
              </label>
              <input
                onChange={handleInput}
                defaultValue={dataLogin.email}
                placeholder={dataLogin.email}
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
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateUserProfile;
