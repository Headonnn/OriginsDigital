import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import ButtonOrange from "./ButtonOrange";
import NavBar from "./NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";

function UserProfile() {
  const { dataUser } = useContext(LoginContext);

  return (
    <>
      <NavBar />

      <div>
        <div className="bg-gradient-to-br from-blue-900 relative flex flex-col items-center px-10 py-16 mx-auto sm:max-w-md my-10 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          {dataUser ? (
            <div>
              {" "}
              <div className="flex flex-col items-center md:space-y-16 mx-5">
                <ul>
                  <h2 className="text-2xl flex justify-center md:text-2xl pb-8 font-bold mt-10">
                    Votre profil :
                  </h2>
                  <li>
                    <h3 className="flex justify-start text-xl md:text-xl pb-5 font-bold mt-5">
                      Votre prénom : {dataUser.firstname}
                    </h3>
                    <p className="flex justify-end">
                      {" "}
                      <BsPencil />{" "}
                    </p>
                  </li>

                  {/* <NavLink to="/modifyaccountform">
                  <p className="w-full flex justify-center mt-5 py-3 px-4 border border-transparent rounded-lg shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Je souhaite modifier mon profil</p >
                </NavLink> */}
                </ul>
                <div className="justify-center">
                  <NavLink to="/">
                    <ButtonOrange className="pb-8">
                      Retour à l'accueil
                    </ButtonOrange>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
