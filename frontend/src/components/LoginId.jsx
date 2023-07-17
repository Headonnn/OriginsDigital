import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import LoginContext from "../../contexts/LoginContext";

function LoginId() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);

  const resetPage = () => {
    setLoginError(false);
    navigate("/login");
  };

  const { setDataLogin } = useContext(LoginContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.warn(response.data);
          localStorage.setItem("token", JSON.stringify(response.data));
          const decoded = jwtDecode(response.data.token);
          setDataLogin(decoded.cargo);
          console.warn(decoded.cargo);
          navigate("/");
        } else {
          throw new Error("throw-error level, Error during login attempt");
        }
      })
      .catch((error) => {
        console.error("Catch level, Error during login attempt", error);
        setLoginError(!loginError);
      });
  };

  return (
    <>
      {loginError ? (
        <div className="h-[60vh] flex items-center justify-center px-4 mx-auto mb-20 max-w-screen-md">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-white pt-8 pb-16 text-lg md:text-2xl ">
              Vos identifiants sont incorrects
            </p>
            <div className="flex justify-center">
              <NavLink to="/login">
                <button
                  type="button"
                  onClick={resetPage}
                  className="border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition"
                >
                  Retour
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center border border-white px-10 py-8 mx-auto sm:max-w-md my-10 text-white rounded-[31px]">
          <h2 className="text-white text-xl text-center mt-15">Connexion</h2>
          <div className="rounded-lg p-4 mt-16">
            <form onSubmit={handleLogin}>
              <div className="relative">
                <input
                  type="email"
                  className="text-black rounded-md px-3 py-3 mb-4 border-black  w-full md:w-96 pr-10"
                  placeholder="votre adresse mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="text-black rounded-md px-3 py-3 border border-black w-full md:w-106 pr-10"
                  placeholder="votre mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {passwordVisible ? (
                  <IoEyeSharp
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-900 w-6 h-6 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <IoEyeOffSharp
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-900 w-6 h-6 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <p className="text-white text-sm font-light font-poppins mt-2 ml-1">
                Mot de passe oublié ? Cliquez{" "}
                <span className="underline font-bold duration-200 hover:text-orange-600">
                  ici
                </span>
                .
              </p>
              <div className="flex flex-col space-y-2 mt-16 w-full">
                <button
                  type="submit"
                  className="w-full mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-3"
                >
                  S'identifier
                </button>

                <p className="mt-4 text-sm text-center">
                  Première visite sur Origins Digital ?{" "}
                  <NavLink to="/createaccountform">
                    <span className="font-bold duration-200 hover:text-orange-600">
                      Inscrivez-vous
                    </span>
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default LoginId;
