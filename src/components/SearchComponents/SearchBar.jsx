import React from "react";

const Searchbar = ({ keyword, setKeyword }) => {
  const barStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };
  return (
    <input
      style={barStyling}
      key="random1"
      value={keyword}
      placeholder={"Sök"}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default Searchbar;
