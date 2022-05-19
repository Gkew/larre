import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col, Form } from 'react-bootstrap';



// Hur ni använder detta som template för att få in varje filter funktion

// ### STEP 1 IMPORTA SKITEN
// import { SortByDescending } from './FilterComponents'

// ### STEP 2 ANVÄND SKITEN
// <SortByDescending />

const SortByName = () => {
  const [compareNames, setCompareNames] = useState([])

  //  Listan ifall ni vill testa skriva ut sorterade etc
  // när ni ska anpassa den till eran egna sida, ta bort 
  // { comparedNames } och liknande för alla komponenter för att inte randomly
  // bara skriva ut listan
  const comparedNames = [...compareNames].map(x => <div key={x.id}>{x.name}</div>)
  axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      setCompareNames(res.data)
    }
    getSodas()
  }, [])
  const SortByName = () => {
    let sortedList = [...compareNames].sort((a, b) => a.name.localeCompare(b.name))
    setCompareNames(sortedList)
  }
  return (
    <div>
      <Button onClick={SortByName}>Sort By A-Z</Button>
      {comparedNames}
    </div>
  )
}
const SortByAscending = () => {
  const [ascendingPrice, setAscendingPrice] = useState([])
  const ascendingPrices = [...ascendingPrice].map(x => <div key={x.id}>{x.price}</div>)
  axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      setAscendingPrice(res.data)
    }
    getSodas()
  }, [])
  const sortAscending = () => {
    let sortedPrices = [...ascendingPrice].sort((x, y) => x.price >= y.price ? 1 : -1)
    setAscendingPrice(sortedPrices)
  }
  return (
    <div>
      <Button onClick={sortAscending}>Sort By Ascending</Button>
      {ascendingPrices}
    </div>
  )
}
const SortByDescending = () => {
  const [descendingPrice, setDescendingPrice] = useState([])
  const descendingPrices = [...descendingPrice].map(x => <div key={x.id}>{x.price}</div>)
  axios.defaults.baseURL = "http://localhost:4000/api";
  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      setDescendingPrice(res.data)
    }
    getSodas()
  }, [])
  const sortDescending = () => {
    let sortDecendingPrices = [...descendingPrice].sort((x, y) => x.price >= y.price ? -1 : 1)
    setDescendingPrice(sortDecendingPrices)
  }
  return (
    <div>
      <Button onClick={sortDescending}>Sort By Ascending</Button>
      {descendingPrices}
    </div>
  )
}
const SortByCategories = () => {
  const [compareCategories, setCompareCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const gottenCategories = [...compareCategories].map(x => <div key={x.id}>{x.category}</div>)
  useEffect(() => {
    const getSodas = async () => {
      let res = await axios.get("/sodas")
      setCompareCategories(res.data)
    }
    getSodas()
  }, [])
  useEffect(() => {
    let filterCategories = [...compareCategories].filter(x => x.category === selectedCategory)
    setCompareCategories(filterCategories)
  }, [selectedCategory])
  return (
    <div>
      <Row>
        <Col>
          <Form.Select onChange={e => setSelectedCategory(e.target.value)}>
            <option value="all">all</option>
            <option value="regular">regular</option>
            <option value="sugar-free">sugar-free</option>
            <option value="energy">energy</option>
          </Form.Select>
          <div>
            {gottenCategories}
          </div>
        </Col>
      </Row>
    </div>
  )
}




export { SortByName, SortByAscending, SortByDescending, SortByCategories }