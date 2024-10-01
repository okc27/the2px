import React from 'react';
import './Navbar.css';

const Navbar = ({ svgColor, setSvgColor, bgColor, setBgColor }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button 
          className="navbar-brand" 
          type="button" 
          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.75rem', fontWeight: 'bold' }} // Enhanced styling for the website name
        >
          the2pix
        </button>
        <div className="ms-auto">
          <div className="color-picker d-flex align-items-center">
            <label htmlFor="svgColorPicker" className="me-2">SVG Color:</label>
            <input
              type="color"
              id="svgColorPicker"
              value={svgColor}
              onChange={(e) => setSvgColor(e.target.value)}
              className="form-control form-control-color"
              title="Choose your color"
            />
            <label htmlFor="bgColorPicker" className="ms-3 me-2">Background Color:</label>
            <input
              type="color"
              id="bgColorPicker"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="form-control form-control-color"
              title="Choose background color"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
