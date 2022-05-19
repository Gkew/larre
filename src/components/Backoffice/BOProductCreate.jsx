import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
    categoriesID: "",
  });

  const handleInput = (e) => {
    setNewProduct((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  function addProd(e) {
    e.preventDefault();

    axios
      .post("/sodas", newProduct)
      .then((res) => {
        setNewProduct({
          brand: "",
          name: "",
          price: "",
          description: "",
          categoriesID: "",
        });
        console.log(res.data);
        setCreated(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  let navigate = useNavigate();
  const addMoreProducts = () => {
    setCreated(false);
    navigate("/backoffice/addproduct", { replace: true });
  };

  return (
    <main className="backoffice-container">
      <>
        {created ? (
          <div className="bo-successheader">
            <h2>Produkten har blivit tillagd.</h2>

            <p className="btn-p">
              <Button className="header-btn" onClick={addMoreProducts}>
                Lägg till en till produkt
              </Button>{" "}
              <Button className="header-btn">
                <Link to={`/backoffice`}>Tillbaka till BO</Link>
              </Button>
            </p>
          </div>
        ) : (
          <>
            <div className="bo-header">
              <button className="goback">
                <Link to={`/backoffice`}>Tillbaka till BO</Link>
              </button>

              <h2>Lägg till en ny produkt</h2>
            </div>
            <form onSubmit={addProd} className="bo-add-product">
              <p>
                Alla fält behöver fyllas i förutom bild - den kan du ladda upp
                senare
              </p>
              <input
                type="text"
                name="name"
                placeholder="Produktnamn"
                autoFocus
                onChange={handleInput}
                value={newProduct.name}
                required
              ></input>
              <input
                type="text"
                name="description"
                placeholder="Beskrivning"
                value={newProduct.description}
                onChange={handleInput}
                required
              ></input>
              <select
                type="select"
                name="categoriesID"
                onChange={handleInput}
                value={newProduct.categoriesID}
                required
              >
                <option hidden>Kategori:</option>
                <option disabled>Kategori:</option>
                {categories.map((cat) => {
                  return <option key={cat.id}> {cat.name}</option>;
                })}
              </select>
              <input
                type="text"
                name="brand"
                placeholder="Varumärke"
                onChange={handleInput}
                value={newProduct.brand}
                required
              ></input>
              <input
                type="number"
                name="price"
                placeholder="Konsumentpris i SEK"
                onChange={handleInput}
                value={newProduct.price}
              ></input>

              <input id="img" name="img" type="file" accept="image/*" />

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
