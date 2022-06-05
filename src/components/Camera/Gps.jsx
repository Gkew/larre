import React, { useState } from "react";

const Gps = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [gps, setGps] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="Gps" style={{ margin: "0 auto", width: "30%" }}>
      <button
        className="btn btn-primary container"
        style={{ width: "fit-content" }}
        onClick={getLocation}
        onChange={(e) => setGps(e.target.value)}
      >
        Hämta plats
      </button>

      <p>{status}</p>
      {lat && <p>Latitud: {lat}</p>}
      {lng && <p>Longitud: {lng}</p>}
    </div>
  );
};

export default Gps;
