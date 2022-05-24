import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import { sweFormat } from './ProductlistUtilities/sekFormatting'
import '../css/ProductList.css'
import { add } from '../utils/shoppingCartLogic'
import FilterUtil, { SORTOPTION } from '../components/ProductlistUtilities/FilterComponents'
import SearchPage from "./SearchComponents/SearchPage";

export default function ProductList() {

  let navigate = useNavigate();

  function details(sodasID) {
    navigate(`/productdetails/${sodasID}`);
  }

  axios.defaults.baseURL = "http://localhost:4000/api";
  const [sodasList, setSodasList] = useState([]);
  const [category, setCategory] = useState("all")
  const [filter, setFilter] = useState(-1);

  //LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("sodasList", JSON.stringify(sodasList));
  }, [sodasList]);

  useEffect(() => {
    axios.get("/sodas")
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
    return FilterUtil.getSortFilter(FilterUtil.getCategoryFilter(sodasList, category), filter)
  }



  return (
    <>
      <Row>
        <Col xs={6}  style={{width: '300px', margin: '20px auto'}}>
          <Form.Select className="w-100" onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            {[...new Set(sodasList.map(x => x.categoriesID))].map(x => <option value={x}>{x}</option>)}
          </Form.Select>
        </Col>
        <Col xs={6} style={{width: '300px', margin: 'auto'}}>
          <Form.Select className="w-100" onChange={(e) => setFilter(e.target.value)}>
            <option value={-1}>None</option>
            <option value={SORTOPTION.AToZ}>A-Z</option>
            <option value={SORTOPTION.Ascending}>Ascending</option>
            <option value={SORTOPTION.Descending}>Descending</option>
          </Form.Select>
        </Col>
      </Row>
      <div className="ProductList">
        {getData().map((val, key) => {
          return (
          
            <Col sm={3} className="py-2" key={val.sodasID} onClick={() => details(val.sodasID)}>
              <Card
                className="h-100"
                style={{ backgroundColor: "#F9CEEE", border: "none" }}
              >
                <img
                  variant="top"
                  style={{
                    width: "150px",
                    height: "450px",
                    objectFit: "scale-down",
                    margin: "auto",
                  }}
                  src={`/images/products/${val.sodasID}.png`}
                  alt="soda"
                />
                <Card.Body style={{ backgroundColor: "#F9F3EE" }}>
                <Card.Text className="py-2"><h4>{val.brand}</h4></Card.Text>
                  <Card.Title className="py-2" style={{height: '8rem'}}>
                    <h1>{val.name}</h1>
                  </Card.Title>
                  
                  <Card.Text style={{ height: "fit-content",overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxHeight: '50px',
                  whiteSpace: 'nowrap'}}>
                    {val.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: "#CCF3EE" }}>
                  <h4 className="text-muted">
                    <b>{sweFormat(val.price)} </b>
                  </h4>
               
                  <button
                  style={{backgroundColor: "#FEC98F", border: 'none', color: 'black'}}
                    type="button"
                    onClick={buy}
                    className="mt-2 btn btn-primary float-end ms-3"
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
