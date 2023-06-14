import React from "react";
import { FaTimes } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import BlueDiv from "../components/BlueDiv";
import ButtonOrange from "../components/ButtonOrange";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AdminMode() {
  const handleButtonClick = () => {
    // Logique du bouton ici
  };

  return (
    <div className="loginid-container bg-black min-h-screen relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-20 pb-10">
        <div className="flex items-center space-x-6">
          <FaTimes className="text-orange-500 w-6 h-6 md:w-8 md:h-8" />

          <h1 className="text-white text-3xl md:text-5xl font-bold font-poppins">
            Mode Admin
          </h1>
          <BsCheckCircle className="text-green-500 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
      <div className="flex justify-center">
        <BlueDiv className="w-full">
          <div className="flex flex-col items-center space-y-36 md:space-y-16 mx-5">
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <Link to="/admin/upload">
                <ButtonOrange
                  onClick={handleButtonClick}
                  className="w-full flex-grow"
                >
                  Administration des vidéos
                </ButtonOrange>
              </Link>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <ButtonOrange
                onClick={handleButtonClick}
                className="w-full flex-grow"
              >
                Administration des catégories
              </ButtonOrange>
            </div>
            <div className="w-full max-w-md md:w-auto md:max-w-none md:h-[6rem] md:px-6 md:py-6 flex items-center relative">
              <Link to="/admin/section">
                <ButtonOrange
                  onClick={handleButtonClick}
                  className="w-full flex-grow"
                >
                  Administration des sections
                </ButtonOrange>
              </Link>
            </div>
          </div>
        </BlueDiv>
      </div>
      <Footer />
    </div>
  );
}

export default AdminMode;
