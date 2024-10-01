import React, { useEffect, useState } from 'react';
import './ImageCard.css';

const ImageCard = ({ title, description, svg, color, bgColor }) => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch(svg)
      .then(response => response.text())
      .then(svgText => {
        const coloredSvgText = svgText.replace(/fill="#6c63ff"/g, `fill="${color}"`);
        setSvgContent(coloredSvgText);
      });
  }, [svg, color]);

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

      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `${title}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      });
    };

    img.src = url;
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

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const jpegUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = jpegUrl;
        link.download = `${title}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(jpegUrl);
      }, 'image/jpeg');
    };

    img.src = url;
  };

  return (
    <div className="image-card card p-3 text-center">
      <h3 className="card-title display-5">{title}</h3> {/* Use Bootstrap's display classes for responsive title */}
      <p className="card-text">{description}</p>
      <div className="image-preview" dangerouslySetInnerHTML={{ __html: svgContent }} />
      <div className="download-buttons mt-3 btn-group" role="group">
        <a href={svg} download className="btn btn-primary">Download SVG</a>
        <button className="btn btn-success" onClick={convertSvgToPng}>
          Download PNG
        </button>
        <button className="btn btn-warning" onClick={convertSvgToJpeg}>
          Download JPEG
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
