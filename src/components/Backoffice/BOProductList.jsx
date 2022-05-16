import React, { useEffect, useState } from "react";

import axios from "axios";
import BOProductDetails from "./BOProductDetails";

export function BOProductList() {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  //Get all data in the table namned sodas
  useEffect(() => {
    axios
      .get("/sodas")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const deleteProduct = (e) => {
    axios.delete(`/sodas/deleteProduct/${e.target.name}`);

    setProducts((data) => {
      return data.filter((product) => product.id !== e.target.name);
    });
  };

  return (
    <main className="backoffice-container">
      <h2>Alla varor</h2>
      <div className="bo-search-filter">
        Här ska det finnas sorterings- och filtreringsfunktioner!
        <br />
        Även admin bör kunna göra detta för att snabbt hitta den produkt vi
        behöver uppdatera eller ta bort.
      </div>
      {products.map((product) => (
        <div
          className="BO-one-product"
          key={product.id}
          aria-label="product-div"
        >
          <BOProductDetails product={product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </main>
  );
}
export default BOProductList;
