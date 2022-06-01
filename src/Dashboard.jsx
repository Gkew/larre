
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { sweFormat } from './components/ProductlistUtilities/sekFormatting';
import SodaService from './components/services/SodaService';
import './css/Dashboard.css'
import { SodaCarousel } from './smallerComponents/SodaCarousel';


const Dashboard = () => {
  const [soda, setSoda] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    const getSodas = async () => {
      let res = await SodaService.getAll()
      console.log("Sodas", res.data.slice(0, 3))
      setSoda(res.data.slice(0, 3))
    }
    getSodas()
  }, [])


  const navigateToProducts = () => {
    navigate(`/productlist`);
  }

  return (
    <Container fluid className='py-5 dashboard-container'>
      {SodaCarousel}
      <Row className='text-center mt-5' fluid="sm">
        <Col xs={12} lg={6}>
          <h1 className='mt-5'><b>SODA POP</b></h1>
          <p>Centrerad i Stockholm <br /> Bättre dricka hittar man inte!</p>
          <button onClick={navigateToProducts} style={{ backgroundColor: "#FEC98F", border: "none", color: "black", }} variant="primary" type="submit" className=" btn mx-auto ms-3">Våra Produkter</button>
        </Col>
        <Col xs={12} lg={6}>
          <h1 className='mt-5'><b>PRODUKTER</b></h1>
          <div>Hos oss hittar ni flera produkter som {soda.map(x => <div sm={1} key={x.sodasID}>{x.name} - <span style={{ fontWeight: 'bolder' }}>{sweFormat(x.price)}</span></div >)}</div>
          <button onClick={navigateToProducts} style={{ backgroundColor: "#FEC98F", border: "none", color: "black", }} variant="primary" type="submit" className="mt-2 btn mx-auto ms-3">Våra Produkter</button>
        </Col>
      </Row>
      <h1 className="text-center mt-5"><b>F.A.Q</b></h1>
      <Row className='text-center'>
        <Col xs={12} lg={4}>
          <h2>Kan man köpa era Produkter?</h2>
          <p>Ja!</p>
        </Col>
        <Col xs={12} lg={4}>
          <h2>Har ni åldersgräns på energidryck?</h2>
          <p>Ja du måste ha gått i pension</p>
        </Col>
        <Col xs={12} lg={4}>
          <h2>Är det glutenfritt?</h2>
          <p>Nej och det är heller inte vegetariskt</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard