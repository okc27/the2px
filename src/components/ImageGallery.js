import React, { useEffect, useState } from 'react';
import ImageCard from './ImageCard'; // Adjust the path if necessary

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost/the2px/wp-json/the2px/v1/svg-images');
        if (!response.ok) {
          throw new Error(`Error fetching images: ${response.statusText}`);
        }

        const data = await response.json();
        // Ensure correct formatting of file URLs
        const decodedData = data.map(image => ({
          ...image,
          file: image.file.replace(/\/\//g, '/'), // Fix double slashes
          file: image.file.startsWith('http') ? image.file : `http://localhost${image.file}`, // Ensure it's an absolute URL
        }));

        // Debug the fetched image URLs
        console.log('Fetched Images:', decodedData);
        console.log('SVG URLs:', decodedData.map(image => image.file));

        setImages(decodedData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="image-gallery container">
      <h1 className="text-center my-4">SVG Image Gallery</h1>
      <div className="row">
        {images.map((image) => (
          <div className="col-md-4" key={image.id}>
            <ImageCard
              title={image.name}
              description={image.description}
              svgUrl={image.file} // Ensure this is the correct SVG URL
              color="#6c63ff" // Customize the color here if needed
              bgColor="#fff"   // Customize the background color here if needed
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
