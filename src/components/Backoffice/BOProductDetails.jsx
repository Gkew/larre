import React from "react";

const BOProductDetails = ({ product, deleteProduct, updateProduct }) => {
  const { id, name, brand, description, price, category } = product;

  return (
    <>
      <div key={id}>
        <p>Namn:{name}</p>
        <p>
          Märke: {brand} <br />
          Beskrivning: {description}
        </p>
        <p>
          Pris: {price} <br />
          Kategori:{category}
        </p>
        <button name={id} onClick={updateProduct}>
          Uppdatera
        </button>
        <button name={id} onClick={deleteProduct}>
          Ta bort
        </button>
      </div>
    </>
  );
};

export default BOProductDetails;
