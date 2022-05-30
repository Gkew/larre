import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { sweFormat } from './ProductlistUtilities/sekFormatting';


export default function Cart() {
  const cartFromLS = JSON.parse(localStorage.getItem('cart'));
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setItems(items);
    }
  }, []);

  const remove = () => {
    localStorage.removeItem("cart");
  };

  const totalPrice = items.reduce((total, item) => total + item.price, 0)

  const navigateToCheckout = () => {
    navigate(`/checkout`)
  }

  console.log("!!!" + items.sodasID)

  return (
    <Container className='checkout' style={{ height: "100vh", width: "100vh", backgroundColor: "#F9CEEE" }}>
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
                      <Card.Text style={{ textAlign: "center", marginTop: "40px" }}>
                        <span key={x.sodasID}>{x.brand}
                        </span>
                        <div key={x.sodasID}>{x.name}
                        </div>
                      </Card.Text>
                    </Col>
                    <Col style={{ backgroundColor: "#CCF3EE" }}>
                      <div style={{ textAlign: "center", marginTop: "55px" }} key={x.sodasID}>{sweFormat(x.price)}
                      </div>
                      <button
                        style={{
                          backgroundColor: "#FEC98F",
                          border: "none",
                          color: "black",
                        }}
                        type="button"
                        onClick={() => remove()}
                        className="mt-2 btn btn-primary float-end ms-3"
                      >
                        Ta bort
                      </button>
                    </Col>
                  </Row>
                </>
              )
            })}
          </Card>
        </Col>
        <Col xs={4}>
          <Card>
            <Row>
              <h3 style={{ marginLeft: "5px" }}>Totalsumma</h3>
            </Row>
            <Row>
              <Col>
                <span style={{ marginLeft: "5px" }}>Summa:</span>
              </Col>
              <Col>
                <div>{sweFormat(totalPrice)}</div>
              </Col>
            </Row>
            <button
              style={{
                backgroundColor: "#FEC98F",
                border: "none",
                color: "black",
              }}
              type="button"
              onClick={navigateToCheckout}
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
