import React, { useEffect } from "react";

const BOProductList = () => {
  //Get all data in the table namned sodas
  useEffect(() => {
    const baseUrl = "https://localhost:4000/api/sodas";

    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="backoffice-container">
      <h2> Våra befintliga varor ska listas här på något fräsigt sätt</h2>
    </main>
  );
};

export default BOProductList;
