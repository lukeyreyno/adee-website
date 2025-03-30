import React, { useState } from 'react';
import './slide-show.css';

interface SlideShowProps {
  images: string[];
}

const SlideShow: React.FC<SlideShowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slideshow">
      <div className="slideshow-viewport">
        <button className="arrow left-arrow" onClick={goToPrevious}>
          &#8249;
        </button>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-image" />
        <button className="arrow right-arrow" onClick={goToNext}>
          &#8250;
        </button>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;