import React from 'react';
import './Home.css';

const HEADSHOT_IMG_PATH = './images/headshot.jpg';

const Home: React.FC = () => {
  return (
    <div className='home-page'>
      <img src={HEADSHOT_IMG_PATH} alt='Headshot' className='headshot' />
      <h1 className='title'>Amanda Dee</h1>
        <div className='bio'>
            <p>Hi there!</p>
            <p>
            I'm Amanda Dee (she/her) - a pianist, violinist, and music director based in the San Francisco Bay Area.
            </p>
            <p>
            I am fortunate to call Berkeley Playhouse my creative home since moving to California in 2023. I primarily music direct through their YouthStage and Classes/Camps programs, where I teach kids ages 8 through 18. Outside of Berkeley Playhouse, I have done combinations of playing in pits/music/vocal directing for several local companies (UC Berkeley BareStage, Ray of Light Theatre, Pinole Players, Pittsburg Theater Company).
            </p>
            <p>
            Prior to arriving in California, I worked on production teams, performed in, and played in pits for 18 productions during my undergraduate term at Northeastern University, where I also directed and music directed one of the first collegiate productions of Natasha, Pierre & The Great Comet of 1812.
            </p>
            <p>
            When not performing or rehearsing, I am a second year plant biology PhD candidate at the University of California, Berkeley! I am also an avid rock climber and biker. I also am happy to be a sub and accompany events outside of musical theatre (weddings, churches, etc.)!
            </p>
            <p>
            Please don't hesitate to inquire about my music/vocal directing or keyboard playing availability. Looking forward to hearing from you!
            </p>
        </div>
    </div>
  );
};

export default Home;
