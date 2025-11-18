

import React from 'react';
import EventsSubNav from '../../components/Events/EventsSubNav';
import EventsCard from '../../components/Events/EventsCard';



const Events = () => {
    return (
        <div className="events-page">
            <EventsSubNav />
            <EventsCard />
        </div>
    );
}
export default Events;
