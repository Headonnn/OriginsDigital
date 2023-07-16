import React from "react";
import { RiFacebookCircleLine, RiTwitterLine } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white pt-5 flex border-t border-white flex-col items-center text-sm md:text-base ">
      <p className="">Retrouvez-nous sur les réseaux sociaux</p>

      <div className="flex h-10 gap-2 justify-center">
        <a href="https://www.facebook.com">
          <RiFacebookCircleLine className="h-6 w-6 m-2 duration-200 hover:text-orange-600" />
        </a>
        <a href="https://www.tiktok.com">
          <FaTiktok className="h-6 w-6 m-2 duration-200 hover:text-orange-600" />
        </a>
        <a href="https://www.twitter.com">
          <RiTwitterLine className="h-6 w-6 m-2 duration-200 hover:text-orange-600" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
