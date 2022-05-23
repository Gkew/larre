import React, { useState, useEffect, } from "react";
import { Container, Row,  } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Col, Card, Button } from "react-bootstrap";


export default function Productdetails () {
 
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const { sodasID } = useParams()
 useEffect(() => {
    console.log(sodasID)
  },[sodasID])
  Axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    Axios.get(`/sodas/${sodasID}`).then((response) => {
      console.log(response.data)
      setDetails(response.data);
    })
    .catch((err) => {
      console.log(err.response.data)
    }) 
  }, []);

  


  return (
    <div>
      <h1>{details.name}</h1>
      <Col sm={3} className="py-2">
          <Card className="h-100" style={{backgroundColor: '#F9CEEE', border: 'none'}}>
            <img variant="top" style={{ width: '150px', height: '450px', objectFit: 'scale-down', margin: 'auto' }} src={`/images/products/${details.sodasID}.png`} alt="soda" />
            <Card.Body style={{backgroundColor: '#F9F3EE'}}>
              <Card.Title><h1>{details.name}</h1>, <h3>{details.brand}</h3></Card.Title>
              <Card.Text>

            </Card.Text>
            </Card.Body>
            </Card>
            </Col>
    </div>
  );
}

