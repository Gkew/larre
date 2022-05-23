import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [sodaList, setSodaList] = useState([]);

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

  const searchSodas = (x) => {
    if (input === "") {
      return sodaList;
    } else if (x.name.toLowerCase().includes(input.toLowerCase())) {
      return sodaList;
    }
  };

  return (
    <>
      <input
        className="mt-3"
        type="search"
        value={input}
        placeholder="Sök"
        onChange={(e) => setInput(e.target.value)}
      />
      <FcSearch />
      {sodaList.filter((x) => {
        searchSodas(x);
      })}
    </>
  );
};

export default SearchPage;
