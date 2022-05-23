import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";
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

  {
    /*
  // get all categories from db.
  axios.defaults.baseURL = "http://localhost:4000/api";
  const [categories, setCategories] = useState([]);
  const [productInfo, setProductInfo] = useState({
    brand: "",
    name: "",
    price: 0,
    description: "",
    categoriesID: "",
  });

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(e);

    axios
      .patch(`/sodas/${id}`, productInfo)
      .then((res) => {
        setProductInfo({
          brand: "",
          name: "",
          price: 0,
          description: "",
          categoriesID: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChange = (e) => {
    setProductInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  };*/
  }

  return (
    <div>
      {sodas ? (
        <div id="update-container">
          <Button className="top-btn" variant="outline-primary">
            <Link to={`/backoffice/products`}>
              {" "}
              Gå tillbaka till alla produkter
            </Link>
          </Button>
          <h4>Uppdatera produkt</h4>
          <form className="update-product">
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

            <input
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

            <input id="img" name="img" type="file" accept="image/*" />
          </form>
          <div className="btn-div">
            <Button variant="success" type="submit" onClick={updateSoda}>
              Uppdatera
            </Button>
            <p>{message} </p>

            <Button variant="danger" onClick={deleteSoda}>
              Ta bort
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
    /*
    <main className="update-container">
      <div className="bo-header">
        <h2>Uppdatera produkten</h2>
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
          closeCollapse();
        }}
      >
        <div className="update-product">
          <input
            type="text"
            id="name"
            name="name"
            value={productInfo.name}
            onChange={onInputChange}
            placeholder="Namn"
          ></input>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productInfo.brand}
            onChange={onInputChange}
            placeholder="Märke"
          ></input>
          <input
            type="text"
            id="description"
            name="description"
            value={productInfo.description}
            onChange={onInputChange}
            placeholder="Beskrivning"
          ></input>
          <input
            type="number"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={onInputChange}
            placeholder="Pris i SEK"
            min="5"
          ></input>
          <select
            type=""
            id="categoriesID"
            name="categoriesID"
            value={productInfo.categoriesID}
            onChange={onInputChange}
          >
            <option hidden>Kategori:</option>
            <option disabled>Kategori:</option>
            {categories.map((category) => {
              return <option key={category.id}> {category.name}</option>;
            })}
          </select>

          <input id="img" name="img" type="file" accept="image/*" />

          <div className="btn-div">
            <Button
              className="pdate-btn"
              variant="warning"
              type="submit"
              aria-label="save"
            >
              <AiOutlineSave /> Spara ändringar
            </Button>
            <Button
              className="close-btn"
              variant="outline-danger"
              onClick={closeCollapse}
              aria-label="close"
            >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
      </form>
    </main>*/
  );
};

export default BOProductEdit;
