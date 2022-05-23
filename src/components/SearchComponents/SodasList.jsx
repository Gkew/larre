import React from "react";

const SodasList = ({ sodaList = [] }) => {
  return (
    <>
      {sodaList.map((data, index) => {
        if (data) {
          return (
            <div key={data.name}>
              <h1>{data.brand}</h1>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default SodasList;
