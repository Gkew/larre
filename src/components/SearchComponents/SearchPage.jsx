import axios from "axios";
import React, { useEffect, useState } from "react";
import SodasList from "./SodasList";

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

  return (
    <>
      <h1>Soda List</h1>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {sodaList
        .filter((x) => {
          if (input === "") {
            return sodaList;
          } else if (x.name.toLowerCase().includes(input.toLowerCase())) {
            return sodaList;
          }
        })
        .map((x) => {
          return <SodasList key={x.id} {...x} />;
        })}
    </>
  );
};

export default SearchPage;
