import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

function CreateAccountForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          username,
          email,
          firstname,
          lastname,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.warn(response);
          navigate("/login");
        } else {
          throw new Error("else, Error submitting new form data");
        }
      })
      .catch((error) => {
        console.error("catch, Error submitting new form data:", error);
      });
  };

  return (
    <div className="loginid-container bg-black min-h-screen p-5 pt-20 pb-20 relative overflow-hidden">
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] left-[60px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute bottom-[-10px] right-[60px]"
        style={{
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 30% 100%, 0 100%)",
        }}
      />
      <div
        className="bg-gradient-to-r from-red-600 to-orange-500 rounded-full w-72 h-72 absolute top-[0px] left-1/2 transform -translate-x-1/2"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      />

      <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 xl:p-0shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
        <div>
          <NavLink to="/login">
            {" "}
            <FaTimes className="absolute top-8 right-8 cursor-pointer text-orange-500 w-10 h-10" />{" "}
          </NavLink>
        </div>
        <h1 className="text-white text-3xl font-bold font-poppins text-center mt-15">
          Création de votre compte
        </h1>
        <form onSubmit={handleSubmit} className=" rounded-lg p-4 ">
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-bold font-poppins text-white"
            >
              Votre Username
            </label>
            <div className="py-2">
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="Username"
                name="Username"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="Prénom"
              className="block text-xl font-bold font-poppins text-white "
            >
              Prénom
            </label>
            <div className="py-2">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                id="Prénom"
                name="Prénom"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Nom"
              className="block text-xl font-bold font-poppins text-white"
            >
              Nom
            </label>
            <div className="py-2">
              <input
                onChange={(e) => setLastname(e.target.value)}
                id="Nom"
                name="Nom"
                type="text"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="mail"
              className="block text-xl font-bold font-poppins text-white"
            >
              E-mail
            </label>
            <div className="py-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="e-mail"
                name="e-mail"
                type="email"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xl font-bold font-poppins text-white"
            >
              Password
            </label>
            <div className="py-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg text-blue-800"
              />
            </div>
          </div>

          <div className="flex pt-4 items-center ">
            <input
              id="terms-and-privacy"
              name="terms-and-privacy"
              type="checkbox"
              className=""
            />
            <label
              htmlFor="terms-and-privacy"
              className="ml-2 block text-sm text-white"
            >
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
          </div>

          <div className="mt-4">
            {/* <NavLink to="/login"> */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-m font-bold text-white font-poppins bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {" "}
              JE M'INSCRIS !
            </button>
            {/* </NavLink> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
