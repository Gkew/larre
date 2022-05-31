import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/Navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import logo from "../logo/SODA_POP.png";
const NavbarComponent = () => {
  return (
    <div className="Nav">
      <Navbar
        collapseOnSelect
        expand="md"
        fixed="top"
        variant="light"
        style={{ backgroundColor: "#CCF3EE" }}

      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Item >
            <Navbar.Brand href="/" className="ps-2">
              <img src={logo} height={120} width={300} alt="image" />
            </Navbar.Brand>
          </Nav.Item>


          <Nav.Link
            className="link4"
            href="/backoffice"
            style={{ color: "#97C4B8" }}
          >
            <HiEye />
          </Nav.Link>

          <Nav.Link
            className="link1"
            href="/productlist"
            style={{ color: "#F9CEEE" }}
          >
            PRODUKTER
          </Nav.Link>
          <Nav.Link
            className="link4"
            href="/camera"
            style={{ color: "#97C4B8" }}
          >
            CAMERA
          </Nav.Link>
          <Nav.Link
            className="link5"
            href="/cart"
            style={{ color: "#F9CEEE" }}
          >
            {" "}
            <AiOutlineShoppingCart />{" "}
          </Nav.Link>

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
