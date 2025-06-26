import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.tsx';
import Music from './pages/Music.tsx';
import Home from './pages/Home.tsx';
import Resume from './pages/Resume.tsx';
import Reels from './pages/Reels.tsx';
import Events from './pages/Events.tsx';
import Contact from './pages/Contact.tsx';
import './App.css';

const App: React.FC = () => {
    return (
        <HashRouter>
            <NavBar />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/reels" element={<Reels />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
        </HashRouter>
    );
};

export default App;
