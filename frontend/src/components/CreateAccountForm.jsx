import React, { useState } from "react";
import axios from "axios";
import CreateAccountMsg from "./CreateAccountMsg";
import NavBar from "./NavBar/NavBar";

function CreateAccountForm() {
  const [isClicked, setIsClicked] = useState(false);

  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users`, data)
      .then(() => {
        setIsClicked(!isClicked);
      })
      .catch((err) => console.warn(err));
  };

  return isClicked ? (
    <CreateAccountMsg />
  ) : (
    <>
      <NavBar />
      <div className="flex gap-8 flex-col border-white px-10 mx-auto max-w-xs md:max-w-md my-10 rounded-[31px]shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <h2 className=" text-2xl md:text-4xl font-extrabold text-center mb-10 ">
          Inscription
        </h2>

        <form onSubmit={saveUser}>
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
              className="w-full mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-3"
            >
              Je m'inscris
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAccountForm;
