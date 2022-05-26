import React, { useEffect, useState } from "react";
import SodaService from "../services/SodaService";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const BOOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    SodaService.getOrders()
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <Link to={`/backoffice`}>
          <button>{`<< Tillbaka till BO`}</button>
        </Link>
        <h2>Alla ordrar</h2>
      </div>

      <div className="all-orders all-products">
        <ul className="list-group"></ul>
      </div>
    </Container>
  );
};

export default BOOrders;
