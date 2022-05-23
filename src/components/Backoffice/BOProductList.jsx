import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import BOProductDetails from "./BOProductDetails";
import FilterUtil, { SORTOPTION } from '../ProductlistUtilities/FilterComponents'

export function BOProductList() {
  axios.defaults.baseURL = "http://localhost:4000/api";
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all")
  const [filter, setFilter] = useState(-1);
  const [update, setUpdate] = useState(false);


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
  };

  const getData = () => {
    return FilterUtil.getSortFilter(FilterUtil.getCategoryFilter(products, category), filter);
  }

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Alla varor</h2>
      </div>
      <div className="bo-search-filter">
        <Row>
          <Col xs={6}>
            <label><h4>Ifall du vill ha label typ</h4></label>
            <Form.Select className="w-100" onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All</option>
              {products.map(x => x.categoriesID).filter((a, b, arr) => arr.indexOf(a) === b)
                .map(x => <option value={x}>{x}</option>)}
            </Form.Select>
          </Col>
          <Col xs={6}>
            <label><h4>Ifall du vill ha label typ</h4></label>
            <Form.Select className="w-100" onChange={(e) => setFilter(e.target.value)}>
              <option value={-1}>None</option>
              <option value={SORTOPTION.AToZ}>A-Z</option>
              <option value={SORTOPTION.Ascending}>Ascending</option>
              <option value={SORTOPTION.Descending}>Descending</option>
            </Form.Select>
          </Col>
        </Row>
        <br />
        Även admin bör kunna göra detta för att snabbt hitta den produkt vi
        behöver uppdatera eller ta bort.
      </div>
      {getData().map((product) => (
        <div
          className="BO-one-product"
          key={product.sodasID}
          aria-label="product-div"
        >
          <BOProductDetails product={product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </Container>
  );
}
export default BOProductList;
