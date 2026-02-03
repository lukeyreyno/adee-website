import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NavBar from '@adee/NavBar';
import Music from '@adee/pages/Music';
import Home from '@adee/pages/Home';
import Resume from '@adee/pages/Resume';
import Reels from '@adee/pages/Reels';
import Events from '@adee/pages/Events';
import Contact from '@adee/pages/Contact';
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
