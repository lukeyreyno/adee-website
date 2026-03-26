import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
          <li><Link to="/home" onClick={hideNavDropdown}>{strings.navigatorHome}</Link></li>
          <li><Link to="/resume" onClick={hideNavDropdown}>{strings.navigatorResume}</Link></li>
          <li><Link to="/music" onClick={hideNavDropdown}>{strings.navigatorMusic}</Link></li>
          <li><Link to="/reels" onClick={hideNavDropdown}>{strings.navigatorReels}</Link></li>
          <li><Link to="/events" onClick={hideNavDropdown}>{strings.navigatorEvents}</Link></li>
          <li><Link to="/contact" onClick={hideNavDropdown}>{strings.navigatorContact}</Link></li>
        </ul>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <a href="#main-content" className="skip-nav-link">Skip to main content</a>
      <div className="navbar-container">
        <Link to="/" onClick={hideNavDropdown} className="navbar-logo">Amanda Dee</Link>
        <button className="navbar-toggle" onClick={toggleNavVisibility} aria-label="Menu" aria-expanded={isNavVisible}>☰</button>
        {!isSmallScreen && navBarLinksContainer()}
      </div>
      {isSmallScreen && navBarLinksContainer()}
    </nav>
  );
};

export default NavBar;
