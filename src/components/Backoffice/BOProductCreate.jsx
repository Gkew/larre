import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Button } from "react-bootstrap";

const BOProductCreate = () => {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [newProduct, setNewProduct] = useState({
    brand: "",
    name: "",
    price: "",
    description: "",
    category: [],
  });

  function handleInput(e) {
    setNewProduct((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function submittedProd(e) {
    e.preventDefault();

    axios
      .post("/sodas", newProduct)
      .then((res) => {
        setNewProduct({
          brand: "",
          name: "",
          price: "",
          description: "",
          category: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <main className="backoffice-container">
      <div className="bo-header">
        <Link to={`/backoffice`}>Tillbaka till BO</Link>
        <h2>Lägg till en ny produkt</h2>
      </div>
      <p>
        Alla fält behöver fyllas i förutom bild - den kan du ladda upp senare
      </p>
      <form onSubmit={submittedProd} className="bo-add-product">
        <input
          type="text"
          name="name"
          placeholder="Produktnamn"
          autofocus
          onChange={handleInput}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="Beskrivning"
          onChange={handleInput}
        ></input>
        <select type="select" name="category" onChange={handleInput}>
          <option>Kategorier:</option>
          <option>Kategori 1</option>
          <option>Kategori 2</option>
          <option>Kategori 3</option>
        </select>
        <input
          type="text"
          name="brand"
          placeholder="Varumärke"
          onChange={handleInput}
        ></input>
        <input placeholder="Konsumentpris i SEK" onChange={handleInput}></input>

        <Button
          className="addproduct-btn"
          variant="success"
          type="submit"
          onClick={submittedProd}
        >
          Spara produkt
        </Button>
      </form>
    </main>
  );
};

export default BOProductCreate;
