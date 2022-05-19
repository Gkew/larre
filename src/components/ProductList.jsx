import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import Axios from "axios";
import { sweFormat } from './ProductlistUtilities/sekFormatting'
import '../css/ProductList.css'



export default function ProductList() {

let navigate = useNavigate();

function details(sodasID) {
  navigate(`/productdetails/${sodasID}`);
  }


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
      {sodasList.map((val, key) => {
        return (

          <Col sm={3} className="py-2">
          <Card className="h-100" style={{backgroundColor: '#F9CEEE', border: 'none'}}>
            <img variant="top" style={{ width: '150px', height: '450px', objectFit: 'scale-down', margin: 'auto' }} src={`/images/products/${val.sodasID}.png`} alt="soda" />
            <Card.Body style={{backgroundColor: '#F9F3EE'}}>
              <Card.Title><h1>{val.name}</h1>, <h3>{val.brand}</h3></Card.Title>
              <Card.Text>

          </Card.Text>
          <Card.Text style={{height: 'fit-content'}}>
               <p>{val.description}</p>
              
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: '#CCF3EE'}}>
              <small className="text-muted"><b>{sweFormat(val.price)} </b></small>
              <Button key={val.sodasID} onClick={() => details(val.sodasID)} className="float-end ms-3">Detaljer</Button>
            </Card.Footer>
          </Card>

          </Col>

        );
      })}
    </div>
  );
}
