import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
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

  //function to delete a product
  const deleteProduct = async (e) => {
    e.preventDefault();
    const choice = window.confirm(
      "Är du säker på att du vill ta bort produkten?"
    );
    if (!choice) return;
    await axios.delete(`/sodas/${e.target.name}`);

    setProducts((data) => {
      return data.filter((product) => product.sodasID !== e.target.name);
    });
  };

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Alla varor</h2>
      </div>
      <div className="bo-search-filter">
        Här ska det finnas sorterings- och filtreringsfunktioner!
        <br />
        Även admin bör kunna göra detta för att snabbt hitta den produkt vi
        behöver uppdatera eller ta bort.
      </div>
      {products.map((product) => (
        <div
          className="BO-one-product"
          key={product.sodasID}
          aria-label="product-div"
        >
          <BOProductDetails product={product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </Container>
  );
}
export default BOProductList;
