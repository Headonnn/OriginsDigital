import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import VideoDescription from "../pages/VideoDescription";
import Watch from "../pages/Watch";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/description/:id" element={<VideoDescription />} />
      <Route path="/watch/:id" element={<Watch />} />
    </Routes>
  );
}

export default Router;
