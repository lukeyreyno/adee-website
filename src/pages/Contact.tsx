import React from 'react';

const Contact: React.FC = () => {
    return (
        <div>
            <h1>Contact Us</h1>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Message:
                    <textarea name="message" />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
