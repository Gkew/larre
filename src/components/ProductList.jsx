import React, { useState, useEffect } from "react";
import { Container, Col, Card, Row } from "react-bootstrap";
import Axios from "axios";


const sekFormatting = new Intl.NumberFormat(
  'sv-SE', { style: 'currency', currency: 'SEK' }
);

export function sweFormat(number) {
  return sekFormatting.format(number);
}

export default function ProductList() {
  Axios.defaults.baseURL = "http://localhost:4000/api";

  const [sodasList, setSodasList] = useState([]);

  useEffect(() => {
    Axios.get("/sodas").then((response) => {
      console.log(response.data)
      setSodasList(response.data);
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  }, []);

  return (
    <div className="ProductList">
    <Row><Col><h1>Products</h1></Col></Row>
      {sodasList.map((val, key) => {
        return (
          <Container>
            <Card style={{borderBottom: '0.5px solid black'}}>
              <Col> <h1>{val.name}</h1> </Col>
              <Col> <h4>{val.description}</h4> </Col>
              <Col> <b>{sweFormat(val.price)}</b> </Col>
              <Col> <h3>{val.brand}</h3> </Col>
            </Card>
          </Container>
        );
      })}
    </div>
  );
}
