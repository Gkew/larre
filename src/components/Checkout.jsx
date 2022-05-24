import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { empty, remove, save } from '../utils/shoppingCartLogic';

export default function Checkout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => console.log(items), [items])

  return (<Container className='checkout'>
    <Row>
      <Col>
        <h1>Varukorg</h1>
      </Col>
    </Row>
    <Row>
      <Card>
        <Col>
          <h1>{items.name}</h1>
        </Col>
      </Card>
    </Row>

  </Container>
  )
}
