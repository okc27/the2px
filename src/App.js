import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageCard from './components/ImageCard';
import './App.css';

import pic1 from './data/img/pic1.svg';
import pic2 from './data/img/pic2.svg';
import pic3 from './data/img/pic3.svg';

const App = () => {
  const [svgColor, setSvgColor] = useState('#6c63ff'); // Default SVG color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color for JPEG

  const images = [
    { title: 'Image 1', description: 'This is the first image', svg: pic1 },
    { title: 'Image 2', description: 'This is the second image', svg: pic2 },
    { title: 'Image 3', description: 'This is the third image', svg: pic3 },
  ];

  return (
    <div>
      <Navbar
        svgColor={svgColor}
        setSvgColor={setSvgColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
      />
      <div className="container mt-4">
        <div className="row">
          {images.map((img, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <ImageCard
                title={img.title}
                description={img.description}
                svg={img.svg}
                color={svgColor}
                bgColor={bgColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
