import React, { useState, useEffect } from "react";
import axios from "axios";
import SodaService from "../services/SodaService";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const BOProductCreate = () => {
  //set to false to not show successmessage until product is successfully created.
  const [created, setCreated] = useState(false);
  const [categories, setCategories] = useState([]);

  const startSodaState = {
    sodasID: null,
    brand: "",
    name: "",
    price: 0,
    description: "",
    categoriesID: "",
  };
  const [sodas, setSodas] = useState(startSodaState);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setSodas({ ...sodas, [name]: value });
  };

  const addProd = (e) => {
    e.preventDefault();

    const data = {
      brand: sodas.brand,
      name: sodas.name,
      price: sodas.price,
      description: sodas.description,
      categoriesID: sodas.categoriesID,
    };
    SodaService.create(data)
      .then((res) => {
        setSodas({
          sodasID: res.data.id,
          brand: res.data.brand,
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
        setCreated(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  axios.defaults.baseURL = "http://localhost:4000/api";

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        //console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let navigate = useNavigate();

  const addMoreProducts = () => {
    setCreated(false);
    navigate("/backoffice/addproduct", { replace: true });
  };

  console.log("navigator.onLine", navigator.onLine);

  return (
    <>
      {!navigator.onLine ? (
        <Container className="backoffice-container" fluid>
          {/* Om Offline */}
          <div className="offline-container">
            <h1>Du kan inte l??gga till en produkt om du ??r offline!</h1>
            <p>F??rs??k igen n??r du ??r online igen.</p>
            <Link to={`/backoffice`}>
              <button>{`<< Tillbaka till BO`}</button>
            </Link>
          </div>
        </Container>
      ) : (
        <Container className="backoffice-container" fluid>
          <div className="bo-header">
            <button>
              <Link to={`/backoffice`}>{`<< Tillbaka till BO`}</Link>
            </button>

            <h2>L??gg till en ny produkt</h2>
          </div>
          {created ? (
            <div className="bo-successheader">
              <h2>Produkten har blivit tillagd.</h2>

              <p className="btn-p">
                <Button className="header-btn" onClick={addMoreProducts}>
                  L??gg till en till produkt
                </Button>{" "}
                <Button className="header-btn">
                  <Link to={`/backoffice/products`}>
                    Tillbaka till alla produkter
                  </Link>
                </Button>
                <Button className="header-btn">
                  <Link to={`/backoffice`}>Tillbaka till BO</Link>
                </Button>
              </p>
            </div>
          ) : (
            <form onSubmit={addProd} className="bo-add-product">
              <p>
                Alla f??lt beh??ver fyllas i f??rutom bild - den kan du ladda upp
                senare
              </p>
              <input
                type="text"
                name="name"
                placeholder="Produktnamn"
                autoFocus
                onChange={handleInput}
                value={sodas.name}
                required
              ></input>
              <textarea
                type="text"
                name="description"
                placeholder="Beskrivning"
                value={sodas.description}
                onChange={handleInput}
                required
              />
              <select
                type="select"
                name="categoriesID"
                onChange={handleInput}
                value={sodas.categoriesID}
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
                placeholder="Varum??rke"
                onChange={handleInput}
                value={sodas.brand}
                required
              ></input>
              <input
                type="number"
                name="price"
                placeholder="Konsumentpris i SEK"
                onChange={handleInput}
                value={sodas.price}
                min="5"
              ></input>

              <input
                id="img"
                name="img"
                type="file"
                accept="image/*"
                alt="img"
              />

              <Button
                className="addproduct-btn"
                variant="warning"
                type="submit"
                onClick={addProd}
              >
                Spara produkt
              </Button>
            </form>
          )}
          ;
        </Container>
      )}
    </>
  );
};

export default BOProductCreate;
