import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "../admin/AllProducts";
import AddProducts from "../admin/AddProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Orders from "../admin/header/Orders";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"home"} />} />
      <Route path="Home" element={<Home />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="Login" element={<Login />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="Shop/:id" element={<ProductDetails />} />

      <Route path="/*" element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/users" element={<Users />} />
        <Route path="dashboard/orders" element={<Orders />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
      </Route>

      <Route path="Shop" element={<Shop />} />
    </Routes>
  );
};

export default Router;
