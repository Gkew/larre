import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import Axios from "axios";
import '../css/ProductList.css'

const sekFormatting = new Intl.NumberFormat(
  'sv-SE', { style: 'currency',
  currency: 'SEK', 
  maximumSignificantDigits: 2}
);

export function sweFormat(number) {
  return sekFormatting.format(number);
}


export default function ProductList() {
let navigate = useNavigate();

function showDetail(id) {
  navigate(`/productdetails/${id}`);
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
          <Card /*style={{backgroundColor: '#F9CEEE', border: 'none'}}*/>
            <img variant="top" style={{ width: '150px', height: '450px', objectFit: 'scale-down', margin: 'auto' }} src={`/images/products/${val.id}.png`} alt="soda" />
            <Card.Body /*style={{backgroundColor: '#F9F3EE'}}*/>
              <Card.Title><h1>{val.name}</h1>,  <h3>{val.brand}</h3></Card.Title>
              <Card.Text>

          </Card.Text>
          <Card.Text style={{height: 'fit-content'}}>
               <p>{val.description}</p>
              
              </Card.Text>
            </Card.Body>
            <Card.Footer /*style={{backgroundColor: '#CCF3EE'}}*/>
              <small className="text-muted"><b>{sweFormat(val.price)} </b></small>
              <Button key={val.id} onClick={() => showDetail(val.id)} className="float-end ms-3">Köp</Button>
            </Card.Footer>
          </Card>

          </Col>


          // <Container>
          // <Card>
          // <Row>
          // <Col sm> <img style={{ width: '100px', height: '400px', objectFit: 'cover' }}
          // src={`/images/products/${val.id}.png`} alt="soda" /></Col>
          // </Row>
          //   <Row>
          //     <Col sm={8}><h1>{val.name}</h1></Col>
          //     <Col sm={4}>{val.brand}</Col>
          //   </Row>
          //   <Row>
          //     <Col sm>{sweFormat(val.price)}</Col>
          //   </Row>
          //   </Card>
          // </Container>


          // <Container>
          //   <Card style={{borderBottom: '0.5px solid black'}}>
          //   <Row>
          //     <Col> <h1>{val.name}</h1> </Col>
          //     <Col> <h4>{val.description}</h4>
          //     </Col>
          //     </Row>
          //     <Row>
          //     <Col>
          //     <img style={{ width: '100px', height: '400px', objectFit: 'cover' }}
          //     src={`/images/products/${val.id}.png`} alt="soda" />
          //     <b>{sweFormat(val.price)}</b> </Col>
          //     <Col> <h3 className="float-end ms-3">{val.brand}</h3></Col>
          //     </Row>

          //   </Card>
          // </Container>
        );
      })}
    </div>
  );
}
