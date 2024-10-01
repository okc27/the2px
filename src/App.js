import React, { useState } from 'react';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import images from './data/images';
import './App.css';

function App() {
  const [color, setColor] = useState('#6c63ff'); // Default color

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <div className="App">
      <Header onColorChange={handleColorChange} />
      <main>
        <div className="image-grid">
          {images.map(image => (
            <ImageCard
              key={image.id}
              title={image.title}
              description={image.description}
              svg={image.svg}
              color={color} // Pass selected color to ImageCard
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
