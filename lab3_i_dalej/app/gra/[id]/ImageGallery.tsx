'use client'; // To musi być na samej górze!

import { useState } from 'react';

export default function ImageGallery({ images, title }: { images: string[], title: string }) {
  const baseUrl = 'https://szandala.github.io/piwo-api/';
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="item-middle-div-div-imagesHolder">
      <img 
        src={`${baseUrl}${selectedImage}`} 
        className="item-middle-img" 
        alt={title} 
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
        {images.map((img, index) => (
          <img 
            key={index}
            src={`${baseUrl}${img}`}
            className="item-middle-img-small"
            alt={`${title} miniatura ${index}`}
            onClick={() => setSelectedImage(img)}
            style={{ 
              cursor: 'pointer', 
              width: '80px', 
              height: '80px', 
              objectFit: 'cover',
              border: selectedImage === img ? '2px solid #0070f3' : '1px solid #ccc',
              opacity: selectedImage === img ? 1 : 0.7
            }}
          />
        ))}
      </div>
    </div>
  );
}