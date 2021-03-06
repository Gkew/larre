import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { sweFormat } from "./ProductlistUtilities/sekFormatting";

export default function Cart() {
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, []);

  const remove = (id) => {
    let newItems = items.filter((item) => item.sodasID !== id);
    localStorage.cart = JSON.stringify(newItems);
    setItems(newItems);
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const navigateToCheckout = () => {
    navigate(`/checkout`);
  };

  return (
    <Container className="checkout" style={{ minHeight: "50vh" }}>
      <Row>
        <h1 style={{ marginTop: "2vh" }}>Varukorg</h1>
      </Row>
      <Row>
        <Col>
          <Link to="/productlist">
            <button type="button">Tillbaka till produkter</button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="text-center border-0">
            {items.map((x) => {
              return (
                <>
                  <Row className="border-bottom border-0">
                    <Col style={{ backgroundColor: "#F9CEEE" }}>
                      <Card.Img
                        src={`/images/products/${x.sodasID}.png`}
                        style={{
                          width: 49,
                          height: 140,
                          objectFit: "scale-down",
                        }}
                        alt="image"
                      ></Card.Img>
                    </Col>
                    <Col style={{ backgroundColor: "#97C4B8" }}>
                      <Card.Text
                        style={{ textAlign: "center", marginTop: "30px" }}
                      >
                        <span key={x.sodasID}>{x.brand}</span>
                        <div key={x.sodasID}>{x.name}</div>
                      </Card.Text>
                    </Col>
                    <Col style={{ backgroundColor: "#CCF3EE" }}>
                      <div
                        style={{ textAlign: "center", marginTop: "20px" }}
                        key={x.quantity}
                      >
                        Antal: {x.quantity}
                      </div>
                      <div
                        style={{ textAlign: "center", marginTop: "10px" }}
                        key={x.sodasID}
                      >
                        {sweFormat(x.price * x.quantity)}
                      </div>
                      <button
                        style={{
                          backgroundColor: "#F47C7C",
                          border: "none",
                          color: "black",
                        }}
                        type="button"
                        onClick={() => remove(x.sodasID)}
                        className="mt-2 btn btn-primary float-end ms-3"
                      >
                        Ta bort
                      </button>
                    </Col>
                  </Row>
                </>
              );
            })}
          </Card>
        </Col>
        <Row>
          <Card>
            <Row>
              <h3 style={{ marginLeft: "5px" }}>Totalsumma</h3>
            </Row>
            <Row>
              <Col>
                <span style={{ marginLeft: "5px" }}>
                  Summa: {sweFormat(totalPrice)}
                </span>
              </Col>
            </Row>
            {!navigator.onLine ? (
              <Container>
                {/* Om Offline */}
                <div className="order-offline-container">
                  <h3>Du kan inte l??gga en order om du ??r offline!</h3>
                  <p>F??rs??k igen n??r du ??r online.</p>
                </div>
              </Container>
            ) : (
              <>
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
              </>
            )}
          </Card>
        </Row>
      </Row>
    </Container>
  );
}
