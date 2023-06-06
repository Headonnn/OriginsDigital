import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">
            <h2>Origin digitals presents Streaming Sports </h2>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            <h2>Contactez-nous!</h2>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
