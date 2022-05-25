import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Card, FormControl } from "react-bootstrap";
import axios from "axios";
import { sweFormat } from "./ProductlistUtilities/sekFormatting";
import "../css/ProductList.css";
import "../css/searchbar.css";
import { add } from "../utils/shoppingCartLogic";
import FilterUtil, {
  SORTOPTION,
} from "../components/ProductlistUtilities/FilterComponents";
// import { BsSearch } from "react-icons/bs";

export default function ProductList() {
  let navigate = useNavigate();

  function details(sodasID) {
    navigate(`/productdetails/${sodasID}`);
  }

  axios.defaults.baseURL = "http://localhost:4000/api";
  const [sodasList, setSodasList] = useState([]);
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState(-1);
  const [input, setInput] = useState("");

  const searchSodas = (x) => {
    if (input === "") {
      return sodasList;
    } else if (
      x.name.toLowerCase().includes(input.toLowerCase()) ||
      x.brand.toLowerCase().includes(input.toLowerCase())
    ) {
      return sodasList;
    }
  };

  //LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("sodasList", JSON.stringify(sodasList));
  }, [sodasList]);

  useEffect(() => {
    axios
      .get("/sodas")
      .then((response) => {
        console.log(response.data);
        setSodasList(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  //ADDS TO LOCALSTORAGE + NAVIGATE
  function buy() {
    navigate("/checkout");
    add(sodasList.id);
  }
  const getData = () => {
    return FilterUtil.getSortFilter(
      FilterUtil.getCategoryFilter(sodasList, category),
      filter
    );
  };

  return (
    <>
      <Row>
        <Col className="FilterCol">

          <Form.Select
            className="ProductFilter"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Alla</option>
            {[...new Set(sodasList.map((x) => x.categoriesID))].map((x) => (
              <option value={x}>{x}</option>
            ))}
          </Form.Select>

            <FormControl
              className="ProductSearch"
              type="search"
              value={input}
              placeholder="Sök"
              onChange={(e) => setInput(e.target.value)}
            />

          <Form.Select
          className="ProductSort"
            onChange={(e) => setFilter(e.target.value)}
          >
            {/* <option value={-1}>Standard</option> */}
            <option value={-1}>Namn: A-Ö</option>
            <option value={SORTOPTION.ÖToA}>Namn: Ö-A</option>
            <option value={SORTOPTION.Ascending}>Pris lågt till högt</option>
            <option value={SORTOPTION.Descending}>Pris högt till lågt</option>
          </Form.Select>
        </Col>
      </Row>


      <div className="ProductList">
        {getData()
          .filter((x) => searchSodas(x))
          .map((val, key) => {
            return (
              <Col
                sm={3}
                className="py-2"
                key={val.sodasID}
                onClick={() => details(val.sodasID)}
              >
                <Card
                  className="PCard"
                >
                  <Card.Img
                  className="ProdImg"
                    variant="top"
                    src={`/images/products/${val.sodasID}.png`}
                    alt="soda"
                  />
                  <Card.Body className="CBody" >
                    <Card.Text className="CText">
                      <h4>{val.brand}</h4>
                    </Card.Text>
                    <Card.Title className="CTitle">
                      <h1>{val.name}</h1>
                    </Card.Title>


                  </Card.Body>
                  <Card.Footer className="CFooter">
                    <h4 className="text-muted">
                      <b>{sweFormat(val.price)} </b>
                    </h4>
                    <button 
                      type="button"
                      onClick={buy}
                      className="buyBtn"
                    >
                      Köp
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
      </div>
    </>
  );
}
