import React from "react";
import { Button } from "react-bootstrap";

const BOProductDetails = ({ product, deleteProduct, updateProduct }) => {
  const { id, name, brand, description, price, category } = product;

  return (
    <>
      <div className="grid-container" key={id}>
        <div className="img-grid">
          <img
            style={{ width: "100px", height: "350px", objectFit: "cover" }}
            src={`/images/products/${product.id}.png`}
            alt="soda"
          />
        </div>
        <div className="grid1">
          <label>Namn: </label>
        </div>
        <div className="grid2">{name}</div>
        <div className="grid1">
          <label>Märke: </label>{" "}
        </div>
        <div className="grid2">{brand}</div>
        <div className="grid1">
          <label>Beskrivning: </label>
        </div>
        <div className="grid2"> {description}</div>
        <div className="grid1">
          <label>Konsumentpris: </label>{" "}
        </div>
        <div className="grid2">{price} SEK</div>

        <div className="grid1">
          <label>Kategori: </label>
        </div>
        <div className="grid2">{category}</div>
        <Button
          className="detail-btn grid1"
          variant="outline-warning"
          name={id}
          onClick={updateProduct}
        >
          Uppdatera
        </Button>
        <Button
          className="detail-btn grid3"
          variant="outline-danger"
          name={id}
          onClick={deleteProduct}
        >
          Ta bort
        </Button>
      </div>
    </>
  );
};

export default BOProductDetails;
