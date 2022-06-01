import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import SodaService from "../services/SodaService";
import { sweFormat } from "../ProductlistUtilities/sekFormatting";
import FilterUtil, {
  SORTOPTION,
} from "../ProductlistUtilities/FilterComponents";

import { missingImage } from "../../utils/missingImage";

const BOProductList = () => {
  const [products, setProducts] = useState([]);
  const [thisProduct, setThisProduct] = useState(null);
  const [thisIndex, setThisIndex] = useState(-1);
  const [filter, setFilter] = useState(-1);
  const [category, setCategory] = useState("all");
  const [input, setInput] = useState("");

  useEffect(() => {
    getAllSodas();
  }, []);

  const searchSodas = (x) => {
    if (input === "") {
      return products;
    } else if (
      x.name.toLowerCase().includes(input.toLowerCase()) ||
      x.brand.toLowerCase().includes(input.toLowerCase())
    ) {
      return products;
    }
  };

  const getAllSodas = () => {
    SodaService.getAll()
      .then((res) => {
        setProducts(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setChoosenProduct = (product, index) => {
    setThisProduct(product);
    setThisIndex(index);
  };

  const getData = () => {
    return FilterUtil.getSortFilter(
      FilterUtil.getCategoryFilter(products, category),
      filter
    );
  };

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <Link to={`/backoffice`}>
          {" "}
          <button>{`<< Tillbaka till BO`}</button>
        </Link>

        <h2>Våra produkter</h2>
      </div>
      <div className="bo-search-filter">
        <label>
          <h4>Filtrera ut kategorier</h4>
        </label>
        <Form.Select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Alla</option>
          {[...new Set(products.map((x) => x.categoriesID))].map((x) => (
            <option value={x}>{x}</option>
          ))}
        </Form.Select>

        <label>
          <h4>Sortera på...</h4>
        </label>
        <Form.Select onChange={(e) => setFilter(e.target.value)}>
          {/* <option value={-1}>Standard</option> */}
          <option value={-1}>Namn: A-Ö</option>
          <option value={SORTOPTION.ÖToA}>Namn: Ö-A</option>
          <option value={SORTOPTION.Descending}>Pris lågt till högt</option>
          <option value={SORTOPTION.Ascending}>Pris högt till lågt</option>
        </Form.Select>

        <div className="searchbar">
          <input
            type="text"
            value={input}
            placeholder="Sök på produktnamn"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="all-prod-func">
        <div className="all-products">
          <h2>Alla produkter</h2>

          <ul className="list-group">
            {products &&
              getData()
                .filter((x) => searchSodas(x))
                .map((product, index) => (
                  <li
                    className={
                      "list-group-item" + (index === thisIndex ? "active" : "")
                    }
                    onClick={() => setChoosenProduct(product, index)}
                    key={index}
                  >
                    <h4>{product.name}</h4> från <label>{product.brand}</label>
                  </li>
                ))}
          </ul>
        </div>

        {thisProduct ? (
          <div className="BO-one-product">
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
                onError={(event) => missingImage(event, thisProduct.name)}
                src={`/images/products/${thisProduct.sodasID}.png`}
                alt="soda"
              />
            </div>
            <div>
              <label>Namn: </label>
            </div>
            <h5>{thisProduct.name}</h5>
            <div>
              <label>Märke:</label>{" "}
            </div>
            <h5>{thisProduct.brand}</h5>
            <div>
              <label>Beskrivning: </label>
            </div>
            <h5> {thisProduct.description}</h5>
            <div>
              <label>Konsumentpris: </label>{" "}
            </div>
            <h5>{sweFormat(thisProduct.price)}</h5>
            <div>
              <label>Kategori: </label>
            </div>
            <h5>{thisProduct.categoriesID}</h5>
            <Button variant="warning" className="edit-btn">
              <Link to={"/backoffice/products/" + thisProduct.sodasID}>
                Hantera produkt
              </Link>
            </Button>
          </div>
        ) : (
          <div className="all-products">
            <h3>Välj en produkt ur listan att se info om</h3>
          </div>
        )}
      </div>
    </Container>
  );
};
export default BOProductList;
