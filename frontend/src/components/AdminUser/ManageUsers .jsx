import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { TfiExport } from "react-icons/tfi";
import VideoContext from "../../../contexts/VideoContext";
import NavBar from "../NavBar/NavBar";

function ManageUsers() {
  const { dataUser, setDataUser } = useContext(VideoContext);

  const navigate = useNavigate();

  // export CSV

  const headers = [
    { label: "ID", key: "id" },
    { label: "Username", key: "username" },
    { label: "E-Mail", key: "email" },
    { label: "Prénom", key: "firstname" },
    { label: "Nom", key: "lastname" },
    { label: "Admin", key: "is_admin" },
  ];

  const csvReport = {
    filename: "usersList.csv",
    headers,
    data: dataUser,
  };

  const updateUserList = () => {
    axios
      .get("http://localhost:5002/users")
      .then((res) => setDataUser(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateUserList();
  }, [dataUser]);

  const deleteUser = (e, id) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5002/users/${id}`)
      .then((res) => {
        console.warn(res.data);
        updateUserList();
      })
      .catch((error) => console.error(error));
  };

  const toggleAdmin = (id) => {
    const updatedUsers = dataUser.map((userItem) => {
      if (userItem.id === id) {
        const newAdminStatus = !userItem.is_admin;
        const updatedUser = {
          ...userItem,
          is_admin: newAdminStatus,
        };
        axios
          .put(`http://localhost:5002/users/${id}`, {
            isAdmin: newAdminStatus,
          })
          .then((res) => {
            console.warn(res.data);
          })
          .catch((error) => console.error(error));

        return updatedUser;
      }
      return userItem;
    });
    console.warn(updatedUsers);
  };

  const userDetails = dataUser.map((user) => {
    return (
      <tr
        className="hover:bg-gray-50 hover:text-black transition"
        key={user.id}
      >
        <td className="text-sm">{user.id}</td>
        <td className="text-sm">{user.username}</td>
        <td className="text-sm">{user.email}</td>
        <td className="text-sm text-center">
          <button
            type="button"
            onClick={() => toggleAdmin(user.id)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={
                user.is_admin
                  ? `h-6 w-6 cursor-pointer text-yellow-400`
                  : `h-6 w-6 cursor-pointer`
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 2l2.29 7.47h7.71l-5.89 4.28 2.32 7.5L12 17.71l-7.14 4.54 2.32-7.5L2 9.47h7.71L12 2z"
              />
            </svg>
          </button>
        </td>
        <td className="flex justify-end gap-4">
          <button
            type="button"
            onClick={(e) => deleteUser(e, user.id)}
            className="hover:text-red"
          >
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
          <Link to={`/admin/users/${user.id}/edit`}>
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
        </td>
      </tr>
    );
  });

  return (
    <div>
      <NavBar />
      <div className="p-5 ">
        <div className="bg-gradient-to-br from-blue-900 my-10 to-022340 mx-auto flex flex-col px-6 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="flex justify-between items-center pb-5">
            <button
              type="button"
              onClick={() => navigate("/admin/")}
              className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition"
            >
              Retour
            </button>

            <h2 className="text-2xl">Gestion des utilisateurs</h2>
            <div>
              <button
                type="button"
                className="border hover:bg-white tracking-wide hover:text-black rounded-xl py-2 px-6 transition"
              >
                <Link to="/admin/users/add_user">Ajouter un utilisateur</Link>
              </button>
            </div>
          </div>
          <div className="flex justify-end pb-20">
            <CSVLink
              {...csvReport}
              className=" flex items-center gap-2 border hover:bg-white tracking-wide hover:text-black rounded-lg py-1 px-3 text-sm transition"
            >
              <TfiExport />
              <p>Export csv</p>
            </CSVLink>
          </div>
          <div className="flex justify-center items-center">
            <table className=" w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="py-4 text-lg">ID</th>
                  <th className="py-4 text-lg">UserName</th>
                  <th className="py-4 text-lg">Email</th>
                  <th className="py-4 text-lg text-center">Admin</th>
                </tr>
              </thead>
              <tbody>{userDetails}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
