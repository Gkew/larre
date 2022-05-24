import React, { useState, useEffect, } from "react";
import { Container, Row,  } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Col, Card, Button } from "react-bootstrap";
import { CardContent } from "@mui/material";
import { sweFormat } from "./ProductlistUtilities/sekFormatting";

export default function Productdetails () {
 
  const [details, setDetails] = useState([]);
  // const [products, setProducts] = useState([]);
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
    <div className="productsdetails" style={{textAlign: "center", padding: "3%"}}  >
      <Col sm={8} style={{margin: "auto"}}    >
       
        <Card style={{ border: "none", backgroundColor: "#F9F3EE" }}>
          <Card.Body style={{ backgroundColor: "#F9F3EE" }}>
        <Card.Title>
          {details.name}
          
          </Card.Title> 
           <Card.Text>
            {details.brand}
           
          </Card.Text>

        
          <img variant="top" style={{ width: '200px', height: '500px', objectFit: 'scale-down', margin: 'auto' }} src={`/images/products/${sodasID}.png`}/> 
          <Card.Text style={{padding: "5%"}}>
            {details.description}
           
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {sweFormat(details.price)}
            <button
                      style={{
                        backgroundColor: "#FEC98F",
                        border: "none",
                        color: "black",
                      }}
                      type="button"
                      // onClick={buy}
                      className="mt-2 btn btn-primary float-end ms-3"
                    >
                      Köp
                    </button>
      </Card.Footer>
          
      </Card>
        </Col>
    </div>
  );
}

