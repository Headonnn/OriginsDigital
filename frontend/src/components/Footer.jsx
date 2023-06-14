import React from "react";
import { NavLink } from "react-router-dom";
import { RiFacebookCircleLine, RiTwitterLine } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="bg-black flex flex-col items-center text-sm md:text-base h-auto max-w-full pt-5 relative"
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col md:flex-row justify-center md:justify-start space-x-0 md:space-x-14">
        <p
          className="text-white font-poppins text-sm md:text-base mb-2 md:mb-0"
          style={{ fontSize: "12px" }}
        >
          <NavLink>COOKIES</NavLink>
        </p>{" "}
        <p className="text-white font-poppins text-xs md:text-base hidden md:inline mb-2 md:mb-0 ">
          |
        </p>{" "}
        <p
          className="text-white font-poppins text-xxs md:text-base mb-2 md:mb-0 "
          style={{ fontSize: "12px" }}
        >
          <NavLink>MENTIONS LEGALES </NavLink>
        </p>{" "}
        <p className="text-white font-poppins text-xs md:text-base hidden md:inline mb-2 md:mb-0">
          |
        </p>{" "}
        <p
          className="text-white font-poppins text-xxs md:text-base mb-2 md:mb-0"
          style={{ fontSize: "12px" }}
        >
          <NavLink>POLITIQUE DE CONFIDENTIALITE </NavLink>
        </p>{" "}
      </div>

      <div className="w-full">
        <div className="border-t border-white mt-5 px-0 border-t-1 pt-0" />
      </div>

      <div
        className="flex items-center text-sm space-x-4 md:space-x-8 relative"
        style={{ marginTop: "20px" }}
      >
        <div
          className="w-12 md:w-20 h-6 md:h-12 rounded-b-full overflow-hidden transform rotate-180"
          style={{
            boxShadow: "inset 0px 17px 50px 6px rgba(209,19,19,1)",
            backgroundColor: "#B95900",
            margin: "0 6px md:0 10px",
            transform: "translateY(56px) rotate(180deg)",
          }}
        />
      </div>

      <div className="ml-auto flex h-10 space-x-6 justify-center">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiFacebookCircleLine
            className="h-6 md:h-8 mb-2 md:mb-0"
            size={30}
            style={{ color: "white" }}
          />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTiktok
            className="h-6 md:h-8 mb-2 md:mb-0"
            size={20}
            style={{ color: "white" }}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTwitterLine
            className="h-6 md:h-8 mb-2 md:mb-0"
            size={30}
            style={{ color: "white" }}
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
