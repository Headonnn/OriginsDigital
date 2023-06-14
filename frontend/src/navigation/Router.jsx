import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import AdminMode from "../pages/AdminMode";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";
import CreateAccountForm from "../components/CreateAccountForm";
import CreateAccountMsg from "../components/CreateAccountMsg";
import CreateAccountProfile from "../components/CreateAccountProfile";
import AccountCreation from "../pages/AccountCreation";
import Decouvrir from "../pages/Decouvrir";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accountcreation" element={<AccountCreation />} />
      <Route path="/admin" element={<AdminMode />} />
      <Route path="/decouvrir" element={<Decouvrir />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
      <Route path="/createaccountmsg" element={<CreateAccountMsg />} />
      <Route path="/createaccountprofile" element={<CreateAccountProfile />} />
    </Routes>
  );
}

export default Router;
