import React from 'react';
import './Reels.css';

import {SlideShow} from '@adee/components/slide-show';
import {getEnvVar} from '@adee/utils/env-utils';
import {getGoogleDriveStreamUrl} from '@adee/utils/google-drive-utils';

const Reels: React.FC = () => {
  const GOOGLE_DRIVE_API_KEY = getEnvVar('REACT_APP_GOOGLE_DRIVE_API_KEY');
  // TODO(lreyna): Get these from a backend service, rather than hardcoding them.
  const mainReels = [
    {
      type: 'audio' as const,
      src: getGoogleDriveStreamUrl('1kBX9ch5lfY_xReOIz-yHe0ois-yIiG0L', GOOGLE_DRIVE_API_KEY),
      title: 'Cool Fugue Final',
    },
    {
      type: 'audio' as const,
      src: getGoogleDriveStreamUrl('1QjnDyGiZAlcK1FNYXL5Bc5EnRW4kAQIM', GOOGLE_DRIVE_API_KEY),
      title: 'MFL On The Street Final',
    },
    {
      type: 'youtube' as const,
      videoId: 'yd3IwdfsvCQ',
      title: 'Tulsa \'67 -  The Outsiders',
    },
    {
      type: 'youtube' as const,
      videoId: 'hze2pTT-FEU',
      title: 'Throwing In The Towel - The Outsiders',
    },
    {
      type: 'youtube' as const,
      videoId: 'I2x_Mw1foTc',
      title: 'Friday At The Drive-In - The Outsiders',
    },
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
    // NOTE(lreyna): Seems like the video was disabled, follow up later
    // {
    //   type: 'youtube' as const,
    //   videoId: 'ED9ju8ubvLk',
    //   title: 'Chopin Etude Op. 10, No. 4 in C# Minor'
    // }
  ];

  return (
    <div className='reels-page'>
      <div className='reels-group'>
        <h1>Reels</h1>
        <SlideShow entries={mainReels} />
      </div>
      <div className='reels-group'>
        <h1>Classical Samples</h1>
        <SlideShow entries={classicSamples} />
      </div>
    </div>
  );
};

export default Reels;
