import React, { useState } from "react";
import axios from "axios";
import CreateAccountMsg from "./CreateAccountMsg";
import NavBar from "./NavBar/NavBar";

function CreateAccountForm() {
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

  const saveUser = (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    };

    axios
      .post(`http://localhost:5002/users`, data)
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
      <div className="loginid-container bg-black min-h-screen p-5 relative overflow-hidden text-white">
        <div className="flex flex-col items-center border border-white px-8 py-8 mx-auto max-w-md my-10 text-white">
          <div className="flex items-center gap-12 pb-6">
            <h1 className="text-xl">Création de votre compte</h1>
          </div>
          <form onSubmit={saveUser}>
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

            {/* <div className="flex pt-4 items-center">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
              />
              <label htmlFor="terms-and-privacy" className="ml-2 mt-2 text-sm">
                J'ai lu et j'accepte les
                <a href="/" className="text-indigo-300 hover:text-indigo-500">
                  {" "}
                  Conditions{" "}
                </a>
                et la
                <a href="/" className="text-indigo-300 hover:text-indigo-500">
                  {" "}
                  Politique de Confidentialité{" "}
                </a>
                .
              </label>
            </div> */}

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
      </div>
    </>
  );
}

export default CreateAccountForm;
