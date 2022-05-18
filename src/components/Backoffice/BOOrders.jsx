import React from "react";
import { Link } from "react-router-dom";
const BOOrders = () => {
  return (
    <main className="backoffice-container">
      <div className="bo-header">
        <Link to={`/backoffice`}>Tillbaka till BO</Link>
        <h2>Här är det tänkt att admin ska kunna se kundordrar</h2>
      </div>
    </main>
  );
};

export default BOOrders;
