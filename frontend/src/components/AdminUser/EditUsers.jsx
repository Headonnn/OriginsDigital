import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";

function EditUsers() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { id } = useParams();
  const [users, setUsers] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            console.error("cet utilisateur n'existe pas");
          }
          if (err.response.status === 500) {
            console.error(err);
          }
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  const updateUser = (e) => {
    e.preventDefault();
    if (users.email === "") {
      setError("*Ce champ est obligatoire");
      return;
    }
    const data = {
      firstname: users.firstname,
      lastname: users.lastname,

      email: users.email,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/edit`, data)
      .then((res) => {
        console.warn(res.data);
        setIsClicked(!isClicked);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <NavBar />

      {isClicked ? (
        <div className="h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-16 px-8 max-w-md text-white rounded-[31px]">
            <p className="text-white pt-8 pb-16 text-lg md:text-2xl ">
              L'utilisateur a bien été modifié !
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("../admin/user_list")}
                className="border text-white tracking-wide py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto ">
          <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
            <div className="flex justify-between items-center md:w-2/3 w-4/5">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/admin/user_list")}
                  className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/user_list")}
                  className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
                >
                  <BsArrowReturnLeft />
                </button>
              </div>
              <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
                Modifier un utilisateur
              </h2>
            </div>
            <form className="mt-6 flex flex-col" onSubmit={updateUser}>
              <label htmlFor="userEmail" className="text-white flex flex-col">
                Email*
                <input
                  type="text"
                  name="email"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  placeholder="Votre email"
                  value={users.email}
                  onChange={handleInput}
                />
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

              <label htmlFor="firstname" className="text-white flex flex-col">
                Prénom
                <input
                  className="bg-white text-black w-full px-4 py-2 rounded-md mb-4"
                  name="firstname"
                  type="text"
                  placeholder="Votre prénom"
                  value={users.firstname}
                  onChange={handleInput}
                />
              </label>

              <label
                htmlFor="userLastname"
                className="text-white flex flex-col"
              >
                Nom*
                <input
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  name="lastname"
                  type="text"
                  placeholder="Votre nom de famille"
                  value={users.lastname}
                  onChange={handleInput}
                />
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

              <button
                type="submit"
                className="w-1/4 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-12"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUsers;
