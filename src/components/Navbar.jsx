import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/Navbar.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import logo from "../logo/SODA_POP.png";
const NavbarComponent = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 767;
  const [scroll, setScroll] = useState(1);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 20;
      setScroll(scrollCheck);
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [scroll, setScroll]);

  return (
    <div className={`${width > breakpoint ? "computerNav" : "phoneNav"}`}>
      <Navbar
        collapseOnSelect
        expand="md"
        fixed="top"
        variant="light"
        style={{ backgroundColor: "#CCF3EE" }}
        className={`${width > breakpoint ? `${scroll ? "Nav navbar-scrolled" : "Nav"}` : null}`}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Nav.Item >
          <Navbar.Brand href="/" className="ps-2">
            <img src={logo} height={`${width > breakpoint ? 120 : 60}`} width={`${width > breakpoint ? 300 : 150}`} alt="image" />
          </Navbar.Brand>
        </Nav.Item>

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav.Link
            className="link4"
            href="/backoffice"
            style={{ color: "#97C4B8" }}
          >
            <HiEye style={{ fontSize: '30px' }} />
          </Nav.Link>

          <Nav.Link
            className="link1"
            href="/productlist"
            style={{ color: "#F9CEEE" }}
          >
            {width > breakpoint ? <h3 style={{ marginTop: '14px' }}><b>PRODUKTER</b></h3> : <h1><b>PRODUKTER</b></h1>}
          </Nav.Link>
          {/* <Nav.Link
            className="link4"
            href="/camera"
            style={{ color: "#97C4B8" }}
          >
            CAMERA
          </Nav.Link> */}
          <Nav.Link
            className="link5"
            href="/cart"
            style={{ color: "#F9CEEE" }}
          >
            {" "}
            <AiOutlineShoppingCart style={{ fontSize: '30px' }} />{" "}
          </Nav.Link>

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
