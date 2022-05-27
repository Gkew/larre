import React, { useEffect, useRef } from "react";
import Gps from './Gps'
// import {Link} from 'react-router-dom'

function Camera() {
    let picture;
    let downloader = document.getElementById('downloader');
  let videoRef = useRef(null);

  let photoRef = useRef(null)

  const getVideo = () => {

    navigator.mediaDevices
      .getUserMedia({
        video: true
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
    const width = 400
    const height = width / (16 / 9)
    
    let video = videoRef.current

    let photo = photoRef.current

    photo.width = width

    photo.height = height

    let ctx = photo.getContext('2d')

    ctx.drawImage(video, 0, 0, width, height)

    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    //NEV TAB
    // var canvas = document.getElementById("canvas");
    // var dataURL = canvas.toDataURL("image/png");
    // var newTab = window.open('about:blank','image from canvas');
    // newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  async function download(){
    document.getElementById("downloader").download = "image.png";
    document.getElementById("downloader").href = document.getElementById("canvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    
    let formData = new FormData()

    formData.append('file', picture, Date.now() + '.jpg')
  
    let res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
  
    res = await res.json()
    console.log('result of upload', res);
  
    // display uploaded picture
    downloader.src = './www/uploads' + res.file.name

}

  const clearImage = () => {
    let photo = photoRef.current

    let ctx = photo.getContext('2d')

    ctx.clearRect(0,0,photo.width,photo.height)

  }



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
    <div className="container" style={{display: 'flex', flexDirection: 'column'}}>
          

      <video ref={videoRef} id="live"  className="container" style={{width: '400px' , marginBottom: '2%'}}></video>

      <button onClick={takePicture} id="captureBtn" value="yes" className="btn btn-danger container" style={{width: '300px', marginBottom: '2%'}}>Foto</button>

      { {takePicture} ?  <canvas id="canvas" ref={photoRef} style={{width: '400px', marginBottom: '2%'}}></canvas> : null }

     

      <button onClick={clearImage} className="btn btn-primary container" style={{width: '300px', marginBottom: '2%'}}>Radera</button>

        <div style={{display: 'flex', margin: '2% auto', flexDirection: 'column'}}>
        <label>Ladda upp</label>
      <input type="file" accept=".jpg,.jpeg,.png" />
      </div>

      <a href="/uploads" id="downloader" onClick={download} download="image.jpg">Download!</a>



      <Gps />
    </div>
  );
}

export default Camera;
