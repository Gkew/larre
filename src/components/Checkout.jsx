import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { empty, remove, save } from '../utils/shoppingCartLogic';
import { sweFormat } from './ProductlistUtilities/sekFormatting';

export default function Checkout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => console.log(items), [items])

  return (
    <Container className='checkout'>
      <Row>
        <h1>Varukorg</h1>
      </Row>
      <Row>
        <Col xs={7}>
          <Card>

            {items.map(x => {
              return (<div key={x.sodasID}>{x.name} - {sweFormat(x.price)}</div>)
            })}

          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <h3>Totalsumma</h3>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}
