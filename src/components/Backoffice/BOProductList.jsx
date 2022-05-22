import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";
import { Container, Button } from "react-bootstrap";
//import BOProductDetails from "./BOProductDetails";
import SodaService from "../services/SodaService";
import { sweFormat } from "../ProductlistUtilities/sekFormatting";

const BOProductList = () => {
  const [products, setProducts] = useState([]);
  const [thisProduct, setThisProduct] = useState(null);
  const [thisIndex, setThisIndex] = useState(-1);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    getAllSodas();
  }, []);

  const onChangeSearch = (e) => {
    const searchProduct = e.target.value;
    setSearchProduct(searchProduct);
  };

  const getAllSodas = () => {
    SodaService.getAll()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshProdList = () => {
    getAllSodas();
    setThisProduct(null);
    setThisIndex(-1);
  };

  const setChoosenProduct = (product, index) => {
    setThisProduct(product);
    setThisIndex(index);
  };

  const findByName = () => {
    SodaService.findByName(searchProduct)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*
  const [update, setUpdate] = useState(false);
  axios.defaults.baseURL = "http://localhost:4000/api";
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
  };*/

  return (
    <Container className="backoffice-container list row" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Alla varor</h2>
      </div>
      <div className="bo-search-filter">
        <div className="col-md-5">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchProduct}
              onChange={onChangeSearch}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-mr-3">
            <button>Sortera på namn</button>
            <button>Sortera på pris</button>
          </div>
        </div>
      </div>
      <div className="all-prod-func">
        <div className="col-md-5 all-products">
          <h4>Alla produkter</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item" + (index === thisIndex ? "active" : "")
                  }
                  onClick={() => setChoosenProduct(product, index)}
                  key={index}
                >
                  <h4>{product.name}</h4> från {product.brand}
                </li>
              ))}
          </ul>
        </div>
        <div className="BO-one-product col-md-5">
          {thisProduct ? (
            <div className="grid-container">
              <h2>Info om vald produkt</h2>
              <div className="img-grid">
                <img
                  variant="top"
                  style={{
                    width: "75px",
                    height: "225px",
                    objectFit: "scale-down",
                    margin: "auto",
                  }}
                  src={`/images/products/${thisProduct.sodasID}.png`}
                  alt="soda"
                />
              </div>
              <div>
                <label>Namn: </label>
              </div>
              <div>{thisProduct.name}</div>
              <div>
                <label>Märke:</label>{" "}
              </div>
              <div>{thisProduct.brand}</div>
              <div>
                <label>Beskrivning: </label>
              </div>
              <div> {thisProduct.description}</div>
              <div>
                <label>Konsumentpris: </label>{" "}
              </div>
              <div>{sweFormat(thisProduct.price)}</div>
              <div>
                <label>Kategori: </label>
              </div>
              <div>{thisProduct.categoriesID}</div>
              <Button variant="warning" className="edit-btn">
                <Link to={"/backoffice/products/" + thisProduct.sodasID}>
                  hantera produkt
                </Link>
              </Button>
            </div>
          ) : (
            <div>Välj en produkt ur listan att se info om</div>
          )}
        </div>
      </div>
    </Container>
  );
};
export default BOProductList;
