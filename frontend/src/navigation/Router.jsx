import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import AdminMode from "../pages/AdminMode";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";
import CreateAccountForm from "../components/CreateAccountForm";
import CreateAccountMsg from "../components/CreateAccountMsg";
import UserProfile from "../components/UserProfile";
import AccountCreation from "../pages/AccountCreation";
import Decouvrir from "../pages/Decouvrir";
import ManageHomePageAdmin from "../components/AdminSection/ManageHomePageAdmin";
import CreateVideo from "../components/AdminVideo/CreateVideo";
import ListVideo from "../components/AdminVideo/ManageVideos";
import EditVideo from "../components/AdminVideo/EditVideo";
import AddSection from "../components/AdminSection/AddSection";
import AddCarousselCustom from "../components/AdminSection/AddCarousselCustom";
import ManageUsers from "../components/AdminUser/ManageUsers ";
import EditUsers from "../components/AdminUser/EditUsers";
import ManageCategory from "../components/AdminCategory/ManageCategory";
import EditCategories from "../components/AdminCategory/EditCategories";
import AddCategory from "../components/AdminCategory/AddCategory";
import AddCarouselCategory from "../components/AdminSection/AddCarouselCategory";
import AddUsers from "../components/AdminUser/AddUser";
import EditCarouselCategory from "../components/AdminSection/EditCarouselCategory";
import EditCarousel from "../components/AdminSection/EditCarousel";
import UpdateUserProfile from "../components/UpdateUserProfile";
import ManageHero from "../components/AdminSection/ManageHero";
import FAQ from "../components/FAQ/FAQ";

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
      <Route path="/admin/section" element={<ManageHomePageAdmin />} />
      <Route path="/admin/add_video" element={<CreateVideo />} />
      <Route path="/admin/videos/:id/edit" element={<EditVideo />} />
      <Route path="/decouvrir" element={<Decouvrir />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
      <Route path="/createaccountmsg" element={<CreateAccountMsg />} />
      <Route path="/admin/section/access" element={<AddSection />} />
      <Route path="/admin/users/:id/edit" element={<EditUsers />} />
      <Route path="/admin/users/add_user" element={<AddUsers />} />
      <Route path="/ma_liste" element={<Decouvrir />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route
        path="/updateuserprofile/:id/edit"
        element={<UpdateUserProfile />}
      />
      <Route path="/admin/caroussel/custom" element={<AddCarousselCustom />} />
      <Route path="/admin/user_list" element={<ManageUsers />} />
      <Route
        path="/admin/caroussel/category"
        element={<AddCarouselCategory />}
      />
      <Route path="/admin/hero" element={<ManageHero />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/admin/edit/carousel/:id" element={<EditCarousel />} />
      <Route
        path="/admin/edit/carousel_cat/:id"
        element={<EditCarouselCategory />}
      />
    </Routes>
  );
}

export default Router;
