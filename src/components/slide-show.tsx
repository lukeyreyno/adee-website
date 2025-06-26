import React, {useState} from 'react';
import './slide-show.css';

type SlideImageEntry = {
  type: 'image';
  src: string;
};

type SlideYouTubeEntry = {
  type: 'youtube';
  videoId: string;
  title: string;
};

type SlideEntry = SlideImageEntry | SlideYouTubeEntry;

interface SlideShowProps {
  entries: SlideEntry[];
}

const ResolveSlideShowEntry = (entry: SlideEntry, currentIndex: number) => {
  if (entry.type === 'image') {
    return <img src={entry.src} alt={`Slide ${currentIndex + 1}`} className="slide-image" />;
  } else if (entry.type === 'youtube') {
    return (
      <div className="slide-youtube">
        <iframe
          src={`https://www.youtube.com/embed/${entry.videoId}`}
          title={entry.title}
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return null;
}

const SlideShow: React.FC<SlideShowProps> = ({ entries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEntry = entries[currentIndex];
  const arrowButtonHeight = currentEntry.type === 'image' ? '100%' : '70%';

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? entries.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === entries.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slideshow">
      <div className="slideshow-viewport">
        <button className="arrow left-arrow" onClick={goToPrevious} style={{ height: arrowButtonHeight }}>
          &#8249;
        </button>
        {ResolveSlideShowEntry(entries[currentIndex], currentIndex)}
        <button className="arrow right-arrow" onClick={goToNext} style={{ height: arrowButtonHeight }}>
          &#8250;
        </button>
      </div>
      <div className="dots">
        {entries.map((_, index) => (
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

export{
  type SlideEntry,
  SlideShow,
};
