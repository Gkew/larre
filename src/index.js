import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Backoffice from "./components/Backoffice/Backoffice";
import BOProductList from "./components/Backoffice/BOProductList";
import BOProductCreate from "./components/Backoffice/BOProductCreate";
import BOOrders from "./components/Backoffice/BOOrders";
import BOCategoryHandling from "./components/Backoffice/BOCategoryHandling";
import Navbar from "./components/Navbar";
import Productdetails from "./components/Productdetails";
import BOProductEdit from "./components/Backoffice/BOProductEdit";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { AuthProvider } from "./components/Backoffice/Admin/Authenticate";
import AuthRoutes from "./components/Backoffice/Admin/AuthRoutes";
import Login from "./components/Backoffice/Admin/BOLogIn";
import Camera from "./components/Camera/Camera";
import ThankYou from "./components/ThankYou";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      {/*
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/orders" element={<BOOrders />} />
        <Route path="/backoffice/products" element={<BOProductList />} />
        <Route path="/backoffice/addproduct" element={<BOProductCreate />} />
        <Route
          path="/backoffice/products/:sodasID"
          element={<BOProductEdit />}
        />
      
        <Route path="/productdetails/:sodasID" element={<Productdetails />} />
        <Route
          path="/backoffice/categoryhandling"
          element={<BOCategoryHandling />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/productlist" element={<ProductList />} />

          <Route path="/login" element={<Login />} />
          <Route path="/productdetails/:sodasID" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/thankyou" element={<ThankYou />} />

          <Route
            path="/backoffice"
            element={
              <AuthRoutes>
                <Backoffice />{" "}
              </AuthRoutes>
            }
          />
          <Route
            path="/backoffice/orders"
            element={
              <AuthRoutes>
                <BOOrders />
              </AuthRoutes>
            }
          />
          <Route
            path="/backoffice/products"
            element={
              <AuthRoutes>
                <BOProductList />
              </AuthRoutes>
            }
          />
          <Route
            path="/backoffice/products/:sodasID"
            element={
              <AuthRoutes>
                <BOProductEdit />
              </AuthRoutes>
            }
          />
          <Route
            path="/backoffice/addproduct"
            element={
              <AuthRoutes>
                <BOProductCreate />
              </AuthRoutes>
            }
          />
          <Route
            path="/backoffice/categoryhandling"
            element={
              <AuthRoutes>
                <BOCategoryHandling />
              </AuthRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
