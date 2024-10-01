import React from 'react';
import './Header.css';

const Header = ({ onColorChange }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Image Downloader</h1>
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      <div className="color-picker">
        <input
          type="color"
          defaultValue="#6c63ff"
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
