import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard'; // Adjust the path if necessary

const ImageGallery = ({ svgColor, bgColor }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add searchTerm state

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost/the2px/wp-json/the2px/v1/svg-images');
        if (!response.ok) {
          throw new Error(`Error fetching images: ${response.statusText}`);
        }

        const data = await response.json();
        const decodedData = data.map(image => ({
          ...image,
          file: image.file.replace(/\/\//g, '/'), 
          file: image.file.startsWith('http') ? image.file : `http://localhost${image.file}`,
        }));

        setImages(decodedData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  // Add filtering logic based on search term
  const filteredImages = images.filter(image => 
    image.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="image-gallery container">
      <h1 className="text-center my-4">SVG Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tags..."
        className="form-control mb-4" // Add a class for styling
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
      />
      <div className="row">
        {filteredImages.map((image) => ( // Use filteredImages instead of images
          <div className="col-md-4" key={image.id}>
            <ImageCard
              title={image.name}
              description={image.description}
              svgUrl={image.file} // Ensure this is the correct SVG URL
              svgColor={svgColor} // Pass the svgColor prop
              backgroundColor={bgColor} // Pass the bgColor prop to ImageCard
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
