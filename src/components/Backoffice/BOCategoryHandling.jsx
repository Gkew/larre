import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const BOCategoryHandling = () => {
  axios.defaults.baseURL = "http://localhost:4000/api";

  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewCategory((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  //fetching all existing categories to map out
  // so that we can see them before we decide to create a new
  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function to create new categories
  function createCategory(e) {
    e.preventDefault();
    axios
      .post("/categories", newCategory)
      .then((res) => {
        setNewCategory({
          name: "",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container className="backoffice-container" fluid>
      <div className="bo-header">
        <button>
          <Link to={`/backoffice`}>{`<< Tillbaka till BO`}</Link>
        </button>

        <h2>Kategorier</h2>
      </div>

      <div className="category-list">
        <ul>
          {categories.map((cat) => {
            return (
              <li key={cat.id} className="each-cat">
                {" "}
                <label className="cat-label">{cat.name}:</label>{" "}
                {cat.description}
              </li>
            );
          })}
        </ul>{" "}
      </div>
      {!navigator.onLine ? (
        <> {/* Om Offline visas ingenting*/}/</>
      ) : (
        <>
          <h2>Skapa ny kategori</h2>
          <form className="create-category" onSubmit={createCategory}>
            <input
              className="categ-input"
              type="text"
              name="name"
              onChange={handleChange}
              value={newCategory.name}
              placeholder="Kategorinamn"
            ></input>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={newCategory.description}
              placeholder="Beskrivning"
            ></input>
            <Button
              type="submit"
              onClick={createCategory}
              variant="light"
              className="addcategory-btn"
            >
              Skapa kategori
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default BOCategoryHandling;
