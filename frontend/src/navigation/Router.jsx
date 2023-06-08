import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";
import CreateAccountForm from "../components/CreateAccountForm";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
    </Routes>
  );
}

export default Router;
