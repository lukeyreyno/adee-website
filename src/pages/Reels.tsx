import React from 'react';
import './Reels.css';

import {SlideShow} from '../components/slide-show.tsx';

const Reels: React.FC = () => {
  // TODO(lreyna): Get these from a backend service, rather than hardcoding them.
  const mainYoutubeReels = [
    {
      type: 'youtube' as const,
      videoId: 'BeiJyFJ36KM',
      title: 'Violin Reel',
    },
    {
      type: 'youtube' as const,
      videoId: 'A2uiy_tByd8',
      title: 'Keyboard Conducting Reel'
    },
    {
      type: 'youtube' as const,
      videoId: 'e4cc8El4bU0',
      title: 'Keyboard Reel'
    }
  ];

  const classicSamples = [
    {
      type: 'youtube' as const,
      videoId: 'OMuqP9UwG5M',
      title: 'Beethoven Piano Concerto No. 5, Op. 73, Movement 1 - Allegro'
    },
    {
      type: 'youtube' as const,
      videoId: 'hIBmPTVene4',
      title: 'Beethoven Piano Sonata, Op. 2, No. 3, Movement 1 - Allegro con brio'
    },
    {
      type: 'youtube' as const,
      videoId: 'ED9ju8ubvLk',
      title: 'Chopin Etude Op. 10, No. 4 in C# Minor'
    }
  ];

  return (
    <div className='reels-page'>
      <div className='reels-group'>
        <h1>Reels</h1>
        <SlideShow entries={mainYoutubeReels} />
      </div>
      <div className='reels-group'>
        <h1>Classical Samples</h1>
        <SlideShow entries={classicSamples} />
      </div>
    </div>
  );
};

export default Reels;
