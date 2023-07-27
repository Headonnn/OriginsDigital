import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";

function AddCategory() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [categories, setCategories] = useState({
    name: "",
  });
  const [error, setError] = useState("");

  const handleInput = (e) => {
    e.persist();
    setCategories({ ...categories, [e.target.name]: e.target.value });
  };
  const updateCategory = (e) => {
    e.preventDefault();
    if (categories.name === "") {
      setError("*Ce champ est obligatoire");
      return;
    }
    const data = {
      name: categories.name,
    };
    axios
      .post(`http://localhost:5002/categories`, data)
      .then((res) => {
        console.warn(res);
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
              La catégorie a bien été ajoutée!
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("../admin/category_list")}
                className="border text-white tracking-wide py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto my-12 ">
          <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
            <div className="flex justify-between gap-8 items-center md:w-2/3 w-3/4 mb-6">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("../admin/category_list")}
                  className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
                >
                  Retour
                </button>
                <button
                  type="button"
                  onClick={() => navigate("../admin/category_list")}
                  className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
                >
                  <BsArrowReturnLeft />
                </button>
              </div>
              <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
                Ajouter une catégorie
              </h2>
            </div>
            <form className="mt-6 flex flex-col px-3" onSubmit={updateCategory}>
              <label htmlFor="Username" className="text-white flex flex-col">
                Nom*
                <input
                  type="text"
                  name="name"
                  className="bg-white text-black w-full h-10 px-4 py-2 rounded-md mb-4"
                  placeholder="Le nom de votre catégorie"
                  value={categories.name}
                  onChange={handleInput}
                  required
                />
                <span className="text-orange-600 pb-3">{error}</span>
              </label>

              <button
                type="submit"
                className="w-1/4 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded-md my-12"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCategory;
