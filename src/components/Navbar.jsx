import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import "../css/Navbar.css"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { HiEye } from "react-icons/hi"
import logo from "../logo/SODA_POP.png"
const NavbarComponent = () => {
  return (
    <div className='Nav'>
      <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
        <Navbar.Brand href="/" className='ps-5'>
          <img src={logo} height={120} width={300} alt="image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='ms-auto pe-5'>
            <Nav.Link className="link1" href="/productlist" style={{ color: '#F9CEEE' }}>PRODUKTER</Nav.Link>
            {/* <Nav.Link className="link2" href="/news" style={{ color: '#CCF3EE' }}>NYHETER</Nav.Link>
            <Nav.Link className="link3" href="/about-us" style={{ color: '#F9F3EE' }}>OM OSS</Nav.Link> */}
            <Nav.Link className="link4" href="/camera" style={{ color: '#97C4B8' }}>CAMERA</Nav.Link>
            <Nav.Link className="link5" href="/cart" style={{ color: '#F9CEEE' }}> <AiOutlineShoppingCart /> </Nav.Link>
            <Nav.Link className="link4" href="/backoffice" style={{ color: '#97C4B8' }}><HiEye /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent
