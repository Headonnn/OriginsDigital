/* eslint-disable */
import React, { createContext, useState, useEffect } from "react";

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider value={{ setLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
