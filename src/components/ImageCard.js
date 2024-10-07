import React, { useEffect, useState } from 'react';
import './ImageCard.css';

const ImageCard = ({ title, description, svgUrl, svgColor, backgroundColor }) => {
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchSvgContent = async () => {
      try {
        const response = await fetch(svgUrl);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        let content = await response.text();
        // Change the color in the SVG content
        content = content.replace(/#6c63ff/g, svgColor); // Change #6c63ff to the selected SVG color
        setSvgContent(content);
        setHasError(false);
      } catch (error) {
        console.error('Error fetching SVG:', error.message);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvgContent();
  }, [svgUrl, svgColor]); // Re-fetch when svgColor changes

  const downloadSvg = () => {
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.svg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

      // PNG should have transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

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

    img.src = url;
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

      // Apply the selected background color for JPEG
      ctx.fillStyle = backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

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

    img.src = url;
  };

  return (
    <div className="image-card card p-3 text-center">
      <h3 className="card-title display-5">{title}</h3>
      <p className="card-text">{description}</p>

      <div
        className="image-preview"
        style={{ backgroundColor: backgroundColor }} // Apply background color to preview
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {isLoading && <p>Loading SVG...</p>}
      {hasError && <p className="text-danger">Failed to load SVG.</p>}

      <div className="download-buttons mt-3 btn-group" role="group">
        <button className="btn btn-primary" onClick={downloadSvg} disabled={isLoading}>
          Download SVG
        </button>
        <button className="btn btn-success" onClick={convertSvgToPng} disabled={isLoading || !svgContent}>
          Download PNG
        </button>
        <button className="btn btn-warning" onClick={convertSvgToJpeg} disabled={isLoading}>
          Download JPEG
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
