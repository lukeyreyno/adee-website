import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.tsx';
import Music from './pages/Music.tsx';
import Contact from './pages/Contact.tsx';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Music />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
