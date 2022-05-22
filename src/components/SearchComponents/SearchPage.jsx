import React, { useEffect, useState } from 'react'
import Searchbar from './SearchBar';
import SodasList from './SodasList';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [sodaListDefualt, setSodaListDefualt] = useState()
  const [sodaList, setSodaList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:4000/api/sodas')
      .then(response => response.json())
      .then(data => {
        setSodaList(data)
        setSodaListDefualt(data)
      })
  }

  const updateInput = async (input) => {
    const filtered = sodaListDefualt.filter(soda => {
      return soda.name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input)
    setSodaList(filtered)
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <>
      <h1>Soda List</h1>
      <Searchbar
        input={input}
        onChange={updateInput}
      />
      <SodasList sodaList={sodaList} />
    </>
  )
}

export default SearchPage