import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import AdminMode from "../pages/AdminMode";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";
import CreateAccountForm from "../components/CreateAccountForm";
import CreateAccountMsg from "../components/CreateAccountMsg";
import CreateAccountProfile from "../components/UserProfile";
import AccountCreation from "../pages/AccountCreation";
import Decouvrir from "../pages/Decouvrir";
import AdminSection from "../pages/AdminSection";
import CreateVideo from "../components/AdminVideo/CreateVideo";
import ListVideo from "../components/AdminVideo/ManageVideos";
import EditVideo from "../components/AdminVideo/EditVideo";
import AdminSectionAccess from "../pages/AdminSectionAccess";
import AdminCarousselCustom from "../pages/AdminCarousselCustom";
import AdminAddVideo from "../pages/AdminAddVideo";
import ManageUsers from "../components/AdminUser/ManageUsers ";
import EditUsers from "../components/AdminUser/EditUsers";
import ManageCategory from "../components/AdminCategory/ManageCategory";
import EditCategories from "../components/AdminCategory/EditCategories";
import AddCategory from "../components/AdminCategory/AddCategory";
import AddUsers from "../components/AdminUser/AddUser";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accountcreation" element={<AccountCreation />} />
      <Route path="/admin" element={<AdminMode />} />
      <Route path="/admin/video_list" element={<ListVideo />} />
      <Route path="/admin/category_list" element={<ManageCategory />} />
      <Route path="/admin/add_category" element={<AddCategory />} />
      <Route path="/admin/category/:id/edit" element={<EditCategories />} />
      <Route path="/admin/section" element={<AdminSection />} />
      <Route path="/admin/add_video" element={<CreateVideo />} />
      <Route path="/admin/videos/:id/edit" element={<EditVideo />} />
      <Route path="/decouvrir" element={<Decouvrir isMaListe={false} />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
      <Route path="/createaccountmsg" element={<CreateAccountMsg />} />
      <Route path="/createaccountprofile" element={<CreateAccountProfile />} />
      <Route path="/admin/section/access" element={<AdminSectionAccess />} />
      <Route path="/admin/users/:id/edit" element={<EditUsers />} />
      <Route path="/admin/users/add_user" element={<AddUsers />} />
      <Route path="/ma_liste" element={<Decouvrir isMaListe />} />
      <Route
        path="/admin/caroussel/custom"
        element={<AdminCarousselCustom />}
      />
      <Route path="/admin/add/video" element={<AdminAddVideo />} />
      <Route path="/admin/user_list" element={<ManageUsers />} />
    </Routes>
  );
}

export default Router;
