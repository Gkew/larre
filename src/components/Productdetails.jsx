import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Axios from "axios";


export default function Productdetails () {
 
  const [details, setDetails] = useState([]);
  


 
  Axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    Axios.get("/sodas").then((response) => {
      console.log(response.data)
      setDetails(response.data);
    })
    .catch((err) => {
      console.log(err.response.data)
    }) 
  }, []);

  return (
    <div>
      {details.map((val) => {
        return (
          <Container  className="detaillist">
            <Row>
              <Col>{val.name}</Col>
            </Row>
            <Row>
              <Col>{val.description} </Col>
            </Row>
          </Container>
        
      )}) }
       
      
    </div>
  );
}

