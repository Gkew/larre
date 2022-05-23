import axios from "axios";
import React, { useEffect, useState } from "react";
import Searchbar from "./SearchBar";
import SodasList from "./SodasList";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [sodaListDefualt, setSodaListDefualt] = useState();
  const [sodaList, setSodaList] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/sodas")
      .then((response) => {
        console.log(response.data);
        setSodaList(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const updateInput = async (input) => {
    const filtered = sodaListDefualt.filter((sodas) => {
      return sodas.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSodaList(filtered);
  };

  return (
    <>
      <h1>Soda List</h1>
      <Searchbar input={input} onChange={updateInput} />
      <SodasList sodaList={sodaList} />
    </>
  );
};

export default SearchPage;
