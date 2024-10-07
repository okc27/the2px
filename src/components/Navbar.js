import React from 'react';
import './Navbar.css'; // Make sure to import your CSS file for custom styles

const Navbar = ({ svgColor, setSvgColor, bgColor, setBgColor }) => {
  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#add8e6' }}>
      <div className="container-fluid">
        <div className="navbar-brand " onClick={() => console.log("Brand clicked!")}>
          the2px.com
        </div>
        <div className="color-picker d-flex justify-content-center"> {/* Center color pickers */}
          <label htmlFor="svg-color-picker" className="me-2">SVG Color:</label>
          <input
            type="color"
            id="svg-color-picker"
            value={svgColor}
            onChange={(e) => setSvgColor(e.target.value)}
          />
          <label htmlFor="background-color-picker" className="mx-2">Background Color:</label>
          <input
            type="color"
            id="background-color-picker"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
