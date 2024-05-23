import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './MainPage.css';
import img1 from './img1.jpeg';
import img2 from './img2.jpeg';
import img3 from './img3.jpeg';
function MainPage () {
  return (
    <div className="main-page">
      <div className="main-page-left">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="main-page-right">
        <Carousel autoPlay infiniteLoop>
          <div>
            <img src={img1}  alt="Image 1" />
          </div>
          <div>
            <img src={img2} alt="Image 2" />
          </div>
          <div>
            <img src={img3} alt="Image 3" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default MainPage;
