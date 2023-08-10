import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import ApiContext from "../../../contexts/ApiContext";
import VideoContext from "../../../contexts/VideoContext";
import NavBar from "../NavBar/NavBar";

function ManageCategory() {
  const { categorie, setCategorie } = useContext(VideoContext);
  const navigate = useNavigate();

  const updateCategoryList = () => {
    ApiContext.get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      .then((res) => setCategorie(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateCategoryList();
  }, [categorie]);

  const deleteCategory = (e, id) => {
    e.preventDefault();

    ApiContext.delete(
      `${import.meta.env.VITE_BACKEND_URL}/categories/${id}/delete`
    )
      .then(() => updateCategoryList())
      .catch((error) => console.error(error));
  };

  const categoryDetails = categorie.map((cat) => {
    return (
      <tr className="hover:bg-gray-50 hover:text-black transition" key={cat.id}>
        <td>{cat.id}</td>
        <td>{cat.name}</td>
        <td>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={(e) => deleteCategory(e, cat.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <Link to={`/admin/category/${cat.id}/edit`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </Link>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg mx-auto ">
        <div className="flex flex-col px-6 my-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white">
          <div className="flex justify-between gap-8 items-center md:w-2/3 w-3/4">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/admin/")}
                className="hidden md:block border hover:bg-white tracking-wide hover:text-black py-1 px-3 text-sm md:px-6  md:text-lg transition"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/")}
                className="md:hidden text-white  hover:bg-white border hover:text-black duration-200 border-white p-2 focus:outline-none"
              >
                <BsArrowReturnLeft />
              </button>
            </div>
            <h2 className=" text-2xl md:text-4xl font-extrabold text-center ">
              Liste des catégories
            </h2>
          </div>
          <div className="flex items-center w-full justify-end">
            <button
              type="button"
              className="hidden md:block border hover:bg-white tracking-wide hover:text-black w-1/4 py-2 px-3 transition"
            >
              <Link to="/admin/add_category">Ajouter une catégorie</Link>
            </button>
            <button
              type="button"
              className="md:hidden border  hover:bg-white tracking-wide hover:text-black py-2 px-2 transition"
            >
              <Link to="/admin/add_category">
                <AiOutlinePlus />
              </Link>
            </button>
          </div>

          <div className="flex justify-center">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="py-4 text-lg">ID</th>
                  <th className="py-4 text-lg text-left">Categorie</th>
                </tr>
              </thead>
              <tbody>{categoryDetails}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCategory;
