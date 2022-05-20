import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import '../../css/Dashboard.css'
const Dashboard = () => {
  const [soda, setSoda] = useState([])

  axios.defaults.baseURL = "http://localhost:4000/api";

  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      console.log("Sodas", res.data.slice(0, 3))
      setSoda(res.data.slice(0, 3))
    }
    getSodas()
  }, [])

  return (
    <>
      <Container fluid className='py-5'>
        <Row>
          <Col sm={7} >
            <Image src='https://picsum.photos/id/288/1200/500' fluid rounded className='' /></Col>
          <Col sm={5} ><h1>LARRE</h1>
            <p>Centrerad i Stockholm</p>
            <Button variant='outline-primary'>Läs Mer</Button>
          </Col>
        </Row>
        <Row>
          <Row className='py-5'>
            <Col><h1>PRODUKTER</h1>
              <div>Hos oss hittar ni flera produkter som {soda.map(x => <div sm={1} key={x.id}>{x.name}</div >)}</div><Button variant='outline-primary'>Produkter</Button></Col>
            <Col><Image src='https://picsum.photos/id/6/1000/400' fluid rounded /></Col>
          </Row>
        </Row>
        <Row className='mt-5'>
          <Col>
            <h1>NYHETER</h1>
          </Col>
          <Row>
            <Col>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quas, accusantium dolore commodi nesciunt quia blanditiis minus totam voluptates,
                quis consectetur ut quos doloribus at deleniti reiciendis nisi neque beatae ullam. Commodi necessitatibus aperiam, eum magnam eaque sint molestiae sed
                cupiditate beatae illo distinctio dolor, assumenda iure repellat temporibus reiciendis!</p>
              <Button variant='outline-primary'>Läs Mer</Button>
            </Col>
          </Row>
        </Row>

        <Row className="text-center">
        </Row>
      </Container>
    </>
  )
}

export default Dashboard