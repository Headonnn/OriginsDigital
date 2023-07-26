import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminProtected from "./AdminProtected";
import UserProtected from "./UserProtected";
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
      {/*  OPEN Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accountcreation" element={<AccountCreation />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/decouvrir" element={<Decouvrir />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/createaccountform" element={<CreateAccountForm />} />
      <Route path="/createaccountmsg" element={<CreateAccountMsg />} />
      {/*  USER Routes */}
      <Route
        path="/ma_liste"
        element={
          <UserProtected>
            <Decouvrir />
          </UserProtected>
        }
      />
      <Route
        path="/userprofile"
        element={
          <UserProtected>
            <UserProfile />
          </UserProtected>
        }
      />
      <Route
        path="/updateuserprofile/:id/edit"
        element={
          <UserProtected>
            <UpdateUserProfile />
          </UserProtected>
        }
      />
      {/*  ADMIN Routes */}
      <Route
        path="/admin"
        element={
          <AdminProtected>
            <AdminMode />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/video_list"
        element={
          <AdminProtected>
            <ListVideo />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/category_list"
        element={
          <AdminProtected>
            <ManageCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/add_category"
        element={
          <AdminProtected>
            <AddCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/category/:id/edit"
        element={
          <AdminProtected>
            <EditCategories />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/section"
        element={
          <AdminProtected>
            <ManageHomePageAdmin />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/add_video"
        element={
          <AdminProtected>
            <CreateVideo />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/videos/:id/edit"
        element={
          <AdminProtected>
            <EditVideo />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/section/access"
        element={
          <AdminProtected>
            <AddSection />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <AdminProtected>
            <EditUsers />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/users/add_user"
        element={
          <AdminProtected>
            <AddUsers />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/caroussel/custom"
        element={
          <AdminProtected>
            <AddCarousselCustom />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/user_list"
        element={
          <AdminProtected>
            <ManageUsers />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/caroussel/category"
        element={
          <AdminProtected>
            <AddCarouselCategory />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/hero"
        element={
          <AdminProtected>
            <ManageHero />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit/carousel/:id"
        element={
          <AdminProtected>
            <EditCarousel />
          </AdminProtected>
        }
      />
      <Route
        path="/admin/edit/carousel_cat/:id"
        element={
          <AdminProtected>
            <EditCarouselCategory />
          </AdminProtected>
        }
      />
    </Routes>
  );
}

export default Router;
