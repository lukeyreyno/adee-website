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

type SlideAudioEntry = {
  type: 'audio';
  src: string;
  title: string;
};

type SlideEntry = SlideImageEntry | SlideYouTubeEntry | SlideAudioEntry;

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
  } else if (entry.type === 'audio') {
    return (
      <div className="slide-audio">
        <div className="audio-container">
          <h3 className="audio-title">{entry.title}</h3>
          <audio key={currentIndex} controls className="audio-player">
            <source src={entry.src} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    );
  }
  return null;
}

const SlideShow: React.FC<SlideShowProps> = ({ entries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (entries.length === 0) {
    return <div className="slideshow-empty">No slides to display.</div>;
  }

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
      <div className="slideshow-viewport" role="region" aria-roledescription="carousel" aria-label="Slideshow">
        <button className="arrow left-arrow" onClick={goToPrevious} style={{ height: arrowButtonHeight }} aria-label="Previous slide">
          &#8249;
        </button>
        {ResolveSlideShowEntry(entries[currentIndex], currentIndex)}
        <button className="arrow right-arrow" onClick={goToNext} style={{ height: arrowButtonHeight }} aria-label="Next slide">
          &#8250;
        </button>
      </div>
      <div className="dots" role="tablist" aria-label="Slide navigation">
        {entries.map((entry, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={entry.type === 'image' ? `Slide ${index + 1}` : entry.title}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export{
  type SlideEntry,
  type SlideAudioEntry,
  SlideShow,
};
