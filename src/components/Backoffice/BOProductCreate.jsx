import React, { useState } from "react";
import axios from "axios";

const BOProductCreate = () => {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("/sodas/createSodas", newProduct)
      .then((res) => {
        setNewProduct({
          name: "",
          description: "",
          brand: "",
          price: "",
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
      <h2>Lägg till en ny produkt</h2>
      <p>
        Alla fält behöver fyllas i förutom bild - den kan du ladda upp senare
      </p>
      <form className="bo-add-product">
        <input
          type="text"
          name="name"
          placeholder="Produktnamn"
          autofocus
        ></input>
        <input type="text" name="description" placeholder="Beskrivning"></input>
        <select type="select" name="category">
          <option>Kategorier:</option>
          <option>Kategori 1</option>
          <option>Kategori 2</option>
          <option>Kategori 3</option>
        </select>
        <input type="text" name="brand" placeholder="Varumärke"></input>
      </form>
    </main>
  );
};

export default BOProductCreate;
