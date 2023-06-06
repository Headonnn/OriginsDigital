import React from "react"; // Importation du module React
import logo1 from "../assets/images/logo_nike_blanc.jpg"; // Importation de l'image pour le logo 1
import logo2 from "../assets/images/logo-NVIDIA.jpg"; // Importation de l'image pour le logo 2
import logo3 from "../assets/images/logo-puma.jpg"; // Importation de l'image pour le logo 3
import logo4 from "../assets/images/logo-sony.png"; // Importation de l'image pour le logo 4
import logo5 from "../assets/images/logo_facebook.png"; // Importation de l'image pour le logo 5
import logo6 from "../assets/images/logo-tiktok.jpg"; // Importation de l'image pour le logo 6
import logo7 from "../assets/images/logo_twitter.jpg"; // Importation de l'image pour le logo 7

function Footer() {
  // Définition du composant Footer
  return (
    <footer
      className="bg-black flex flex-col items-center text-sm md:text-base h-auto max-w-full pt-5 relative"
      style={{ overflow: "hidden" }}
    >
      {/* Div pour la partie supérieure du footer */}
      <div className="flex flex-col md:flex-row justify-center md:justify-start space-x-0 md:space-x-14">
        <p className="text-white font-poppins text-xs md:text-base mb-2 md:mb-0">
          COOKIES
        </p>{" "}
        {/* Texte "COOKIES" */}
        <p className="text-white font-poppins text-xs md:text-base hidden md:inline mb-2 md:mb-0">
          |
        </p>{" "}
        {/* Barre verticale */}
        <p className="text-white font-poppins text-xs md:text-base mb-2 md:mb-0">
          MENTIONS LEGALES
        </p>{" "}
        {/* Texte "MENTIONS LEGALES" */}
        <p className="text-white font-poppins text-xs md:text-base hidden md:inline mb-2 md:mb-0">
          |
        </p>{" "}
        {/* Barre verticale */}
        <p className="text-white font-poppins text-xs md:text-base mb-2 md:mb-0">
          POLITIQUE DE CONFIDENTIALITE
        </p>{" "}
        {/* Texte "POLITIQUE DE CONFIDENTIALITE" */}
      </div>

      {/* Div pour la ligne horizontale */}
      <div className="w-full">
        <div className="border-t border-white mt-5 px-0 border-t-1 pt-0" />{" "}
        {/* Ligne horizontale */}
      </div>

      {/* Div pour la partie inférieure du footer */}
      <div
        className="flex mt-6 items-center text-sm space-x-4 md:space-x-8 relative"
        style={{ marginTop: "10px" }}
      >
        <img src={logo1} alt="Logo 1" className="h-6 md:h-8 mb-2 md:mb-0" />{" "}
        {/* Image du logo 1 */}
        <img
          src={logo2}
          alt="Logo 2"
          className="h-6 md:h-8 mb-2 md:mb-0"
        />{" "}
        {/* Image du logo 2 */}
        {/* Élément stylisé */}
        <div
          className="w-12 md:w-20 h-6 md:h-12 rounded-b-full overflow-hidden transform rotate-180"
          style={{
            boxShadow: "inset 0px 17px 50px 6px rgba(209,19,19,1)",
            backgroundColor: "#B95900",
            margin: "0 6px md:0 10px",
            transform: "translateY(40px) rotate(180deg)",
          }}
        />
        <img src={logo3} alt="Logo 3" className="h-6 md:h-8 mb-2 md:mb-0" />{" "}
        {/* Image du logo 3 */}
        <img
          src={logo4}
          alt="Logo 4"
          className="h-7 md:h-9 mb-2 md:mb-0"
        />{" "}
        {/* Image du logo 4 */}
      </div>

      {/* Div pour les logos avec liens */}
      <div className="ml-auto flex space-x-3 " style={{ justifySelf: "end" }}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          {/* Lien vers Facebook avec le logo 5 */}
          <img
            src={logo5}
            alt="Logo 5"
            className="h-5 md:h-8 mb-2 md:mb-0"
          />{" "}
          {/* Image du logo 5 */}
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          {/* Lien vers TikTok avec le logo 6 */}
          <img
            src={logo6}
            alt="Logo 6"
            className="h-6 md:h-8 mb-2 md:mb-0"
          />{" "}
          {/* Image du logo 6 */}
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          {/* Lien vers Twitter avec le logo 7 */}
          <img
            src={logo7}
            alt="Logo 7"
            className="h-6 md:h-8 mb-2 md:mb-0"
          />{" "}
          {/* Image du logo 7 */}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
