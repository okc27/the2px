import React, { useEffect, useState } from 'react';
import './ImageCard.css';

const ImageCard = ({ title, description, svg, color }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    // Fetch SVG content and update it with the selected color
    fetch(svg)
      .then(response => response.text())
      .then(svgText => {
        // Change only the fill color that matches #6c63ff
        const coloredSvgText = svgText.replace(/fill="#6c63ff"/g, `fill="${color}"`);
        setSvgContent(coloredSvgText);
      });
  }, [svg, color]); // Re-fetch when svg or color changes

  // Function to convert SVG to PNG
  const convertSvgToPng = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert canvas to PNG and trigger download
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${title}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl); // Cleanup the blob URL
      });
    };

    img.src = url; // Load the SVG as an image
  };

  const convertSvgToJpeg = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Fill the canvas with a white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Draw the SVG image on top of the white background
      ctx.drawImage(img, 0, 0);
  
      // Convert canvas to JPEG and trigger download
      canvas.toBlob((blob) => {
        const jpegUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = jpegUrl;
        link.download = `${title}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(jpegUrl); // Cleanup the blob URL
      }, 'image/jpeg'); // Specify JPEG format
    };
  
    img.src = url; // Load the SVG as an image
  };
  
  return (
    <div className="image-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="image-preview" dangerouslySetInnerHTML={{ __html: svgContent }} />
      <div className="download-buttons">
        <a href={svg} download className="download-btn">Download SVG</a>
        <button className="download-btn" onClick={convertSvgToPng}>
          Download PNG
        </button>
        <button className="download-btn" onClick={convertSvgToJpeg}>
          Download JPEG
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
