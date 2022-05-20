import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const BOOrders = () => {
  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Här är det tänkt att admin ska kunna se kundordrar</h2>
      </div>
    </Container>
  );
};

export default BOOrders;
