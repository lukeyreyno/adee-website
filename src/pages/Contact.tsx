import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <div className="contact-content">
                <img src="https://via.placeholder.com/400" alt="Contact Placeholder" className="contact-image" />
                <div className="contact-info">
                    <p><strong>Address:</strong> 1234 Mockup Lane, Imaginary City, Dreamland</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Email:</strong> contact@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
