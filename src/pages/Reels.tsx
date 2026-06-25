import React from 'react';
import './Reels.css';

import {SlideShow} from '@adee/components/slide-show';
import {getEnvVar} from '@adee/utils/env-utils';
import {getGoogleDriveStreamUrl} from '@adee/utils/google-drive-utils';
import {useYouTubePlaylist} from '@adee/hooks/use-youtube-playlist';

const REELS_PLAYLIST_ID = 'PLLGEPRWSME6GV0vol_Rqumi15IstdNZGy';
const CLASSICAL_PLAYLIST_ID = 'PLLGEPRWSME6G6L6hq0C7uMWg3zxt72GVi';

const Reels: React.FC = () => {
  const GOOGLE_DRIVE_API_KEY = getEnvVar('REACT_APP_GOOGLE_DRIVE_API_KEY');
  const {entries: reelsEntries, loading: reelsLoading, error: reelsError} = useYouTubePlaylist(REELS_PLAYLIST_ID, GOOGLE_DRIVE_API_KEY);
  const {entries: classicalEntries, loading: classicalLoading, error: classicalError} = useYouTubePlaylist(CLASSICAL_PLAYLIST_ID, GOOGLE_DRIVE_API_KEY);

  const audioEntries = [
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
  ];

  if (reelsLoading || classicalLoading) {
    return (
      <div className='reels-page'>
        <div className="slideshow-loading">
          <div className="slideshow-spinner"></div>
          <p>Loading reels...</p>
        </div>
      </div>
    );
  }

  if (reelsError || classicalError) {
    return (
      <div className='reels-page'>
        <p>Failed to load reels. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='reels-page'>
      <div className='reels-group'>
        <h1>Reels</h1>
        <SlideShow entries={[...reelsEntries, ...audioEntries]} />
      </div>
      <div className='reels-group'>
        <h1>Classical Samples</h1>
        <SlideShow entries={classicalEntries} />
      </div>
    </div>
  );
};

export default Reels;
