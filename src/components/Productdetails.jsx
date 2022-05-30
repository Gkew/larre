import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Col, Card } from "react-bootstrap";
import { sweFormat } from "./ProductlistUtilities/sekFormatting";


export default function Productdetails() {
  const cartFromLS = JSON.parse(localStorage.getItem('cart') || "[]");
  const [details, setDetails] = useState([]);
  const [sodasList, setSodasList] = useState(cartFromLS);
  const { sodasID } = useParams();
  const [buy, setBuy] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = ([]);

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
    localStorage.setItem("cart", JSON.stringify(sodasList));
  }, [buy]);

  // const addToCart = (product) => {
  //   let newCart = [...cart];
  //   let itemInCart = newCart.find(
  //     (item) => sodasID === details.sodasID
  //   );
  //   if (itemInCart) {
  //     itemInCart.quantity++;
  //   } else {
  //     itemInCart = {
  //       ...product,
  //       quantity: 1,
  //     };
  //     newCart.push(itemInCart);
  //   }
  //   setCart(newCart);
  // };

  const addToCart = () => {
    sodasList.push((details))
    setBuy(!buy)
  }

  return (
    <div className="productsdetails" style={{ textAlign: "center", padding: "3%" }}  >
      <Col sm={8} style={{ margin: "auto" }}    >

        <Card style={{ border: "none", backgroundColor: "#F9F3EE" }}>
          <Card.Body style={{ backgroundColor: "#F9F3EE" }}>
            <Card.Title>
              {details.name}

            </Card.Title>
            <Card.Text>
              {details.brand}

            </Card.Text>


            <img variant="top" style={{ width: '200px', height: '500px', objectFit: 'scale-down', margin: 'auto' }} src={`/images/products/${sodasID}.png`} />
            <Card.Text style={{ padding: "5%" }}>
              {details.description}

            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {sweFormat(details.price)}
            <div>Antal:
              <input value={quantity} onChange={e => setQuantity(e.target.value)}></input>
            </div>
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
      </Col>
    </div>
  );
}

