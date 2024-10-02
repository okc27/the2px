import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageGallery from './components/ImageGallery'; // Import the ImageGallery component
import './App.css';

const App = () => {
  const [svgColor, setSvgColor] = useState('#6c63ff'); // Default SVG color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color for JPEG

  return (
    <div>
      <Navbar
        svgColor={svgColor}
        setSvgColor={setSvgColor}
        bgColor={bgColor}
        setBgColor={setBgColor}
      />
      <div className="container mt-4">
        <ImageGallery svgColor={svgColor} bgColor={bgColor} /> {/* Use ImageGallery to fetch and display images */}
      </div>
    </div>
  );
};

export default App;
