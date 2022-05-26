import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BOProductEdit from "./BOProductEdit";
import { sweFormat } from "../ProductlistUtilities/sekFormatting";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const BOProductDetails = ({ product, deleteProduct }) => {
  const { id, name, brand, description, price, categoriesID } = product;
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
          className="detail-btn grid-btn"
          variant="outline-warning"
          onClick={updateProduct}
        >
          Uppdatera
          <AiOutlineEdit />
        </Button>
        <Button
          className="detail-btn grid1"
          variant="outline-danger"
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
