import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ImageGallery from './components/ImageGallery';

const App = () => {
  const [svgColor, setSvgColor] = useState('#6c63ff'); // Default SVG color
  const [bgColor, setBgColor] = useState('#ffffff'); // Default background color

  return (
    <div>
      <Navbar svgColor={svgColor} setSvgColor={setSvgColor} bgColor={bgColor} setBgColor={setBgColor} />
      <ImageGallery svgColor={svgColor} bgColor={bgColor} /> {/* Pass bgColor */}
    </div>
  );
};

export default App;
