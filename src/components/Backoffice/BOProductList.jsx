import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Button, Form, Row } from "react-bootstrap";
import SodaService from "../services/SodaService";
import { sweFormat } from "../ProductlistUtilities/sekFormatting";
import FilterUtil, {
  SORTOPTION,
} from "../ProductlistUtilities/FilterComponents";

const BOProductList = () => {
  const [products, setProducts] = useState([]);
  const [thisProduct, setThisProduct] = useState(null);
  const [thisIndex, setThisIndex] = useState(-1);
  const [filter, setFilter] = useState(-1);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getAllSodas();
  }, []);

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
    <Container className="backoffice-container list row" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Alla varor</h2>
      </div>
      <div className="bo-search-filter">
        <div className="col-md-5">
          <Row>
            <Col xs={6}>
              <label>
                <h4>Filtrera ut kategorier</h4>
              </label>
              <Form.Select
                className="w-100"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                {products
                  .map((x) => x.categoriesID)
                  .filter((a, b, arr) => arr.indexOf(a) === b)
                  .map((x) => (
                    <option value={x}>{x}</option>
                  ))}
              </Form.Select>
            </Col>
            <Col xs={6}>
              <label>
                <h4>Sortera på...</h4>
              </label>
              <Form.Select
                className="w-100"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value={-1}>None</option>
                <option value={SORTOPTION.AToZ}>Namn: A-Ö</option>
                <option value={SORTOPTION.Descending}>
                  Pris lågt till högt
                </option>
                <option value={SORTOPTION.Ascending}>
                  Pris högt till lågt
                </option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </div>
      <div className="all-prod-func">
        <div className="col-md-5 all-products">
          <h4>Alla produkter</h4>

          <ul className="list-group">
            {products &&
              getData().map((product, index) => (
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
                  Hantera produkt
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
