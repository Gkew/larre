import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import "../css/Navbar.css"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { HiEye } from "react-icons/hi"
import logo from "../logo/SODA_POP.png"
const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="py-5" bg="black" variant="dark">
      <Navbar.Brand href="/" className='ps-5'>
        {/* <h1 className='link0'>
          <span style={{ color: '#F9CEEE' }}>S</span>
          <span style={{ color: '#CCF3EE' }}>O</span>
          <span style={{ color: '#F9F3EE' }}>D</span>
          <span style={{ color: '#97C4B8' }}>A</span>
          <span style={{ color: '#F9CEEE' }}>P</span>
          <span style={{ color: '#CCF3EE' }}>O</span>
          <span style={{ color: '#F9F3EE' }}>P</span>
          <span style={{ color: '#97C4B8' }}>!</span>
        </h1> */} <img src={logo} height={120} width={300} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ms-auto pe-5'>
          <Nav.Link className="link1" href="/productlist" style={{ color: '#F9CEEE' }}>PRODUKTER</Nav.Link>
          <Nav.Link className="link2" href="#" style={{ color: '#CCF3EE' }}>NYHETER</Nav.Link>
          <Nav.Link className="link3" href="/" style={{ color: '#F9F3EE' }}>OM OSS</Nav.Link>
          <Nav.Link className="link4" href="#" style={{ color: '#97C4B8' }}>KONTAKTA OSS</Nav.Link>
          <Nav.Link className="link5" href="/cart" style={{ color: '#F9CEEE' }}> <AiOutlineShoppingCart /> </Nav.Link>
          <Nav.Link className="link4" href="/checkout" style={{ color: '#97C4B8' }}><HiEye /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent