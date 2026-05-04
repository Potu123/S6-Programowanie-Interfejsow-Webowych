// app/gra/ImageGallery.js
'use client';

import { useState, useEffect } from 'react';

export default function ImageGallery({ images = [], title }) {
  // Ustawiamy pierwsze zdjęcie jako wybrane, gdy tylko 'images' się pojawią
  const [selectedImage, setSelectedImage] = useState(images[0] || '/images/placeholder.png');

  // Jeśli images zmieni się w locie (np. po doładowaniu z bazy), aktualizujemy wybrane
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="item-middle-div-div-imagesHolder">
        <img src="/images/placeholder.png" className="item-middle-img" alt="Brak zdjęcia" />
      </div>
    );
  }

  return (
    <div className="item-middle-div-div-imagesHolder">
      <div className="main-image-container" style={{ marginBottom: '15px' }}>
        <img 
          src={selectedImage} 
          className="item-middle-img" 
          alt={title} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {images.map((img, index) => (
          <img 
            key={index}
            src={img}
            className="item-middle-img-small"
            alt={`${title} miniatura ${index}`}
            onClick={() => setSelectedImage(img)}
            style={{ 
              cursor: 'pointer', 
              width: '70px', 
              height: '70px', 
              objectFit: 'cover',
              borderRadius: '4px',
              border: selectedImage === img ? '3px solid #0070f3' : '1px solid #ccc',
              opacity: selectedImage === img ? 1 : 0.6,
              transition: 'all 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}