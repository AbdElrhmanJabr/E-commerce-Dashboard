import React from "react";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import Router from "../../routers/Router";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/header/AdminNav";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dash") ? <AdminNav /> : <Header />}
      <Router />
      <Footer />
    </>
  );
};

export default Layout;
