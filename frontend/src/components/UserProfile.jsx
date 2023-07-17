import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SlPencil } from "react-icons/sl";
import ButtonOrange from "./ButtonOrange";
import NavBar from "./NavBar/NavBar";
import LoginContext from "../../contexts/LoginContext";
// import axios from "axios";

function UserProfile() {
  const { dataLogin } = useContext(LoginContext);

  // const { id } = useParams();

  // const [user, setUser] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5002/users/id`)
  //     .then((res) => setDataLogin("User OK", res.data))
  //     .catch((err) => {
  //       if (err.response) {
  //         if (err.response.status === 404) {
  //           console.error("PB UseEff UserProf");
  //         }
  //         if (err.response.status === 500) {
  //           console.error(err);
  //         }
  //       }
  //     });
  // }, [id]);

  return (
    <>
      <NavBar />
      <div className="loginid-container bg-black min-h-screen p-5 pt-15 pb-15 overflow-hidden text-white">
        <div className="flex flex-col items-center relative bg-gradient-to-br from-blue-900  px-6 py-10 mx-auto sm:max-w-md my-10 rounded-[31px]">
          <h2 className=" flex items-center gap-12 pb-6 text-2xl">
            Votre profil
          </h2>
          {dataLogin ? (
            <div className="flex grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center md:justify-start  md:space-y-16 mx-5">
                <ul className=" space-y-10">
                  <li>
                    <h3 className="  text-xl md:text-xl text-gray-500">
                      Vous êtes
                    </h3>
                    <p className=" text-xl md:text-2xl text-white">
                      {dataLogin.firstname} {dataLogin.lastname}
                    </p>
                  </li>
                  <li>
                    <h3 className=" text-xl md:text-xl text-gray-500">
                      Votre email
                    </h3>
                    <p className=" text-xl md:text-2xl text-white">
                      {dataLogin.email}
                    </p>
                  </li>
                  <li>
                    <h3 className=" text-xl md:text-xl text-gray-500">
                      Votre password
                    </h3>
                    <p className=" text-xl md:text-2xl text-white">
                      * * * * * * * *
                    </p>
                  </li>
                  <li>
                    <h3 className=" hidden md:block text-xl md:text-xl text-gray-500 py-3">
                      Supprimer le compte
                    </h3>
                  </li>
                </ul>
              </div>
              <div className="flex justify-end md:space-y-16">
                <ul className=" space-y-14 pr-3 py-3">
                  <li>
                    {dataLogin.id && (
                      <NavLink to={`/updateuserprofile/${dataLogin.id}/edit`}>
                        <p className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black rounded-xl  py-3 px-3 text-sm md:px-6 md:text-lg transition">
                          Modifier ?
                        </p>
                      </NavLink>
                    )}
                    <SlPencil className="block md:hidden cursor-pointer text-orange-500 my-4 mr-3 w-8 h-8" />
                  </li>
                  <li>
                    {dataLogin.id && (
                      <NavLink to={`/updateuserprofile/${dataLogin.id}/edit`}>
                        <p className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-3 px-3 text-sm md:px-6 md:text-lg transition">
                          Modifier ?
                        </p>
                      </NavLink>
                    )}
                    <SlPencil className="block md:hidden cursor-pointer text-orange-500 my-4 mr-3 w-8 h-8" />
                  </li>
                  <li>
                    <p className="hidden md:block border hover:bg-white tracking-wide text-white hover:text-black rounded-xl py-3 px-3 text-sm md:px-6 md:text-lg transition">
                      Modifier ?
                    </p>
                    <SlPencil className="block md:hidden cursor-pointer text-orange-500 my-4 mr-3 w-8 h-8" />
                  </li>
                  <li>
                    <p className="hidden md:block border border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide rounded-xl py-2 px-3 text-sm md:px-6  md:text-lg transition">
                      Supprimer
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
          <div className="flex justify-center mt-5">
            <p className="nlock md:hidden flex justify-center border border-red-800 hover:bg-red-600 text-red-800 hover:text-white tracking-wide rounded-xl py-2 px-3 text-l md:px-6  md:text-lg transition">
              Supprimer le compte
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <NavLink to="/">
              <ButtonOrange className="pb-8">Retour à l'accueil</ButtonOrange>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
