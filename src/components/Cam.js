import React, { useState } from "react";
import axios from "axios";


function Cam() {
  const [image, setImage] = useState("");


  const handleChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleApi = () => {

    const formData = new FormData();
    formData.append("image", image);
    axios.post("http://localhost:4000/api/pictures", formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleApi}>Submit</button>

    </div>
  );
}

export default Cam;
