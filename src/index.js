import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Backoffice from "./components/Backoffice/Backoffice";
import BOProductList from "./components/Backoffice/BOProductList";
import BOProductCreate from "./components/Backoffice/BOProductCreate";
import BOOrders from "./components/Backoffice/BOOrders";
import Navbar from "./components/Navbar";
import Productdetails from "./components/Productdetails";

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
        <Route path="/productdetails" element={<Productdetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
