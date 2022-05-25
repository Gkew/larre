import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { sweFormat } from './ProductlistUtilities/sekFormatting';

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [totalSum, setTotalSum] = useState([]);



  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => console.log(items), [items]);


  const cartContents = localStorage.getItem("cart");

  // const getTotalSum = () => {
  //   return cartContents.reduce((sum, { price }) = sum + price)
  // };

  console.log("!!!" + totalSum)

  return (
    <Container className='checkout'>
      <Row>
        <h1>Varukorg</h1>
      </Row>
      <Row>
        <Col xs={7}>
          <Card className="text-center border-0">

            {items.map(x => {
              return (
                <>
                  <Row className="border-bottom border-0">
                    <Col style={{ backgroundColor: "#F9CEEE" }}>
                      <Card.Img src={`/images/products/${x.sodasID}.png`} style={{ height: 140, objectFit: 'scale-down' }}>
                      </Card.Img>
                    </Col>
                    <Col style={{ backgroundColor: "#97C4B8" }}>
                      <Card.Text>
                        <div key={x.sodasID}>{x.brand}
                        </div>
                        <div key={x.sodasID}>{x.name}
                        </div>
                      </Card.Text>
                    </Col>
                    <Col style={{ backgroundColor: "#CCF3EE" }}>
                      <div key={x.sodasID}>{sweFormat(x.price)}
                      </div>
                    </Col>
                  </Row>
                </>
              )
            })}

          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <h3>Totalsumma</h3>

            <div>as mkt pengar</div>

            <button
              style={{
                backgroundColor: "#FEC98F",
                border: "none",
                color: "black",
              }}
              type="button"

              className="mt-2 btn btn-primary float-end ms-3"
            >
              Checka ut!
            </button>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}
