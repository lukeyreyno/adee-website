import React from 'react';
import './Events.css';

const Events: React.FC = () => {
    return (
        <div className="event-page">
            <div className="event-content">
                <iframe
                    title="Event Form"
                    src="https://calendar.google.com/calendar/embed?src=f1f27232e6028949ad891176039db4d08d06d47a464aee05cf17b3a7716fbdbc%40group.calendar.google.com&ctz=America%2FLos_Angeles"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0">
                    Loading…
                </iframe>
            </div>
        </div>
    );
};

export default Events;
