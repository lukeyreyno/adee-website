import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-page">
            <h1>Contact Me</h1>
            <div className="contact-content">
                <iframe
                    title="Contact Form"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdk9u-o0iqMbrKuJNmDEikDKapVauR7CwpG4EE_BGfQSfwoLg/viewform?embedded=true"
                    width="640"
                    height="800"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0">
                    Loading…
                </iframe>
            </div>
        </div>
    );
};

export default Contact;
