import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-295px)] ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
