import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import BOProductDetails from "./BOProductDetails";

export function BOProductList() {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);

  //Get all data in the table namned sodas
  useEffect(() => {
    axios
      .get("/sodas")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*TILLFÄLLIG SORTERING TILLS VI LÖSER JONTES*/
  const sortAZ = () => {
    const sortedNames = products.sort((a, b) => (a.name > b.name ? 1 : -1));
    setProducts([...sortedNames]);
  };
  const sortPrice = () => {
    const sortedByPrice = products.sort((a, b) => (a.price > b.price ? 1 : -1));
    setProducts([...sortedByPrice]);
  };

  /* MÅSTE GÖRA NÅGOT SÅNT HÄR??
  const [sortType, setSortType] = useState("");
  useEffect(() => {
    const sortArray = (type) => {
      let types = {
        price: "price",
        name: "name",
        categoriesID: "categoriesID"
      };
      const sortProperty = types[type];
      const sorted = [...products].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setProducts(sorted);
    };
    sortArray(sortType);
  }, [sortType]);
*/
  //function to delete a product.
  //triggers a confirm-popup
  const deleteProduct = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Är du säker på att du vill ta bort produkten?"
    );
    if (!confirm) return;
    await axios.delete(`/sodas/${e.target.name}`);
    setProducts((data) => {
      return data.filter((product) => product.sodasID !== e.target.name);
    });
  };

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>Tillbaka till BO</Link>
        </button>
        <h2>Alla varor</h2>
      </div>
      <div className="bo-search-div">
        <input
          className="search-box"
          type="text"
          placeholder="det här ska bli en sökruta"
        />
        <button onClick={sortAZ}>sortera på namn</button>
        <button onClick={sortPrice}>sortera på pris</button>
      </div>
      {products.map((product) => (
        <div
          className="BO-one-product"
          key={product.sodasID}
          aria-label="product-div"
        >
          <BOProductDetails product={product} deleteProduct={deleteProduct} />
        </div>
      ))}
    </Container>
  );
}
export default BOProductList;
