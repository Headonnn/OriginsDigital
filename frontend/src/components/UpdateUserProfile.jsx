import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../../contexts/LoginContext";
import NavBar from "./NavBar/NavBar";

function UpdateUserProfile() {
  const { dataLogin } = useContext(LoginContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    id,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5002/users/${dataLogin.id}`)
      .then((res) => setUser(res.data))
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
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const updateUser = (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    axios
      .put(`http://localhost:5002/users/${user.id}/edit`, data)
      .then((res) => {
        console.warn(res.data, "OK conslog UpdateUser");
        setIsClicked(!isClicked);
        navigate("/userprofile");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden text-white">
        <div className="flex flex-col items-center relative bg-gradient-to-br from-blue-900  px-6 py-10 mx-auto sm:max-w-md my-10 rounded-[31px]">
          <h2 className=" flex items-center gap-12 pb-6 text-2xl">
            Mettez votre profil à jour :
          </h2>

          <form onSubmit={updateUser}>
            <div>
              <label htmlFor="email" className="text-md">
                Username
              </label>
              <input
                onChange={handleInput}
                value={user.username}
                placeholder={user.username}
                name="username"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-md">
                Email
              </label>
              <input
                onChange={handleInput}
                value={user.email}
                placeholder={user.email}
                name="email"
                type="email"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-md">
                Password
              </label>
              <input
                onChange={handleInput}
                value={user.password}
                placeholder={user.password}
                name="password"
                type="password"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Je valide
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUserProfile;
