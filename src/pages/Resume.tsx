import React from 'react';
import './Resume.css';

const Resume: React.FC = () => {
    return (
        <div className="resume-page">
            <div className="resume-content">
                <iframe
                    title="Resume Preview"
                    src="https://drive.google.com/file/d/1k1lrBpmI3A_S7GkjQZ4qLAS-khnr6hLO/preview"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0">
                    Loading…
                </iframe>
            </div>
        </div>
    );
};

export default Resume;
