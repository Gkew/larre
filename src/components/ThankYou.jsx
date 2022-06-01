import React, { Component } from 'react';
import thanksImg from "../images/TACK.png";
import { Col, Container, Row } from 'react-bootstrap'
import "../css/Thanks.css"

export class ThankYou extends Component {
  render() {
    return (
      <Container className='thanks-container'>
        <Col>
          <Row className='d-flex align-items-center justify-content-center'>
            <img className='center mt-5' src={thanksImg} style={{ width: "350px" }}></img>
          </Row>
          <Row className='d-flex align-items-center justify-content-center'>
            <span className='d-flex align-items-center justify-content-center'>
              Din order behandlas och skickas inom kort!
            </span>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default ThankYou