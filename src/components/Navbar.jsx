import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import "../css/Navbar.css"
import { AiOutlineShoppingCart } from 'react-icons/ai'
const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Navbar.Brand href="#" className='ps-5'><h2>NAMN</h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='ms-auto pe-5'>
          <Nav.Link href="#">PRODUKTER</Nav.Link>
          <Nav.Link href="#">NYHETER</Nav.Link>
          <Nav.Link href="#">OM OSS</Nav.Link>
          <Nav.Link href="#">KONTAKTA OSS</Nav.Link>
          <Nav.Link href="#"><AiOutlineShoppingCart /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent