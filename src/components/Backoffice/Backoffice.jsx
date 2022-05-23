import React from "react";
import "../Backoffice/Backoffice.scss";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Backoffice = () => {
  return (
    <>
      <Container className="backoffice-container" fluid>
        <div className="bo-header">
          <h2>Välkommen till Back office!</h2>
        </div>

        <section className="bo-nav" aria-label="backoffice-linksection">
          <button className="bo-links">
            <Link to={`/backoffice/products`}>
              Klicka här för att se befintliga produkter
            </Link>
          </button>
          <button className="bo-links">
            <Link to={`/backoffice/addproduct`}>
              Klicka här för att lägga till en produkt
            </Link>
          </button>

          <button className="bo-links">
            <Link to={`/backoffice/categoryhandling`}>
              Klicka här för att hantera kategorier
            </Link>
          </button>
          <button className="bo-links">
            <Link to={`/backoffice/orders`}>
              Klicka här för att se kundordrar
            </Link>
          </button>
        </section>
      </Container>
    </>
  );
};
export default Backoffice;
