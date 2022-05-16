import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import '../css/Dashboard.css'

const Dashboard = () => {
  return (
    <>
      <Container fluid className='py-4 mx-5'>
        <Row>
          <Col sm={7} >
            <Image src='https://picsum.photos/id/288/1200/500' fluid rounded className='' /></Col>
          <Col sm={5} ><h1>LARRES</h1>
            <p>Centrerad i Stockholm</p>
            <Button variant='outline-primary'>Läs Mer</Button>
          </Col>
        </Row>
        <Row>
          <Card className=' my-5 py-4 border-0'>
            <Card.Body>
              <h1>NYHETER</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quas, accusantium dolore commodi nesciunt quia blanditiis minus totam voluptates,
                quis consectetur ut quos doloribus at deleniti reiciendis nisi neque beatae ullam. Commodi necessitatibus aperiam, eum magnam eaque sint molestiae sed
                cupiditate beatae illo distinctio dolor, assumenda iure repellat temporibus reiciendis!</p>
              <Button variant='outline-primary'>Läs Mer</Button>
            </Card.Body>
          </Card>
        </Row>
        <Row className="text-center">
        </Row>
      </Container>
    </>
  )
}

export default Dashboard