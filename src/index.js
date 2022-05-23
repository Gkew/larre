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
import Checkout from "./components/Checkout";

import { AuthProvider } from "./components/Backoffice/Admin/Authenticate";
import AuthRoutes from "./components/Backoffice/Admin/AuthRoutes";
import Login from "./components/Backoffice/Admin/BOLogIn";
import AboutUs from "./AboutUs";
import Nyheter from "./Nyheter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/orders" element={<BOOrders />} />
        <Route path="/backoffice/products" element={<BOProductList />} />
        <Route path="/backoffice/addproduct" element={<BOProductCreate />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<Nyheter />} />
        <Route path="/productdetails/:sodasID" element={<Productdetails />} />
        <Route
          path="/backoffice/categoryhandling"
          element={<BOCategoryHandling />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {/* <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/productlist" element={<ProductList />} />
          
          <Route path="/login" element={<Login />} />

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
              <AuthProvider>
                <BOProductList />
              </AuthProvider>
            }
          />
          <Route
            path="/backoffice/products/:sodasID"
            element={
              <AuthProvider>
                <BOProductEdit />
              </AuthProvider>
            }
          />
          <Route
            path="/backoffice/addproduct"
            element={
              <AuthProvider>
                <BOProductCreate />
              </AuthProvider>
            }
          />
          <Route
            path="/backoffice/categoryhandling"
            element={
              <AuthProvider>
                <BOCategoryHandling />
              </AuthProvider>
            }
          />

          <Route path="/productdetails/:id " element={<Productdetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AuthProvider> */}
    </Router>
  </React.StrictMode>
);
