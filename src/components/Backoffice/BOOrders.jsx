import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import SodaService from "../services/SodaService";

const BOOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    SodaService.getAllOrders()
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <Link to={`/backoffice`}>
          {" "}
          <button>{`<< Tillbaka till BO`}</button>
        </Link>

        <h2>Kundordrar</h2>
      </div>
      <div className="all-prod-func">
        <div className="all-products">
          <h2>Det här är alla aktiva ordrar</h2>
          <ul className="list-group">
            {allOrders.map((order) => (
              <li key={order.orderID}>
                <b>{order.email}</b> beställde för <b>{order.orderTotal}</b> kr.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default BOOrders;
