import React, { useEffect, useRef, useState } from "react";
import Gps from "./Gps";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

function Camera() {
  const [image, setImage] = useState(null);

  let picture;
  let downloader = document.getElementById("downloader");
  let videoRef = useRef(null);

  let photoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePicture = () => {
    const width = 100;
    const height = 50;

    let video = videoRef.current;

    let photo = photoRef.current;

    photo.width = width;

    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);

    const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL("image/png");
    try {
      localStorage.setItem("photo", dataURL);
      console.log(dataURL);
    } catch (e) {
      console.log("Storage failed " + e);
    }

    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob);
      console.log(blob);

      var reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = function () {
        var base64String = reader.result;
        console.log("Base64 String - ", base64String);
      };
    });
  };

  async function download() {
    document.getElementById("downloader").download = "image.png";
    document.getElementById("downloader").href = document
      .getElementById("canvas")
      .toDataURL("image/png")
      .replace(/^data:image\/[^;]/, "data:application/octet-stream");

    let formData = new FormData();
    axios.defaults.baseURL = "http://localhost:4000/api";
    formData.append("file", picture, Date.now() + ".jpg");

    let res = await fetch("/pictures", {
      method: "POST",
      body: formData,
    });

    res = await res.json();
    console.log("result of upload", res);

    // display uploaded picture
    downloader.src = "../public/images/products" + res.file.name;
  }

  const clearImage = () => {
    let photo = photoRef.current;

    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // function Change(captureBtn) {
  //     const live = document.getElementById("live");
  //     if (captureBtn.value == "Yes") {
  //         live.style.display = "block";
  //         captureBtn.value = "No";
  //     } else {
  //         live.style.display = "none";
  //         captureBtn.value = "Yes";
  //     }
  // }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card className="container">
        <video
          ref={videoRef}
          id="live"
          className="container"
          width="300px"
          height="300px"
        ></video>
        <Card.Footer>
          <button
            onClick={takePicture}
            id="captureBtn"
            className="btn btn-success container"
            style={{ width: "300px", marginBottom: "2%" }}
          >
            Ta foto
          </button>
        </Card.Footer>
      </Card>
      <Card className="container">
        {{ takePicture } ? (
          <canvas
            id="canvas"
            ref={photoRef}
            style={{
              height: "400px",
              margin: "0 auto",
            }}
          ></canvas>
        ) : null}
        <Card.Footer>
          <Button
            variant="danger"
            onClick={clearImage}
            style={{ width: "fit-content", marginBottom: "2%" }}
          >
            Radera
          </Button>
          <Button variant="outline-primary">
            <a
              href="/uploads"
              id="downloader"
              onClick={download}
              download="image.jpg"
              style={{ width: "fit-content" }}
            >
              Spara bild
            </a>
          </Button>
        </Card.Footer>
      </Card>
      <Card>
        {image && (
          <Card.Body>
            <img
              alt="not found"
              width={"200px"}
              src={URL.createObjectURL(image)}
            />
            <br />
            <button
              style={{ width: "fit-content" }}
              onClick={() => setImage(null)}
            >
              Remove
            </button>
          </Card.Body>
        )}

        <Card.Footer>
          <label>Ladda upp</label>
          <input
            style={{ padding: "5%" }}
            type="file"
            name="myImage"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />

          <Gps />
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Camera;