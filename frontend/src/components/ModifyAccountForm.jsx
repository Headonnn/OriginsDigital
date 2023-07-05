import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import CreateAccountMsg from "./CreateAccountMsg";

function ModifyAccountForm() {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveModifiedUser = (e) => {
    e.preventDefault();

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    };
    axios
      .put(`http://localhost:5002/users/:id`, data)
      .then((res) => {
        console.warn(res.data);
        setIsClicked(!isClicked);
        navigate("/login");
      })
      .catch((err) => console.warn(err));
  };
  return isClicked ? (
    <CreateAccountMsg />
  ) : (
    <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden text-white">
      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-6 py-10 mx-auto sm:max-w-md my-10 xl:p-0shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] rounded-[31px]">
        <div className="flex items-center gap-12 pb-6">
          <h1 className="text-2xl">Je souhaite modifier mes informations </h1>
          <NavLink to="/userprofile">
            {" "}
            <FaTimes className="cursor-pointer text-orange-500 w-10 h-10" />{" "}
          </NavLink>
        </div>
        <form onSubmit={saveModifiedUser}>
          <div>
            <label htmlFor="email" className="text-md">
              Username
            </label>
            <div className="py-2">
              <input
                onChange={handleInput}
                value={user.username}
                name="username"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Prénom" className="text-md ">
              Prénom
            </label>
            <div className="py-2">
              <input
                onChange={handleInput}
                value={user.firstname}
                name="firstname"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label htmlFor="Nom" className="text-md">
              Nom
            </label>
            <div className="py-2">
              <input
                onChange={handleInput}
                value={user.lastname}
                id="Nom"
                name="lastname"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label htmlFor="mail" className="text-md">
              E-mail
            </label>
            <div className="py-2">
              <input
                onChange={handleInput}
                value={user.email}
                id="e-mail"
                name="email"
                type="email"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-md">
              Password
            </label>
            <div className="py-2">
              <input
                onChange={handleInput}
                value={user.password}
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              JE VALIDE !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyAccountForm;
