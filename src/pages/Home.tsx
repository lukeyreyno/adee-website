import React from 'react';
import '@adee/pages/Home.css';

import {GooglePhotoSlideShow} from '@adee/components/google-photo-slide-show';
import {TestimonialCards} from '@adee/components/testimonial-cards';

import {getEnvVar} from '@adee/utils/env-utils';
import {useStrings} from '@adee/hooks/useStrings';

const HEADSHOT_IMG_PATH = './images/headshot.jpg';

const FOLDER_ID = getEnvVar('REACT_APP_GOOGLE_DRIVE_FOLDER_ID');
const GOOGLE_DRIVE_API_KEY = getEnvVar('REACT_APP_GOOGLE_DRIVE_API_KEY');

const Home: React.FC = () => {
  const strings = useStrings();

  return (
    <div className='home-page'>
      <img src={HEADSHOT_IMG_PATH} alt='Headshot' className='headshot' />
      <h1 className='title'>{strings.homeName}</h1>
      <div className="home-slideshow">
        <GooglePhotoSlideShow folderId={FOLDER_ID} apiKey={GOOGLE_DRIVE_API_KEY} />
      </div>
        <TestimonialCards
          testimonials={strings.homeTestimonials}
          heading={strings.homeTestimonialsHeading}
        />
        <div className='bio'>
            <p>{strings.homeBioSection}</p>
        </div>
    </div>
  );
};

export default Home;
