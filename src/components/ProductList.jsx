import React, { useState, useEffect } from "react";
import { Container, Col, Card } from "react-bootstrap";
import Axios from "axios";

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

  // const getSoda = () => {
  //   Axios.get("http://localhost:4000/api/sodas").then((response) => {
  //     setSodasList(response.data);
  //   });
  // };

  return (
    <div className="ProductList">
      <h1>ProductList</h1>
      {sodasList.map((val, key) => {
        return (
          <Container>
            <Card style={{border: '2px solid'}}>
              <Col xxl="12">
                <h3>{val.name}</h3>
                <h3>{val.description}</h3>
                <h3>{val.price}</h3>
                <h3>{val.brand}</h3>
              </Col>
            </Card>
          </Container>
        );
      })}
    </div>
  );
}
