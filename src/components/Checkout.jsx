import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import CheckoutService from "../utils/CheckoutService";
import axios from "axios";
import "../css/remove.scss";

export default function Checkout() {
  const cartFromLS = JSON.parse(localStorage.getItem("cart"));
  const [created, setCreated] = useState(false);
  const [items, setItems] = useState([]);
  let navigate = useNavigate();
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  const [orders, setOrders] = useState({
    orderID: null,
    firstName: "",
    lastName: "",
    address: "",
    coAddress: "",
    email: "",
    zipCode: "",
    city: "",
    orderTime: "",
    orderTotal: 0,
  });

  const navToThankYouPage = () => {
    navigate(`/thankyou`);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => console.log(items), [items]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrders({ ...orders, [name]: value });
  };

  const addOrder = async (e) => {
    e.preventDefault();

    const data = {
      firstName: orders.firstName,
      lastName: orders.lastName,
      address: orders.address,
      coAddress: orders.coAddress,
      email: orders.email,
      zipCode: orders.zipCode,
      city: orders.city,
      orderTotal: totalPrice,
    };

    CheckoutService.create(data)
      .then(async (res) => {
        setOrders({
          orderID: res.data.orderID,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          address: res.data.address,
          coAddress: res.data.coAddress,
          email: res.data.email,
          zipCode: res.data.zipCode,
          city: res.data.city,
          orderTotal: totalPrice,
        });
        setCreated(true);
        let orderid = res.data.lastInsertRowId;

        for (let element of cartFromLS) {
          let sodasID = element.sodasID;
          let quantity = element.quantity;

          await axios.post("http://localhost:4000/api/orderdetails", {
            sodasIDKey: sodasID,
            quantityID: quantity,
            orderid,
          });
          localStorage.removeItem("cart");
          navigate(`/thankyou`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container style={{ minHeight: "50vh", backgroundColor: "#F9CEEE" }}>
      <Card className="border border-0">
        <Form
          onSubmit={addOrder}
          style={{ marginTop: "8px", backgroundColor: "#F9CEEE" }}
        >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Förnamn</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Skriv in ditt förnamn"
                onChange={handleInput}
                defaultValue={orders.firstName}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Efternamn</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Skriv in ditt efternamn"
                onChange={handleInput}
                defaultValue={orders.lastName}
                required
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              type="text"
              placeholder="Läskgatan 420"
              name="address"
              onChange={handleInput}
              defaultValue={orders.address}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>C/o adress</Form.Label>
            <Form.Control
              placeholder="Läskgatan 420"
              name="coAddress"
              onChange={handleInput}
              defaultValue={orders.coAddress}
              type="text"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Stad</Form.Label>
              <Form.Control
                placeholder="Läskeborg"
                name="city"
                onChange={handleInput}
                defaultValue={orders.city}
                type="text"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Postnummer</Form.Label>
              <Form.Control
                placeholder="133 37"
                name="zipCode"
                onChange={handleInput}
                defaultValue={orders.zipCode}
                type="text"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="älskar@läsk.com"
              name="email"
              onChange={handleInput}
              defaultValue={orders.email}
              type="text"
              required
            />
          </Form.Group>
          {!navigator.onLine ? (
            <Container>
              {/* Om Offline */}
              <div className="order-offline-container">
                <h3>Du kan inte lägga en order om du är offline!</h3>
                <p>Försök igen när du är online.</p>
              </div>
            </Container>
          ) : (
            <button
              style={{
                backgroundColor: "#FEC98F",
                border: "none",
                color: "black",
              }}
              variant="primary"
              type="submit"
              className="mt-2 btn mx-auto ms-3"
            >
              Skicka min beställning!
            </button>
          )}
        </Form>
      </Card>
    </Container>
  );
}
