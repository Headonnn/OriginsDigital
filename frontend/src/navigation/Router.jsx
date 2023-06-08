import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import AdminMode from "../pages/AdminMode";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";
import CreateAccountForm from "../components/CreateAccountForm";
import CreationCompteMessage from "../components/CreationCompteMessage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminMode />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
      <Route
        path="/accountcreationmessage"
        element={<CreationCompteMessage />}
      />
    </Routes>
  );
}

export default Router;
