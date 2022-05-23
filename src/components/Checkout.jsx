import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { empty, remove, save } from '../utils/shoppingCartLogic';

export default function Checkout() {




  return (<Container className='checkout'>
    <Row>
      <Col>
        <h1>Varukorg</h1>
      </Col>
    </Row>
    <Row>
      <Card>
        <Col>

        </Col>
      </Card>
    </Row>

  </Container>
  )
}
