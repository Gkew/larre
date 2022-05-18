import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.production.min";

function BOProductEdit({ id }) {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [updatedProduct, setUpdatedProduct] = useState({
    brand: "",
    name: "",
    price: "",
    description: "",
    category: [],
  });
  useEffect(async () => {
    console.log(updatedProduct);
  }, [updatedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`/sodas/${id}`, updatedProduct)
      .then((res) => {
        setUpdatedProduct({
          brand: "",
          name: "",
          price: "",
          description: "",
          category: [],
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    setUpdatedProduct((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  return (
    <main className="backoffice-container">
      <div className="bo-header">
        <h2>
          På den här sidan kommer vi kunna uppdatera våra varors information
        </h2>
        <Link to={`/products`}>Tillbaka till alla produkter</Link>
      </div>

      <form onSubmit={handleSubmit(e)}></form>
    </main>
  );
}

export default BOProductEdit;
