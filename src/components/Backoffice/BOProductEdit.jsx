import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import SodaService from "../services/SodaService";

const BOProductEdit = (props) => {
  const { sodasID } = useParams();
  let navigate = useNavigate();

  const startSodaState = {
    sodasID: null,
    brand: "",
    name: "",
    price: 0,
    description: "",
    categoriesID: "",
  };
  const [sodas, setSodas] = useState(startSodaState);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const getSodas = (sodasID) => {
    SodaService.get(sodasID)
      .then((res) => {
        setSodas(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (sodasID) getSodas(sodasID);
  }, [sodasID]);

  //handles all incoming input change
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSodas({ ...sodas, [name]: value });
  };

  //updates the product with help from SodaService
  const updateSoda = () => {
    SodaService.update(sodas.sodasID, sodas)
      .then((res) => {
        console.log(res.data);
        setMessage("Produkten är uppdaterad");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSoda = async (e) => {
    e.preventDefault();
    const choice = window.confirm(
      "Är du säker på att du vill ta bort produkten?"
    );
    if (!choice) return;
    await SodaService.remove(sodas.sodasID)
      .then((res) => {
        console.log(res.data);
        navigate("/backoffice/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // gets all categories
  axios.defaults.baseURL = "http://localhost:4000/api";

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

  return (
    <Container className="backoffice-container" fluid>
      {sodas ? (
        <>
          <div className="bo-header">
            <Link to={`/backoffice/products`}>
              <button>{`<< Tillbaka till BO`}</button>
            </Link>

            <h2>Uppdatera produkt</h2>
          </div>
          <form className="bo-add-product">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={sodas.name}
              onChange={onInputChange}
              placeholder="produktnamn"
            />

            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={sodas.brand}
              onChange={onInputChange}
              placeholder="märke"
            />

            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={sodas.description}
              onChange={onInputChange}
              placeholder="beskrivning"
            />

            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={sodas.price}
              onChange={onInputChange}
            />

            <select
              type="select"
              className="form-control"
              id="categoriesID"
              name="categoriesID"
              value={sodas.categoriesID}
              onChange={onInputChange}
            >
              <option hidden>Kategori:</option>
              <option disabled>Kategori:</option>
              {categories.map((cat) => {
                return <option key={cat.id}> {cat.name}</option>;
              })}
            </select>

            <input id="img" name="img" type="file" accept="image/*" alt="image" />
            <div className="btn-div">
              <Button variant="success" type="submit" onClick={updateSoda}>
                Uppdatera
              </Button>
              <p>{message} </p>

              <Button variant="danger" onClick={deleteSoda}>
                Ta bort
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default BOProductEdit;
