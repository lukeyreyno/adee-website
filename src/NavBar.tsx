import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import * as lucide from 'lucide-react';

import {useStrings} from '@adee/hooks/useStrings';

import './NavBar.css';

const MOBILE_WIDTH_THRESHOLD = 768;

const NavBar: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= MOBILE_WIDTH_THRESHOLD);

  const strings = useStrings();

  const checkScreenSize = () => {
    const isMobileView = window.innerWidth <= MOBILE_WIDTH_THRESHOLD;
    setIsSmallScreen(isMobileView);
    if (!isMobileView) {
      setIsNavVisible(false);
    }
  };

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  const hideNavDropdown = () => {
    if (isNavVisible && isSmallScreen) {
      setIsNavVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const navBarLinksContainer = () => {
    return (
      <div className={`navbar-links-container ${isNavVisible ? 'visible' : 'hidden'}`}>
        <ul className="navbar-links">
          <li><NavLink to="/home" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorHome}</NavLink></li>
          <li><NavLink to="/resume" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorResume}</NavLink></li>
          <li><NavLink to="/music" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorMusic}</NavLink></li>
          <li><NavLink to="/reels" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorReels}</NavLink></li>
          <li><NavLink to="/events" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorEvents}</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''} onClick={hideNavDropdown}>{strings.navigatorContact}</NavLink></li>
        </ul>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <a href="#main-content" className="skip-nav-link">Skip to main content</a>
      <div className="navbar-container">
        <NavLink to="/" onClick={hideNavDropdown} className="navbar-logo">Amanda Dee</NavLink>
        <button className="navbar-toggle" onClick={toggleNavVisibility} aria-label="Menu" aria-expanded={isNavVisible}>
          {isNavVisible ? <lucide.X size={24} /> : <lucide.Menu size={24} />}
        </button>
        {!isSmallScreen && navBarLinksContainer()}
      </div>
      {isSmallScreen && navBarLinksContainer()}
    </nav>
  );
};

export default NavBar;
