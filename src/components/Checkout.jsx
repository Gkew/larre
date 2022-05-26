import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import axios from "axios";
import CheckoutService from '../utils/CheckoutService';
import { sweFormat } from './ProductlistUtilities/sekFormatting';

export default function Checkout() {
  const [created, setCreated] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => console.log(items), [items]);


  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  console.log("!!!" + items);

  const startOrderCreate = {
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
  };

  const [orders, setOrders] = useState(startOrderCreate);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrders({ ...orders, [name]: value });
  }

  const addOrder = (e) => {
    e.preventDefault();

    const data = {
      firstName: orders.firstName,
      lastName: orders.lastName,
      address: orders.address,
      coAddress: orders.coAddress,
      email: orders.email,
      zipCode: orders.zipCode,
      city: orders.city,
      orderTime: orders.orderTime,
      orderTotal: orders.orderTotal,
    };

    CheckoutService.create(data)
      .then((res) => {
        setOrders({
          orderID: res.data.orderID,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          address: res.data.address,
          coAddress: res.data.coAddress,
          email: res.data.email,
          zipCode: res.data.zipCode,
          city: res.data.city,
          orderTime: res.data.orderTime,
          orderTotal: res.data.orderTotal,
        });
        setCreated(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  axios.defaults.baseURL = "http://localhost:4000/api";

  let navigate = useNavigate();

  // const addMoreOrders = () => {
  //   setCreated(false);
  //   navigate("/checkout", { replace: true });
  // };

  return (
    <Container>
      <Card>
        <Form onSubmit={addOrder}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Förnamn</Form.Label>
              <Form.Control
                type="text"
                name='firstName'
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
                name='lastName'
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
              type='text'
              placeholder="Läskgatan 420"
              name='address'
              onChange={handleInput}
              defaultValue={orders.address}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>C/o adress</Form.Label>
            <Form.Control
              placeholder="Läskgatan 420"
              name='coAddress'
              onChange={handleInput}
              defaultValue={orders.coAddress}
              type="text"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Stad</Form.Label>
              <Form.Control
                placeholder='Läskeborg'
                name='city'
                onChange={handleInput}
                defaultValue={orders.city}
                type="text"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Postnummer</Form.Label>
              <Form.Control
                placeholder='133 37'
                name='zipCode'
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
              name='email'
              onChange={handleInput}
              defaultValue={orders.email}
              type="text"
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
          >
            Skicka min beställning!
          </Button>
        </Form>
      </Card>
    </Container>
  )
}
