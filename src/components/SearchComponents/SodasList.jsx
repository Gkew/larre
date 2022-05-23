import React from "react";
import { Col, Row } from "react-bootstrap";

const SodasList = ({ brand, name, price }) => {
  return (
    <>
      <Row>
        {/* <Col>
          <h1>{brand}</h1>
        </Col> */}
        <Col sm={8}>
          <h1>{name}</h1>
        </Col>
      </Row>
    </>
  );
};

export default SodasList;
