import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiImageAdd } from "react-icons/bi";

const BOProductCreate = () => {
  axios.defaults.baseURL = "http://localhost:4000/api";

  //set to false to not show successmessage until product is successfully created.
  const [created, setCreated] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [newProduct, setNewProduct] = useState({
    brand: "",
    name: "",
    price: 0,
    description: "",
    category: [],
  });

  function handleInput(e) {
    setNewProduct((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function addProd(e) {
    e.preventDefault();

    axios
      .post("/sodas", { newProduct })
      .then((res) => {
        setNewProduct({
          brand: "",
          name: "",
          price: "",
          description: "",
          category: "",
        });
        setCreated(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const addMoreProducts = () => {
    newProduct();
    setCreated(false);
  };

  return (
    <main className="backoffice-container">
      <div className="bo-header">
        <Link to={`/backoffice`}>Tillbaka till BO</Link>
        <h2>Lägg till en ny produkt</h2>
      </div>

      <>
        {created ? (
          <div>
            <h2>Produkten har blivit tillagd.</h2>
            <Button variant="primary" onClick={addMoreProducts}>
              Lägg till en till
            </Button>
          </div>
        ) : (
          <>
            <p>
              Alla fält behöver fyllas i förutom bild - den kan du ladda upp
              senare
            </p>
            <form onSubmit={addProd} className="bo-add-product">
              <input
                type="text"
                name="name"
                placeholder="Produktnamn"
                autoFocus
                onChange={handleInput}
                required
              ></input>
              <input
                type="text"
                name="description"
                placeholder="Beskrivning"
                onChange={handleInput}
                required
              ></input>
              <select
                type="select"
                name="category"
                onChange={handleInput}
                required
              >
                <option hidden>Kategori:</option>
                <option disabled>Kategori:</option>
                {categories.map((category) => {
                  return <option key={category.id}> {category.name}</option>;
                })}
              </select>
              <input
                type="text"
                name="brand"
                placeholder="Varumärke"
                onChange={handleInput}
                required
              ></input>
              <input
                placeholder="Konsumentpris i SEK"
                onChange={handleInput}
              ></input>

              <Button
                variant="outline-dark"
                htmlFor="files"
                className="img-btn"
              >
                <BiImageAdd /> Lägg till produktbild
              </Button>
              <input id="files" style={{ visibility: "hidden" }} type="file" />

              <Button
                className="addproduct-btn"
                variant="success"
                type="submit"
                onClick={addProd}
              >
                Spara produkt
              </Button>
            </form>
          </>
        )}
      </>
    </main>
  );
};

export default BOProductCreate;
