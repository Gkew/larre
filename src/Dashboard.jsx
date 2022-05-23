import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { sweFormat } from './components/ProductlistUtilities/sekFormatting';
import './css/Dashboard.css'
import { SodaCarousel } from './smallerComponents/SodaCarousel';


const Dashboard = () => {
  const [soda, setSoda] = useState([])
  let navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:4000/api";

  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      console.log("Sodas", res.data.slice(0, 3))
      setSoda(res.data.slice(0, 3))
    }
    getSodas()
  }, [])


  const navigateToProducts = () => {
    navigate(`/productlist`);
  }

  const navigateToAboutUs = () => {
    navigate(`/about-us`)
  }
  const navigateToNews = () => {
    navigate(`/news`)
  }
  return (
    <>
      <Container fluid className='py-5 dashboard-container'>
        {SodaCarousel}
        <Row className='text-center mt-5'>
          {/* <Image src='https://picsum.photos/id/288/1200/500' fluid rounded className='' /> */}
          <Col><h1>LARRE</h1>
            <p>Centrerad i Stockholm <br /> Bättre dricka hittar man inte!</p>
            <Button variant='outline-primary' onClick={navigateToAboutUs}>Om Oss</Button>
          </Col>
          <Col><h1>PRODUKTER</h1>
            <div>Hos oss hittar ni flera produkter som {soda.map(x => <div sm={1} key={x.id}>{x.name} - <span style={{ fontWeight: 'bolder' }}>{sweFormat(x.price)}</span></div >)}</div>
            <Button variant='outline-primary' onClick={navigateToProducts}>Våra Produkter</Button></Col>
          <Col>
            <h1>NYHETER</h1>
            <p>Här ser ni de absolut senaste produkterna vi har <br /> samt bra deals vi har</p>
            <Button variant='outline-primary' onClick={navigateToNews}>Läs de senaste Nyheterna</Button>
          </Col>
        </Row>
        <h1 className="text-center mt-5">F.A.Q</h1>
        <Row>
          <Col>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, porro.</p>
          </Col>
          <Col>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, porro.</p>
          </Col>
          <Col>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, porro.</p>
          </Col>
          <Col>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, porro.</p>
          </Col>
          <Col>
            <h2>Lorem ipsum dolor sit.</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, porro.</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard