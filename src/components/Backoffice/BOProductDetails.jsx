import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BOProductEdit from "./BOProductEdit";
import { sweFormat } from "../ProductlistUtilities/sekFormatting";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const BOProductDetails = ({ product, deleteProduct }) => {
  const { sodasID, name, brand, description, price, categoriesID } = product;
  const [prodId, setProdId] = useState("");
  const [updateCollapse, setUpdateCollapse] = useState(false);

  const updateProduct = (e) => {
    setProdId(e.target.name);
    setUpdateCollapse(true);
  };
  const closeCollapse = () => {
    setProdId("");
    setUpdateCollapse(false);
  };

  return (
    <>
      <div className="grid-container" key={product.sodasID}>
        <div className="img-grid">
          <img
            variant="top"
            style={{
              width: "75px",
              height: "225px",
              objectFit: "scale-down",
              margin: "auto",
            }}
            src={`/images/products/${product.sodasID}.png`}
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
        <div className="grid2">{sweFormat(price)}</div>

        <div className="grid1">
          <label>Kategori: </label>
        </div>
        <div className="grid2">{categoriesID}</div>

        <Button
          className="detail-btn grid1"
          variant="outline-warning"
          name={sodasID}
          onClick={updateProduct}
        >
          Uppdatera
          <AiOutlineEdit />
        </Button>
        <Button
          className="detail-btn grid3"
          variant="outline-danger"
          name={sodasID}
          onClick={deleteProduct}
        >
          <AiFillDelete />
          Ta bort
        </Button>
      </div>
      <>
        {updateCollapse ? (
          <BOProductEdit id={prodId} closeCollapse={closeCollapse} />
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default BOProductDetails;
