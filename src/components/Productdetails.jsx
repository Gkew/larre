import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Col, Card } from "react-bootstrap";
import { sweFormat } from "./ProductlistUtilities/sekFormatting";
import { add } from "../"
import { height } from "@mui/system";


export default function Productdetails() {
  const cartFromLS = JSON.parse(localStorage.getItem('cart') || "[]");
  const [details, setDetails] = useState([]);
  const { sodasID } = useParams();
  const [customQuantity, setCustomQuantity] = useState(1);

  const [cart, setCart] = useState(cartFromLS);

  Axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    Axios.get(`/sodas/${sodasID}`).then((response) => {
      setDetails(response.data);
    })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  ///Custom kvantitet fungerar inte
  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => item.sodasID === details.sodasID
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  return (
    <div className="productsdetails" style={{ height: "90vh", textAlign: "center", paddingTop: "1%", margin: "0 auto" }}  >
      <Card >
        <Card.Body style={{ backgroundColor: "white", padding: "0px", marginBottom: "0%" }} >
          <Card.Title style={{ backgroundColor: "#F9CEEE" }}>
            <h1> {details.name} </h1>
            <h3> {details.brand}</h3>
          </Card.Title>
          <Card.Img src={`/images/products/${sodasID}.png`} style={{ objectFit: "scale-down", maxWidth: "150px", maxHeight: "450px", margin: "auto" }} />
          <Card.Text style={{ backgroundColor: "white", marginTop: "2%", marginBottom: "0%", minHeight: "40%" }}>
            <h5>{details.description}</h5>

          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#97C4B8", margin: "0" }}>
          <h2> {sweFormat(details.price)}</h2>
          <br></br>
          <p style={{ fontWeight: "bold" }}>Antal:</p>
          {/* <input value={customQuantity} onChange={e => setCustomQuantity(e.target.value)}></input> */}
          <button
            style={{
              backgroundColor: "#FEC98F",
              border: "none",
              color: "black",
            }}
            type="button"
            onClick={() => addToCart(details)}
            className="mt-2 btn btn-primary float-end ms-3"
          >
            Köp
          </button>
        </Card.Footer>

      </Card>

    </div>
  );
}

