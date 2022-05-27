import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { sweFormat } from './components/ProductlistUtilities/sekFormatting'

const Nyheter = () => {
  axios.defaults.baseURL = "http://localhost:4000/api/"
  const [showDiscount, setShowDiscount] = useState([])

  let productID = '5'
  // kan lätt ändra id


  // const [month, day, year] = [date.toISOString().slice(0, 10), date.getHours(), date.getMinutes()];

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`/sodas/${productID}`)
      setShowDiscount(res.data)
    }
    getData()
  }, [])

  useEffect(() => {
    console.log(showDiscount)
  }, [showDiscount])

  return (
    <Container fluid>
      <Row className='text-center'>
        <h1>Här är de senaste nyheterna för idag</h1>
      </Row>
      <Row className="mt-5">
        <h2 className="text-center">Senaste Rabatten!</h2>
        <Col>
          <h2>{showDiscount.name}</h2>
          <h4>{showDiscount.brand}</h4>
          <h4 style={{ textDecoration: 'line-through', textDecorationThickness: '0.5px' }}>{sweFormat(showDiscount.price + 5)}</h4>
          <h5>Nytt Pris! - {sweFormat(showDiscount.price)}</h5>
        </Col>
        <Col sm={2}><img className='w-50' src={`/images/products/${showDiscount.sodasID}.png`} alt="" /></Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <h2 >Andra Nyheter</h2>
          <h4>Nominerad för pris inom mest pantade burkar! 2022</h4>
        </Col>
      </Row>
    </Container>
  )
}

export default Nyheter