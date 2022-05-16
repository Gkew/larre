import React from "react";
import "../Backoffice/Backoffice.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Backoffice = () => {
  return (
    <main className="backoffice-container">
      <div className="bo-header">
        <h2>Här är startsidan för Back office!</h2>
      </div>

      <section className="bo-nav" aria-label="backoffice-linksection">
        <Button className="bo-links" variant="primary">
          <Link to={`/backoffice/products`}>
            Klicka här för att se befintliga produkter
          </Link>
        </Button>
        <Button className="bo-links" variant="primary">
          <Link to={`/backoffice/addproduct`}>
            Klicka här för att lägga till en produkt
          </Link>
        </Button>
        <Button className="bo-links" variant="info">
          <Link to={`/backoffice/orders`}>
            Klicka här för att se kundordrar
          </Link>
        </Button>
      </section>
    </main>
  );
};
export default Backoffice;
