import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiLeftArrow } from "react-icons/bi";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AdminRightPermission() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5002/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteUser = (e, id) => {
    e.preventDefault();

    const clicked = e.currentTarget;

    axios
      .delete(`http://localhost:5002/user/${id}`)
      .then((res) => {
        console.warn(res.data);
        clicked.closest("tr").remove();
      })
      .catch((error) => console.error(error));
  };

  const toggleAdmin = (id) => {
    const updatedUsers = users.map((userItem) => {
        if (userItem.id === id) {
          const newAdminStatus = !userItem.is_admin;
          const updatedUser = {
            ...userItem,
            is_admin: newAdminStatus,
            text: newAdminStatus ? "Admin" : "non-Admin",
          };
      
          // Effectuer la requête PUT ou PATCH pour mettre à jour le statut admin/non-admin dans la base de données
          axios
            .put(`http://localhost:5002/user/${id}`, { is_admin: newAdminStatus })
            .then((res) => {
              console.warn(res.data);
            })
            .catch((error) => console.error(error));
      
          return updatedUser;
        }
        return userItem;
      });
      

    setUsers(updatedUsers);
  };

  const userDetails = users.map((user) => {
    return (
      <tr
        className="hover:bg-gray-50 hover:text-black transition"
        key={user.id}
      >
        <td className="text-sm">{user.id}</td>
        <td className="text-sm">{user.username}</td>
        <td className="text-sm">{user.lastname}</td>
        <td className="flex justify-end gap-4">
          {user.text && <p className="text-sm">{user.text}</p>}
          <button
            type="button"
            onClick={(e) => deleteUser(e, user.id)}
            className="bg-transparent border border-transparent rounded-full transition hover:border-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 cursor-pointer text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => toggleAdmin(user.id)}
            className="focus:outline-none"
          >
            {user.is_admin ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 2l2.29 7.47h7.71l-5.89 4.28 2.32 7.5L12 17.71l-7.14 4.54 2.32-7.5L2 9.47h7.71L12 2z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 2l2.29 7.47h7.71l-5.89 4.28 2.32 7.5L12 17.71l-7.14 4.54 2.32-7.5L2 9.47h7.71L12 2z"
                />
              </svg>
            )}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 mt-10 relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-900 to-022340 mx-auto flex flex-col px-3 py-12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          <div className="px-1">
            <div className="flex justify-center items-center pb-20">
              <BiLeftArrow
                className="text-xl mr-2"
                style={{ color: "white" }}
              />
              <h2 className="text-2xl">Gestion des admins</h2>
            </div>
            <div className="flex justify-center items-center">
              <table className=" w-full border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-1 md:px-6 py-4 text-lg">ID</th>
                    <th className="px-1 md:px-6 py-4 text-lg">Prenom</th>
                    <th className="px-1 md:px-6 py-4 text-lg">Nom</th>
                    <th className=" flex justify-end px-1 md:px-9 py-4 text-lg">
                      Admin
                    </th>
                  </tr>
                </thead>
                <tbody className="">{userDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminRightPermission;
