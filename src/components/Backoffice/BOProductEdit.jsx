import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineSave, AiOutlineClose } from "react-icons/ai";

function BOProductEdit({ id, closeCollapse }) {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [categories, setCategories] = useState([]);
  const [productInfo, setProductInfo] = useState({
    brand: "",
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  // get all categories from db.
  useEffect(() => {
    const res = axios.get("/categories");
    setCategories(res.data);
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault(e);

    axios
      .patch(`/sodas/${id}`, productInfo)
      .then((res) => {
        setProductInfo({
          brand: "",
          name: "",
          price: 0,
          description: "",
          category: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChange = (e) => {
    setProductInfo((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <main className="update-container">
      <div className="bo-header">
        <h2>Uppdatera produkten</h2>
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
          closeCollapse();
        }}
      >
        <div className="update-product">
          <input
            type="text"
            name="name"
            value={productInfo.name}
            onChange={onInputChange}
            placeholder="Namn"
          ></input>
          <input
            type="text"
            name="brand"
            value={productInfo.brand}
            onChange={onInputChange}
            placeholder="Märke"
          ></input>
          <input
            type="text"
            name="description"
            value={productInfo.description}
            onChange={onInputChange}
            placeholder="Beskrivning"
          ></input>
          <input
            type="number"
            name="price"
            value={productInfo.price}
            onChange={onInputChange}
            placeholder="Pris i SEK"
          ></input>
          <select
            type=""
            name="category"
            value={productInfo.category}
            onChange={onInputChange}
          >
            <option hidden>Kategori:</option>
            <option disabled>Kategori:</option>
            <option>Kategori 1</option>
            <option>Kategori 2</option>
            <option>Kategori 3</option>
            {/*{categories.map((x) => {
              return <option key={categories.id}> {x.name}</option>;
            })}*/}
          </select>
          <div className="btn-div">
            <Button
              className="pdate-btn"
              variant="warning"
              type="submit"
              aria-label="save"
            >
              <AiOutlineSave /> Spara ändringar
            </Button>
            <Button
              className="close-btn"
              variant="outline-danger"
              onClick={closeCollapse}
              aria-label="close"
            >
              <AiOutlineClose />
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default BOProductEdit;
