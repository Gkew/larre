import React from 'react';
import { Carousel } from 'react-bootstrap';

export const SodaCarousel =
  <div className="carousel-container" >
    <h1 className='text-center'>KOLLA IN NÅGRA AV VÅRA KUNDERS FAVORITER</h1>
    <h3 className='text-center'>VÄLJ BLAND VÅRA UNIKA SMAKER</h3>
    <Carousel autoPlay={true}
      interval={3000}
      controls={false}
      indicators={false}
      pause={false}
    >
      <Carousel.Item >
        <img
          className="d-block m-auto"
          src={`/images/products/1.png`}
          alt="First slide" />
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block m-auto"
          src={`/images/products/2.png`}
          alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block m-auto"
          src={`/images/products/3.png`}
          alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block m-auto"
          src={`/images/products/4.png`}
          alt="Fourth slide" />
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block m-auto"
          src={`/images/products/5.png`}
          alt="Fifth slide" />
      </Carousel.Item>
    </Carousel>
  </div>;
