import React from "react";
import { Link } from "react-router-dom";

const Backoffice = () => {
  return (
    <main className="backoffice-container">
      <div>
        <h2>Här är startsidan för Back office!</h2>
        <p> Här hamnar du efter att ha loggat in som admin</p>
      </div>

      <section className="backoffice-nav" aria-label="backoffice-linksection">
        <div className="bo-links">
          <Link to={`/backoffice/products`}>
            Klicka här för att se befintliga produkter
          </Link>
        </div>
        <div className="bo-links">
          <Link to={`/backoffice/addproduct`}>
            Klicka här för att lägga till en produkt
          </Link>
        </div>
        <div className="bo-links">
          <Link to={`/backoffice/orders`}>
            Klicka här för att se kundordrar
          </Link>
        </div>
      </section>
    </main>
  );
};
export default Backoffice;
