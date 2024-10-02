import React, { useEffect, useState } from 'react';
import './ImageCard.css';

const ImageCard = ({ title, description, svgUrl }) => {
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasError, setHasError] = useState(false); // Error state
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color

  useEffect(() => {
    const fetchSvgContent = async () => {
      try {
        const response = await fetch(svgUrl); // Fetch the SVG content
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const content = await response.text();
        setSvgContent(content);
        setHasError(false); // Reset error state
      } catch (error) {
        console.error('Error fetching SVG:', error.message);
        setHasError(true); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchSvgContent();
  }, [svgUrl]);

  const downloadSvg = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = url; // Use the blob URL
    link.setAttribute('download', `${title}.svg`); // Name the file appropriately
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL after download
  };

  const convertSvgToPng = () => {
    if (!svgContent) {
      console.error('No SVG content available for conversion.');
      return;
    }

    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Draw the image without a background for PNG
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url); // Clean up

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/png');
    };

    img.onerror = (error) => {
      console.error('Error loading SVG as image for PNG conversion:', error);
    };

    img.src = url; // Start loading the SVG
  };

  const convertSvgToJpeg = () => {
    if (!svgContent) {
      console.error('No SVG content available for conversion.');
      return;
    }

    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Set the canvas background color for JPEG
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill background color
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url); // Clean up

      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/jpeg');
    };

    img.onerror = (error) => {
      console.error('Error loading SVG as image for JPEG conversion:', error);
    };

    img.src = url; // Start loading the SVG
  };

  return (
    <div className="image-card card p-3 text-center">
      <h3 className="card-title display-5">{title}</h3>
      <p className="card-text">{description}</p>
      <div className="image-preview" dangerouslySetInnerHTML={{ __html: svgContent }} />
      {isLoading && <p>Loading SVG...</p>} {/* Loading message */}
      {hasError && <p className="text-danger">Failed to load SVG.</p>} {/* Error message */}
      
      <div className="mt-3">
        <label htmlFor="backgroundColorPicker">Background Color:</label>
        <input
          type="color"
          id="backgroundColorPicker"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)} // Update the background color
        />
      </div>
      
      <div className="download-buttons mt-3 btn-group" role="group">
        <button className="btn btn-primary" onClick={downloadSvg} disabled={isLoading}>
          Download SVG
        </button>
        <button className="btn btn-success" onClick={convertSvgToPng} disabled={isLoading || !svgContent}>
          Download PNG
        </button>
        <button className="btn btn-warning" onClick={convertSvgToJpeg} disabled={isLoading || !svgContent}>
          Download JPEG
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
