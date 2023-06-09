import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AdminUpload() {
  return (
    <>
      <NavBar />
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
        <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-022340 mx-auto relative flex flex-col items-center justify-start h-screen pt-20 sm:w-10/12 lg:w-9/12 xl:w-10/12 shadow-[inset0-2px_4px_rgba(0,0,0,0.6)] text-white rounded-[31px]">
          {/* Contenu de la page ici */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminUpload;
