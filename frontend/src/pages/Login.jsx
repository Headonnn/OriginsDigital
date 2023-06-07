import React from "react";
import Router from "../navigation/Router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LoginId from "../components/LoginId";

function Login() {
  return (
    <>
      <NavBar />
      <LoginId />
      <Router />
      <Footer />
    </>
  );
}

export default Login;
